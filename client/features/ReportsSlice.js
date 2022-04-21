import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  durationReport: [],
};

export const ReportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setDurationReport: (state, action) => {
      state.durationReport = action.payload;
    },
  },
});

export const { setDurationReport } = ReportsSlice.actions;

export default ReportsSlice.reducer;
