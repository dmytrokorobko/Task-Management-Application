import {createSlice} from '@reduxjs/toolkit';
import { newTaskThunk } from './thunks/tasks/newTaskThunk';
import { tasksThunk } from './thunks/tasks/tasksThunk';

const tasksSlice = createSlice({
   name: 'tasks',
   initialState: {
      tasks: null,
      loading: false,
      error: null,
      success: false
   },
   reducers: {
      logout: (state) => {
         state.tasks = null;
         state.loading = false;
         state.error = null;
         state.success = false;
      }
   },
   extraReducers: builder => {
      builder
         //show all stored tasks
         .addCase(tasksThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
         })
         .addCase(tasksThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = action.payload.tasks;
            state.success = true;
         })         
         .addCase(tasksThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })         
         //create new task
         .addCase(newTaskThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
         })
         .addCase(newTaskThunk.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
         })         
         .addCase(newTaskThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })         
   }
})

export const {logout} = tasksSlice.actions;
export default tasksSlice.reducer;