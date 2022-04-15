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

export const historyApi = createApi({
  reducerPath: "historyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${server}`,
  }),
  tagTypes: ["History"],
  endpoints: (builder) => ({
    getHistory: builder.query({
      query: ({ uid, query }) => ({
        url: `/history?q=${query}&uid=${uid}`,
        method: "get",
        headers,
      }),
      providesTags: ["History"],
    }),
  }),
});

export const { useGetHistoryQuery } = historyApi;
