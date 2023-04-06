import { createSlice } from '@reduxjs/toolkit';

export const groupSlice = createSlice({
  name: 'productDetails',
  initialState: { value: {} },
  reducers: {
    selectionGroup: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { selectionGroup } = groupSlice.actions;
export default groupSlice.reducer;
