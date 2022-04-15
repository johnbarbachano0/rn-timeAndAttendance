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

export const geocoderApi = createApi({
  reducerPath: "geocoderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${server}`,
  }),
  endpoints: (builder) => ({
    getGeocode: builder.query({
      query: ({ type, lat, lon }) => ({
        url: `/geocoder?type=${type}&lat=${lat}&lon=${lon}`,
        method: "get",
        headers,
      }),
    }),
  }),
});

export const { useGetGeocodeQuery } = geocoderApi;
