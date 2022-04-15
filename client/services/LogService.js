import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";
const { manifest } = Constants;
const port = 5007;
const server =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift().concat(`:${port}`)
    : `api.example.com`;

const headers = {
  "Content-Type": "application/json",
};

export const logsApi = createApi({
  reducerPath: "logsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${server}`,
  }),
  tagTypes: ["Logs"],
  endpoints: (builder) => ({
    getLogs: builder.query({
      query: ({ uid, query, filter }) => ({
        url: `/timelog?q=${query}&uid=${uid}&filter=${filter}`,
        method: "get",
        headers,
      }),
      providesTags: ["Logs"],
    }),
    postLogs: builder.mutation({
      query: (data) => ({
        url: `/timelog?uid=${data.UserId}`,
        method: "post",
        headers,
        body: data,
      }),
      invalidatesTags: ["Logs"],
    }),
    patchLogs: builder.mutation({
      query: ({ data }) => ({
        url: `/timelog?uid=${data.UserId}`,
        method: "patch",
        headers,
        body: data,
      }),
      invalidatesTags: ["Logs"],
    }),
  }),
});

export const { useGetLogsQuery, usePostLogsMutation, usePatchLogsMutation } =
  logsApi;
