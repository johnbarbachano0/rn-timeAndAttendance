import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  maintenanceData: {
    approvers: [],
    changeReq: [],
    modules: [],
    roles: [],
    permissionRoleTags: [],
    permissions: [],
    timeLogTypes: [],
    workStatus: [],
  },
  accessData: [],
};

export const MaintenanceSlice = createSlice({
  name: "maintenance",
  initialState,
  reducers: {
    setMaintenanceData: (state, action) => {
      var newObj = {};
      const arr = action?.payload;
      arr.map((item) => {
        newObj = { ...newObj, ...item };
      });
      state.maintenanceData = newObj;
    },
    setAccessData: (state, action) => {
      state.accessData = action?.payload;
    },
  },
});

export const { setMaintenanceData, setAccessData } = MaintenanceSlice.actions;

export default MaintenanceSlice.reducer;
