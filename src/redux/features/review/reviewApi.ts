import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReview: builder.query({
      providesTags: ["review"],
      query: () => ({
        url: "/review",
        method: "GET",
      }),
      transformResponse: (data) => {
        return data?.data;
      },
    }),
    submitReview: builder.mutation({
      query: (payload) => ({
        url: "/review",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const { useGetAllReviewQuery, useSubmitReviewMutation } = reviewApi;
