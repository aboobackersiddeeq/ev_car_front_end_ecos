import { createSlice} from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name:"productDetails",
    initialState:{value:{}},
    reducers:{
            product:(state, action)=>{
            state.value= action.payload;
        }
    }
});
export const {product} = productSlice.actions;
export default productSlice.reducer;