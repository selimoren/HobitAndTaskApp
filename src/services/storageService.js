import db from '../database/db';

export const StorageService = {
    // Onboarding completion status
    setOnboardingCompleted: (completed) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS settingsTable(
                        key TEXT PRIMARY KEY,
                        value TEXT
                    )`,
                    [],
                    () => {
                        tx.executeSql(
                            `INSERT OR REPLACE INTO settingsTable(key, value) VALUES(?, ?)`,
                            ['onboarding_completed', completed ? '1' : '0'],
                            (_, results) => resolve(results),
                            (_, error) => reject(error)
                        );
                    },
                    (_, error) => reject(error)
                );
            });
        });
    },

    getOnboardingCompleted: () => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS settingsTable(
                        key TEXT PRIMARY KEY,
                        value TEXT
                    )`,
                    [],
                    () => {
                        tx.executeSql(
                            `SELECT value FROM settingsTable WHERE key = ?`,
                            ['onboarding_completed'],
                            (_, results) => {
                                if (results.rows.length > 0) {
                                    resolve(results.rows.item(0).value === '1');
                                } else {
                                    resolve(false);
                                }
                            },
                            (_, error) => reject(error)
                        );
                    },
                    (_, error) => reject(error)
                );
            });
        });
    }
};
