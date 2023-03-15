import { createSlice } from "@reduxjs/toolkit";

const dealerSlice=createSlice({
    name:'DealerDetails',
    initialState:{value:{}},
    reducers:{
        dealerLogin:(state,action)=>{
           state.value= action.payload
        }
    }
})


export const {dealerLogin}=dealerSlice.actions
export default dealerSlice.reducer;