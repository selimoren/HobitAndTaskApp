import db from '../database/db';

export const TaskService = {
    getAllTasks: ()=>{
        return new Promise((resolve, reject)=>{
            db.transaction(tx => {
                console.log("TaskService-gettAlltTasks: Veriler başarıyla çekildi.");
                tx.executeSql(
                    `SELECT * FROM taskTable ORDER by id DESC`,
                    [],
                    (_, results) => resolve(results.rows.raw()),
                    (_, error) => reject(error)
                );
            });
        });
    },

    addTask: (name, periodText, priority = 1, dueDate = null) =>{
        const now = new Date().toISOString().split('T')[0];
        const period = periodText === "daily" ? 0 : 1;
        return new Promise((resolve, reject)=> {
            db.transaction(tx => {
                console.log(" TaskService-addTask: name, periodText, priority, dueDate alındı:", name, periodText, priority, dueDate);
                tx.executeSql(
                    `INSERT INTO taskTable(name, period, priority, due_date, created_at) VALUES(?, ?, ?, ?, ?)`,
                    [name, period, priority, dueDate, now],
                    (_, results) => {
                        console.log("✅ Görev başarıyla eklendi. Insert ID:", results.insertId);
                        resolve(results);
                    },
                    (_, error) => {
                        console.error("❌ Görev eklenirken hata:", error);
                        reject(error);
                    }
                );
            }, 
            (error) => {
                console.error("❌ Transaction hatası:", error);
                reject(error);
            },
            () => {
                console.log("✅ Transaction başarıyla tamamlandı");
            });
        });
    },

    deleteTask: (id) =>{
        return new Promise((resolve, reject)=> {
            db.transaction(tx => {
                console.log(" TaskService-deleteTask: id alındı:", id);
                tx.executeSql(
                    `DELETE FROM taskTable WHERE id= ?`,
                    [id],
                    (_, results)=> resolve(results), 
                    (_, error)=> reject(error)
                );
            });
        });
    },

    isCompleted: (id) => {
        return new Promise((resolve, reject)=> {
            db.transaction(tx => {
                console.log(" TaskService-isCompleted: ID alındı:", id);
                tx.executeSql(
                    `UPDATE taskTable
                    SET completed = CASE WHEN completed = 0 THEN 1 ELSE 0 END
                    WHERE id = ?`,
                    [id],
                    (_, results)=> resolve(results),
                    (_, error) => reject(error)
                );
            });
        });
    },

    getTasksByFilter: ({
        status = null,
        limit = null,
        period = null,
    }) => {
        return new Promise((resolve, reject)=>{
            db.transaction(tx => {
                console.log(" TaskService: Filtreler alındı:", {status, limit, period});
                let conditions =[];
                let values =[];

                if(status !== null){
                    conditions.push('completed = ?');
                    values.push(status);
                };

                if(period !== null){
                    conditions.push('period = ?');
                    values.push(period);
                };

                let whereClause = conditions.length > 0 ?
                "WHERE " + conditions.join(" AND ") : "";
                
                let limitClause = limit ? `LIMIT ${limit}` : "";

                let query = `
                SELECT * FROM taskTable
                ${whereClause}
                ORDER BY id DESC
                ${limitClause}
                `;

                console.log("📝 Çalıştırılan SQL:", query);
                console.log("🔧 Parametreler:", values);

                tx.executeSql(
                    query,
                    values,
                    (_, results) =>{ 
                        console.log("SQL başarılı! Kayıt sayısı:", results.rows.length);
                        resolve(results.rows.raw())},
                    (_, error) => {
                        console.log("SQL HATASI:", error);
                        reject(error)}
                );
            });
        });
    },

    getDailyCompletedTasksCount: (date) => {
        const targetDate = date || new Date().toISOString().split('T')[0];
        return new Promise((resolve, reject)=>{
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT COUNT(*) as count FROM taskTable 
                     WHERE completed = 1 AND DATE(created_at) = ?`,
                    [targetDate],
                    (_, results) => {
                        const count = results.rows.item(0).count;
                        resolve(count);
                    },
                    (_, error) => reject(error)
                );
            });
        });
    },

    getWeeklyTasks: (startDate) => {
        const start = startDate || new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const end = new Date().toISOString().split('T')[0];
        return new Promise((resolve, reject)=>{
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT 
                        DATE(created_at) as date,
                        COUNT(*) as total,
                        SUM(CASE WHEN completed = 1 THEN 1 ELSE 0 END) as completed
                     FROM taskTable
                     WHERE DATE(created_at) BETWEEN ? AND ?
                     GROUP BY DATE(created_at)
                     ORDER BY date ASC`,
                    [start, end],
                    (_, results) => resolve(results.rows.raw()),
                    (_, error) => reject(error)
                );
            });
        });
    },

    getCompletionPercentage: () => {
        return new Promise((resolve, reject)=>{
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT 
                        COUNT(*) as total,
                        SUM(CASE WHEN completed = 1 THEN 1 ELSE 0 END) as completed
                     FROM taskTable
                     WHERE continuing = 1`,
                    [],
                    (_, results) => {
                        const row = results.rows.item(0);
                        const percentage = row.total > 0 ? (row.completed / row.total) * 100 : 0;
                        resolve(percentage);
                    },
                    (_, error) => reject(error)
                );
            });
        });
    }
};