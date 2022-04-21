import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "@env";

const headers = {
  "Content-Type": "application/json",
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}`,
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    postNewUser: builder.mutation({
      query: ({ data }) => ({
        url: `/auth/register`,
        method: "post",
        headers,
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    isAvailable: builder.query({
      query: (username) => ({
        getState: () => {},
        url: `/auth?uname=${username}`,
        method: "post",
        headers,
        body: data,
      }),
    }),
    authenticateUser: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "post",
        headers,
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    logoutUser: builder.query({
      query: (userId) => ({
        url: `/auth/logout?uid=${userId}`,
        method: "get",
        headers,
      }),
      transformResponse: (res) => {
        if (res?.data?.id === null) {
          return true;
        } else {
          return false;
        }
      },
      providesTags: ["Auth"],
    }),
    getAllUsers: builder.query({
      query: ({ uid, q }) => ({
        url: `/auth/user?uid=${uid}&q=${q}`,
        method: "get",
        headers,
      }),
      providesTags: ["Auth"],
    }),
    patchUser: builder.mutation({
      query: ({ uid, data }) => ({
        url: `/auth/user?uid=${uid}`,
        method: "patch",
        headers,
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useAuthenticateUserMutation,
  useIsAvailableQuery,
  usePostNewUserMutation,
  useLogoutUserQuery,
  useGetAllUsersQuery,
  usePatchUserMutation,
} = authApi;
