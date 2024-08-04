import { createSlice } from "@reduxjs/toolkit";
import { registerThunk } from "./thunks/auth/registerThunk";

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      username: '',
      role: '',
      token: '',
      loading: false,
      error: null
   },
   reducers: {
      logout: (state) => {
         state.username = '';
         state.role = '';
         state.token = '';
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
   }
});

export default authSlice.reducer;