import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "@env";

const headers = {
  "Content-Type": "application/json",
};

export const geocoderApi = createApi({
  reducerPath: "geocoderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}`,
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
