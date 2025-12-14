import db from "../db.js";

export const createHabitTable = () => {
    db.transaction(tx => {
        tx.executeSql(`
            CREATE TABLE IF NOT EXISTS habitTable(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            continuing INTEGER DEFAULT 1,
            created_at TEXT
            );
        `);
    });
};

// Separate table for tracking daily habit completions
export const createHabitCompletionTable = () => {
    db.transaction(tx => {
        tx.executeSql(`
            CREATE TABLE IF NOT EXISTS habitCompletionTable(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            habit_id INTEGER NOT NULL,
            completion_date TEXT NOT NULL,
            completed INTEGER DEFAULT 1,
            FOREIGN KEY(habit_id) REFERENCES habitTable(id) ON DELETE CASCADE,
            UNIQUE(habit_id, completion_date)
            );
        `);
    });
};