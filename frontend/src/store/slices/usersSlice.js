import {createSlice} from '@reduxjs/toolkit';

const usersSlice = createSlice({
   name: 'users',
   initialState: {
      users: null,
      loading: false,
      error: null,
   },
   reducers: {
      logout: (state) => {
         state.users = null;
         state.loading = false;
         state.error = null;         
      }
   }
})

export const {logout} = usersSlice.actions;
export default usersSlice.reducer;