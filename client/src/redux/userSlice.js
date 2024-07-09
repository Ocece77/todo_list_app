import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loggedIn : false,
  accountCreated : null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

     //account created in action
     accountCreatedSuccess: (state) => {
      state.error = null;
      state.accountCreated = true;
    },
    accountCreatedFailed: (state, action) => {
      state.error = action.payload;
    },

    //sign in action
    signInStart: (state) => {
      state.error = null;
      state.accountCreated = false;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loggedIn = true;
      state.accountCreated = false;

    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.accountCreated = false;
    },


     //update  action
    updateStart: (state) => { 
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser =  action.payload ;
      
    },
    updateFailure: (state) => {
      state.error = true
    },

     //delete  action
    deleteUserStart: (state) => { 
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loggedIn = false;
      localStorage.removeItem('user')
    },
    deleteUserFailure: (state) => {
      state.error = true    
    },


   //sign out  action
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loggedIn = false;
      localStorage.removeItem('user')
    },
  },
});

export const {
  accountCreatedFailed,
  accountCreatedSuccess,
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} = userSlice.actions;

export default userSlice.reducer;