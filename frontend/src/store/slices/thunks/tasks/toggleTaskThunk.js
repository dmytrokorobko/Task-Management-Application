import { createAsyncThunk } from "@reduxjs/toolkit";

export const toggleTaskThunk = createAsyncThunk(
   'tasks/toggleTaskThunk',
   async({task}, thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
      try {
         
      } catch(err) {
         if (err.response && err.response.data.message) return rejectWithValue(err.response.data.message);
         else if (err.message) return rejectWithValue(err.message);
         else return rejectWithValue('Unexpected error occured')
      }
   }
)