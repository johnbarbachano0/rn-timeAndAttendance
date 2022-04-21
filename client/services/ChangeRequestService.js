import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "@env";

const headers = {
  "Content-Type": "application/json",
};

export const changeRequestApi = createApi({
  reducerPath: "changeRequestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}`,
  }),
  tagTypes: ["ChangeRequest", "Approvals"],
  endpoints: (builder) => ({
    getChangeRequest: builder.query({
      query: ({ uid, query }) => ({
        url: `/changereq?q=${query}&uid=${uid}`,
        method: "get",
        headers,
      }),
      providesTags: ["ChangeRequest"],
    }),
    getApprovals: builder.query({
      query: ({ uid }) => ({
        url: `/changereq/approvals?uid=${uid}`,
        method: "get",
        headers,
      }),
      providesTags: ["Approvals"],
    }),
    postApproval: builder.mutation({
      query: ({ data, uid }) => ({
        url: `/changereq/approvals?uid=${uid}`,
        method: "post",
        headers,
        body: data,
      }),
      invalidatesTags: ["ChangeRequest", "Approvals"],
    }),
    postChangeRequest: builder.mutation({
      query: ({ data, uid }) => ({
        url: `/changereq?uid=${uid}`,
        method: "post",
        headers,
        body: data,
      }),
      invalidatesTags: ["ChangeRequest", "Approvals"],
    }),
    patchChangeRequest: builder.mutation({
      query: ({ data, uid }) => ({
        url: `/changereq?uid=${uid}`,
        method: "patch",
        headers,
        body: data,
      }),
      invalidatesTags: ["ChangeRequest", "Approvals"],
    }),
  }),
});

export const {
  useGetChangeRequestQuery,
  useGetApprovalsQuery,
  usePostApprovalMutation,
  usePostChangeRequestMutation,
  usePatchChangeRequestMutation,
} = changeRequestApi;
