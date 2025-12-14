import db from '../database/db'

export const HabitService = {
    getAllHabits: ()=>{
        return new Promise((resolve, reject)=>{
            db.transaction(tx => {
                console.log("HabitService-getAllHabits: Veriler başarıyla çekildi.");
                tx.executeSql(
                    `SELECT * FROM habitTable ORDER by id DESC`,
                    [],
                    (_, results) => resolve(results.rows.raw()),
                    (_, error) => reject(error)
                );
            });
        });
    },

    addHabit: (name, description) =>{
        const now = new Date().toISOString().split('T')[0];
        return new Promise((resolve, reject)=> {
            db.transaction(tx => {
                console.log(" HabitService-addHabit: name ve description alındı:", name, description);
                tx.executeSql(
                    `INSERT INTO habitTable(name, description, created_at) VALUES(?, ?, ?)`,
                    [name, description, now],
                    (_, results) => resolve(results),
                    (_, error) => reject(error)
                );
            });
        });
    },

    deleteHabit: (id) =>{
        return new Promise((resolve, reject)=> {
            db.transaction(tx => {
                console.log(" HabitService-deleteHabit: id alındı:", id);
                tx.executeSql(
                    `DELETE FROM habitTable WHERE id= ?`,
                    [id],
                    (_, results)=> resolve(results), 
                    (_, error)=> reject(error)
                );
            });
        });
    },

    markHabitCompletedForDay: (id, date = null) => {
        const completionDate = date || new Date().toISOString().split('T')[0];
        return new Promise((resolve, reject)=> {
            db.transaction(tx => {
                console.log(" HabitService-markHabitCompletedForDay: ID ve tarih alındı:", id, completionDate);
                // Check if already completed for this day
                tx.executeSql(
                    `SELECT * FROM habitCompletionTable WHERE habit_id = ? AND completion_date = ?`,
                    [id, completionDate],
                    (_, results) => {
                        if (results.rows.length > 0) {
                            // Toggle completion
                            tx.executeSql(
                                `UPDATE habitCompletionTable 
                                 SET completed = CASE WHEN completed = 1 THEN 0 ELSE 1 END
                                 WHERE habit_id = ? AND completion_date = ?`,
                                [id, completionDate],
                                (_, results) => resolve(results),
                                (_, error) => reject(error)
                            );
                        } else {
                            // Insert new completion
                            tx.executeSql(
                                `INSERT INTO habitCompletionTable(habit_id, completion_date, completed) 
                                 VALUES(?, ?, 1)`,
                                [id, completionDate],
                                (_, results) => resolve(results),
                                (_, error) => reject(error)
                            );
                        }
                    },
                    (_, error) => reject(error)
                );
            });
        });
    },

    isHabitCompletedForDay: (id, date = null) => {
        const completionDate = date || new Date().toISOString().split('T')[0];
        return new Promise((resolve, reject)=> {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT completed FROM habitCompletionTable 
                     WHERE habit_id = ? AND completion_date = ?`,
                    [id, completionDate],
                    (_, results) => {
                        if (results.rows.length > 0) {
                            resolve(results.rows.item(0).completed === 1);
                        } else {
                            resolve(false);
                        }
                    },
                    (_, error) => reject(error)
                );
            });
        });
    },

    getHabitCompletionsForWeek: (id, startDate = null) => {
        const start = startDate || new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const end = new Date().toISOString().split('T')[0];
        return new Promise((resolve, reject)=>{
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT completion_date, completed 
                     FROM habitCompletionTable
                     WHERE habit_id = ? AND completion_date BETWEEN ? AND ?
                     ORDER BY completion_date ASC`,
                    [id, start, end],
                    (_, results) => resolve(results.rows.raw()),
                    (_, error) => reject(error)
                );
            });
        });
    },

    getHabitsByFilter: ({
        status = null,
        limit = null,
    }) => {
        return new Promise((resolve, reject)=>{
            db.transaction(tx => {
                console.log(" HabitService: Filtreler alındı:", {status, limit});
                let conditions =[];
                let values =[];

                if(status !== null){
                    conditions.push('continuing = ?');
                    values.push(status);
                };
                
                let whereClause = conditions.length > 0 ?
                "WHERE " + conditions.join(" AND ") : "";
                
                let limitClause = limit ? `LIMIT ${limit}` : "";

                let query = `
                SELECT * FROM habitTable
                ${whereClause}
                ORDER BY id DESC
                ${limitClause}
                `;
                
                console.log("📝 Çalıştırılan SQL:", query);
                console.log("🔧 Parametreler:", values);

                tx.executeSql(
                    query,
                    values,
                    (_, results) => {
                        console.log("SQL başarılı! Kayıt sayısı:", results.rows.length);                        
                        resolve(results.rows.raw())},
                    (_, error) => {
                        console.log("SQL HATASI:", error);
                        reject(error)}
                );
            });
        });
    }

};