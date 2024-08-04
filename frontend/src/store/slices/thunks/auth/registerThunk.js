import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const server = process.env.REACT_APP_BACKEND_API;

export const registerThunk = createAsyncThunk(
   'auth/registerThunk',
   async ({username, password, navigate}, {rejectWithValue}) => {
      try {
         const response = await axios.post(server + '/register', {username, password});
         navigate('/login');
         return response.data;
      } catch(err) {
         if (err.response && err.response.data) return rejectWithValue(err.response.data.message);
         else if (err.message) return rejectWithValue(err.message);
         else rejectWithValue('Unexpected error occured');
      }
   }
)