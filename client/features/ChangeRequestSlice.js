import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  changeRequestsData: [],
  approvalsData: [],
};

export const ChangeRequestSlice = createSlice({
  name: "changeRequest",
  initialState,
  reducers: {
    setChangeRequestsData: (state, action) => {
      state.changeRequestsData = action.payload;
    },
    setApprovalsData: (state, action) => {
      const approvals = action.payload;
      const proc = approvals?.map((item) => ({
        ...item,
        fullname: item.firstname + " " + item.lastname,
      }));
      state.approvalsData = proc;
    },
  },
});

export const { setChangeRequestsData, setApprovalsData } =
  ChangeRequestSlice.actions;

export default ChangeRequestSlice.reducer;
