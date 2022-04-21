import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "@env";

const headers = {
  "Content-Type": "application/json",
};

export const logsApi = createApi({
  reducerPath: "logsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}`,
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

export const {
  useGetLogsQuery,
  usePostLogsMutation,
  usePatchLogsMutation,
  useGetDurationReportQuery,
} = logsApi;
