import { createTaskTable } from "./tables/taskTable";
import { createHabitTable, createHabitCompletionTable } from "./tables/habitTable";

export const initDatabase = () => {
    createTaskTable();
    createHabitTable();
    createHabitCompletionTable();
}