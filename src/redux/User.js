import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userDetails',
  initialState: { value: {} },
  reducers: {
    userData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { userData } = userSlice.actions;
export default userSlice.reducer;
