import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const server = process.env.REACT_APP_BACKEND_API;

export const updateUserThunk = createAsyncThunk(
   'users/updateUserThunk',
   async({user, navigate}, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) return navigate('/login'); 
      const {rejectWithValue} = thunkAPI;
      try {
         const url = server + '/user/' + user.id;
         const response = await axios.put(url, {
            ...user
         }, {
            headers: {
               'Authorization': `Bearer ${token}`
            }
         });
         return response.data;
      } catch(err) {
         if (err.response && err.response.data.message) return rejectWithValue(err.response.data.message);
         else if (err.message) return rejectWithValue(err.message);
         else return rejectWithValue('Unexpected error occured')
      }
   }
)