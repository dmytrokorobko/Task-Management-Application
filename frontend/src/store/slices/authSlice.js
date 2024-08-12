import { createSlice } from "@reduxjs/toolkit";
import { registerThunk } from "./thunks/auth/registerThunk";
import { loginThunk } from "./thunks/auth/loginThunk";

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: null,
      role: null,
      token: null,
      loading: false,
      error: null
   },
   reducers: {
      logout: (state) => {
         state.user = null;
         state.role = null;
         state.token = null;
         state.loading = false;
         state.error = null;
      }
   },
   extraReducers: builder => {
      builder
         //register
         .addCase(registerThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(registerThunk.fulfilled, (state, action) => {
            state.loading = false;            
            state.error = null;
         })
         .addCase(registerThunk.rejected, (state, action) => {
            state.loading = true;
            state.error = action.payload;
         })
         //login
         .addCase(loginThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(loginThunk.fulfilled, (state, action) => {
            state.loading = false;            
            state.error = null;
            state.user = action.payload.username;
            state.token = action.payload.token;
            state.role = action.payload.role;
         })
         .addCase(loginThunk.rejected, (state, action) => {
            state.loading = true;
            state.error = action.payload;
         })
   }
});

export default authSlice.reducer;
export const {logout} = authSlice.actions;