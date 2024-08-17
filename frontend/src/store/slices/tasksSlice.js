import { createSlice } from "@reduxjs/toolkit";
import { deleteTaskThunk } from "./thunks/tasks/deleteTaskThunk";
import { editTaskThunk } from "./thunks/tasks/editTaskThunk";
import { newTaskThunk } from "./thunks/tasks/newTaskThunk";
import { tasksThunk } from "./thunks/tasks/tasksThunk";
import { toggleTaskThunk, updateTaskThunk } from "./thunks/tasks/updateTaskThunk";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    logout: (state) => {
      state.tasks = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearError: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
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
      //toggle Completed task
      .addCase(updateTaskThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateTaskThunk.rejected, (state, action) => {
        state.loading = false;        
        state.error = action.payload;
      })
      //delete selected task
      .addCase(deleteTaskThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.meta.arg.task.id
        );
      })
      .addCase(deleteTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //get selected task
      .addCase(editTaskThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(editTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = tasksSlice.actions;
export default tasksSlice.reducer;
