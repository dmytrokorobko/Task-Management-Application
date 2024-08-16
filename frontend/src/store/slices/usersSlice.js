import {createSlice} from '@reduxjs/toolkit';
import { usersThunk } from './thunks/users/usersThunk';
import { updateUserThunk } from './thunks/users/updateUserThunk';
import { editUserThunk } from './thunks/users/editUserThunk';

const usersSlice = createSlice({
   name: 'users',
   initialState: {
      users: null,
      loading: false,
      error: null,
      success: false
   },
   reducers: {
      logout: (state) => {
         state.users = null;
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
         //show all tasks
         .addCase(usersThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
         })
         .addCase(usersThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload.users;
            state.success = true;
         })
         .addCase(usersThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         //update user
         .addCase(updateUserThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
         })
         .addCase(updateUserThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.users = state.users.map(user => {               
               if (user.id === action.meta.arg.user.id) {
                  return {
                     ...user,
                     ...action.meta.arg.user
                  };
               };
               return user;
            })
         })
         .addCase(updateUserThunk.rejected, (state, action) => {
            state.loading = false;        
            state.error = action.payload;
         })
         //get selected user
         .addCase(editUserThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
         })
         .addCase(editUserThunk.fulfilled, (state, action) => {
            state.loading = false;
         })
         .addCase(editUserThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   }
})

export const { logout, clearError } = usersSlice.actions;
export default usersSlice.reducer;