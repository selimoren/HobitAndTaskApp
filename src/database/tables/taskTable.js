import db from "../db.js";

export const createTaskTable = () => {
    db.transaction(tx => {
        // First create table with all columns
        tx.executeSql(`
            CREATE TABLE IF NOT EXISTS taskTable(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            period INTEGER,
            priority INTEGER DEFAULT 1,
            due_date TEXT,
            completed INTEGER DEFAULT 0,
            continuing INTEGER DEFAULT 1,
            created_at TEXT
            );
        `, [], 
        () => {
            console.log("Task table created/verified successfully");
        },
        (error) => {
            console.log("Task table creation error:", error);
        });
    });
};