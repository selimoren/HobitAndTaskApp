import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {HabitService} from '../services/habitService'

export const fetchHabits = createAsyncThunk(
    'habits/fetchHabits',
    async () => {
        return await HabitService.getAllHabits();
    }
);

export const addHabit = createAsyncThunk(
    'habits/addHabit',
    async ({ name }) => {
        await HabitService.addHabit(name);
        return await HabitService.getAllHabits();
    }
);

export const deleteHabit = createAsyncThunk(
    'habits/deleteHabit',
    async (id) => {
        await HabitService.deleteHabit(id);
        return await HabitService.getAllHabits();
    }
);

export const markHabitCompletedForDay = createAsyncThunk(
    'habits/markHabitCompletedForDay',
    async ({ id, date = null }) => {
        await HabitService.markHabitCompletedForDay(id, date);
        return await HabitService.getAllHabits();
    }
);

export const fetchHabitsByFilter = createAsyncThunk(
  'habits/fetchHabitsByFilter',
  async (filters) => {
    return await HabitService.getHabitsByFilter(filters);
  }
);
const habitSlice = createSlice({
    name: 'habits',
    initialState: {
        list: [],
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHabits.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchHabits.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(addHabit.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(deleteHabit.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(markHabitCompletedForDay.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(fetchHabitsByFilter.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchHabitsByFilter.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
    }
});

export default habitSlice.reducer;
