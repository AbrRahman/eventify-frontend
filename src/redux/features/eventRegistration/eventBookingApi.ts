import { baseApi } from "../../api/baseApi";

const eventBookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all my booking
    getAllMyBooking: builder.query({
      providesTags: ["booking"],
      query: () => {
        return {
          url: "/booking",
          method: "GET",
        };
      },
      transformResponse: (data) => {
        return data?.data;
      },
    }),

    bookingEvent: builder.mutation({
      query: (payload) => ({
        url: "/booking",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["booking"],
      transformResponse: (data) => {
        return data;
      },
    }),

    // cancel my booking
    cancelMyBooking: builder.mutation({
      query: (id) => ({
        url: `/booking/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["booking"],
      transformResponse: (data) => {
        return data;
      },
    }),
  }),
});

export const {
  useGetAllMyBookingQuery,
  useBookingEventMutation,
  useCancelMyBookingMutation,
} = eventBookingApi;
