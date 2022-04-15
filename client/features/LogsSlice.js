import { createSlice } from "@reduxjs/toolkit";
import {
  getIsoToday,
  dateConverter,
  removeArrayDuplicates,
} from "../components/misc";

const initialState = {
  allLogs: [],
  myLogs: [],
  todayLogs: [],
  prevDayLogs: [],
  prevDay: null,
};

export const LogsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    setLogsData: (state, action) => {
      const { allLogs, uid } = action.payload;

      const myLogs = removeArrayDuplicates(
        [...state.myLogs, ...allLogs.filter((log) => uid === log.UserId)],
        "id"
      );

      const todayLogs = myLogs.filter(
        (log) => dateConverter(log.date) === getIsoToday()
      );

      const prevDay = myLogs
        ?.filter((log) => dateConverter(log.date) !== getIsoToday())
        ?.shift()?.date;

      const prevDayLogs = myLogs?.filter(
        (log) => dateConverter(log.date) === dateConverter(prevDay)
      );

      state.allLogs = allLogs;
      state.myLogs = myLogs;
      state.todayLogs = todayLogs;
      state.prevDayLogs = prevDayLogs;
      state.prevDay = prevDay;
    },
  },
});

export const { setLogsData } = LogsSlice.actions;

export default LogsSlice.reducer;
