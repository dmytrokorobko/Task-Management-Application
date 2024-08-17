import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const server = process.env.REACT_APP_BACKEND_API;

export const loginThunk = createAsyncThunk(
   'auth/loginThunk',
   async({username, password, navigate, from}, {rejectWithValue}) => {
      try {
         const response = await axios.post(server + '/login', {username, password});
         const {token, role} = response.data;
         navigate(from, {replace: true});         
         return {username: username, role, token};
      } catch (err) {
         if (err.response && err.response.data.message) return rejectWithValue(err.response.data.message); 
         else if (err.message) return rejectWithValue(err.message);
         else return rejectWithValue('Unexpected error occured');
      }
   }
)