import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "@env";
// import Constants from "expo-constants";
// const { manifest } = Constants;
// const port = 5007;
// const server =
//   typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
//     ? manifest.debuggerHost.split(`:`).shift().concat(`:${port}`)
//     : `api.example.com`;

const headers = {
  "Content-Type": "application/json",
};

export const maintenanceApi = createApi({
  reducerPath: "maintenaneApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}`,
  }),
  tagTypes: ["Maintenance"],
  endpoints: (builder) => ({
    getMaintenance: builder.query({
      query: ({ uid, query, type }) => ({
        url: `/maintenance?q=${query}&uid=${uid}&type=${type}`,
        method: "get",
        headers,
      }),
      providesTags: ["Maintenance"],
    }),
    postMaintenance: builder.mutation({
      query: ({ uid, type, data }) => ({
        url: `/maintenance?uid=${uid}&type=${type}`,
        method: "post",
        headers,
        body: data,
      }),
      invalidatesTags: ["Maintenance"],
    }),
    patchMaintenance: builder.mutation({
      query: ({ uid, type, data }) => ({
        url: `/maintenance?uid=${uid}&type=${type}`,
        method: "patch",
        headers,
        body: data,
      }),
      invalidatesTags: ["Maintenance"],
    }),
  }),
});

export const {
  useGetMaintenanceQuery,
  usePatchMaintenanceMutation,
  usePostMaintenanceMutation,
} = maintenanceApi;
