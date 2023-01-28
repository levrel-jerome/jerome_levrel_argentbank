import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUserData: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export default userSlice.reducer;
export const { setUserData } = userSlice.actions;
