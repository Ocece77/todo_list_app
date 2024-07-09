import { createSlice } from "@reduxjs/toolkit"



const initialState ={
  added : null,
  fetching:null,
  error: null,
}

const taskSlice =  createSlice({
  name: 'task',
  initialState,
  reducers :{
    fetchingTask :(state)=>{
      state.fetching  = true;
    },
    fetchingTaskFailed :(state)=>{
      state.error  = true;
    },
    fetchingTaskSuccess :(state)=>{
      state.fetching  = false;
    },
    addTaskSuccess : (state) => {
      state.added = true
    },
    addTaskFailed : (state) => {
      state.added = false
   },
   addTaskDefault : (state) => {
    state.added = null
 }

   
  }
})

export const {addTaskSuccess ,addTaskFailed , addTaskDefault ,fetchingTaskSuccess ,fetchingTaskFailed,fetchingTask} = taskSlice.actions;
export default taskSlice.reducer