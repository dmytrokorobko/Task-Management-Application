import { createAsyncThunk } from "@reduxjs/toolkit";
import { logout as authLogout } from "../../authSlice";
import { logout as tasksLogout } from "../../tasksSlice";
import { logout as userusLogout } from "../../usersSlice";

export const logoutThunk = createAsyncThunk(
   'auth/logoutThunk',
   ({navigate}, {dispatch}) => {
      dispatch(authLogout());
      dispatch(tasksLogout());
      dispatch(userusLogout());
      navigate('/');
   }
)