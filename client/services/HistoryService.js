import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "@env";

const headers = {
  "Content-Type": "application/json",
};

export const historyApi = createApi({
  reducerPath: "historyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}`,
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
