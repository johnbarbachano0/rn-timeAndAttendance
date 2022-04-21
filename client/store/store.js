import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/AuthSlice";
import { authApi } from "../services/AuthService";
import changeRequestReducer from "../features/ChangeRequestSlice";
import { changeRequestApi } from "../services/ChangeRequestService";
import historyReducer from "../features/HistorySlice";
import { historyApi } from "../services/HistoryService";
import maintenanceReducer from "../features/MaintenanceSlice";
import { maintenanceApi } from "../services/MaintenanceService";
import logsReducer from "../features/LogsSlice";
import { logsApi } from "../services/LogService";
import reportsReducer from "../features/ReportsSlice";
import { reportsApi } from "../services/ReportService";
import geocoderReducer from "../features/GeocoderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    changeRequest: changeRequestReducer,
    [changeRequestApi.reducerPath]: changeRequestApi.reducer,
    [historyApi.reducerPath]: historyApi.reducer,
    history: historyReducer,
    logs: logsReducer,
    [logsApi.reducerPath]: logsApi.reducer,
    location: geocoderReducer,
    maintenance: maintenanceReducer,
    [maintenanceApi.reducerPath]: maintenanceApi.reducer,
    reports: reportsReducer,
    [reportsApi.reducerPath]: reportsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(changeRequestApi.middleware)
      .concat(historyApi.middleware)
      .concat(logsApi.middleware)
      .concat(maintenanceApi.middleware)
      .concat(reportsApi.middleware),
});
