import { createSlice } from "@reduxjs/toolkit";
import { removeArrayDuplicates } from "../components/misc";

const initialState = {
  historyData: [],
};

export const HistorySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setHistoryData: (state, action) => {
      var arr = action?.payload;
      const history = state.historyData;
      arr = removeArrayDuplicates([...history, ...arr], "id");
      state.historyData = arr;
    },
  },
});

export const { setHistoryData } = HistorySlice.actions;

export default HistorySlice.reducer;
