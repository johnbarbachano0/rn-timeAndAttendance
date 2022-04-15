import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/AuthSlice";
import { authApi } from "../services/AuthService";
import maintenanceReducer from "../features/MaintenanceSlice";
import { maintenanceApi } from "../services/MaintenanceService";
import logsReducer from "../features/LogsSlice";
import { logsApi } from "../services/LogService";
import changeRequestReducer from "../features/ChangeRequestSlice";
import { changeRequestApi } from "../services/ChangeRequestService";
import geocoderReducer from "../features/GeocoderSlice";
import { historyApi } from "../services/HistoryService";
import historyReducer from "../features/HistorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    maintenance: maintenanceReducer,
    [maintenanceApi.reducerPath]: maintenanceApi.reducer,
    logs: logsReducer,
    [logsApi.reducerPath]: logsApi.reducer,
    changeRequest: changeRequestReducer,
    [changeRequestApi.reducerPath]: changeRequestApi.reducer,
    location: geocoderReducer,
    [historyApi.reducerPath]: historyApi.reducer,
    history: historyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(maintenanceApi.middleware)
      .concat(logsApi.middleware)
      .concat(changeRequestApi.middleware)
      .concat(historyApi.middleware),
});
