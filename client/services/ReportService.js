import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "@env";

const headers = {
  "Content-Type": "application/json",
};

export const reportsApi = createApi({
  reducerPath: "reportsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}`,
  }),
  tagTypes: ["Reports"],
  endpoints: (builder) => ({
    getDurationReport: builder.query({
      query: ({ uid, query, filter }) => ({
        url: `timelog/report/duration?q=${query}&uid=${uid}&filter=${filter}`,
        method: "get",
        headers,
      }),
      providesTags: ["Reports"],
    }),
  }),
});

export const { useGetDurationReportQuery } = reportsApi;
