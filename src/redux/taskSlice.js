import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TaskService } from '../services/taskService';

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async () => {
        return await TaskService.getAllTasks();
    }
);

export const addTask = createAsyncThunk(
    'tasks/addTask',
    async ({ name, periodText, priority = 1, dueDate = null }) => {
        await TaskService.addTask(name, periodText, priority, dueDate);
        return await TaskService.getAllTasks();
    }
);

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (id) => {
        await TaskService.deleteTask(id);
        return await TaskService.getAllTasks();
    }
);

export const isCompleted = createAsyncThunk(
    'tasks/isCompleted',
    async (id) => {
        await TaskService.isCompleted(id);
        return await TaskService.getAllTasks();
    }
);

export const fetchTasksByFilter = createAsyncThunk(
  'tasks/fetchTasksByFilter',
  async (filters) => {
    return await TaskService.getTasksByFilter(filters);
  }
);

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        list: [],
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(addTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                console.log("✅ Redux: Görev eklendi, liste güncellendi. Toplam görev:", action.payload.length);
            })
            .addCase(addTask.rejected, (state, action) => {
                state.loading = false;
                console.error("❌ Redux: Görev eklenirken hata:", action.error);
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(isCompleted.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(fetchTasksByFilter.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasksByFilter.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
    }
});

export default taskSlice.reducer;
