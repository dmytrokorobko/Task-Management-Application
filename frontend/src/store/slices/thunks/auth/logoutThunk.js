import { createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "../../authSlice";

export const logoutThunk = createAsyncThunk(
   'auth/logoutThunk',
   async({navigate}, {dispatch}) => {
      await dispatch(logout());
      navigate('/');
   }
)