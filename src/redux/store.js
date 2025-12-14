import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import habitReducer from "./habitSlice";

export const store = configureStore({
    reducer: {
        tasks : taskReducer,
        habits: habitReducer
    }
})