import { createSlice } from "@reduxjs/toolkit";

const hotelData = createSlice({
  name: "hoteldata",
  initialState: {
    data: [],
  },

  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = hotelData.actions;
export default hotelData.reducer;
