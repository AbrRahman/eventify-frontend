import { baseApi } from "../../api/baseApi";

const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all event
    getAllEvent: builder.query({
      providesTags: ["event"],
      query: (searchTerm) => {
        const params = new URLSearchParams();
        if (searchTerm) {
          params.set("searchTerm", searchTerm);
        }
        return {
          url: "/event",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (data) => {
        return data?.data;
      },
    }),
    // set single event
    getSingleEvent: builder.query({
      query: (id) => ({
        url: `/event/${id}`,
        method: "GET",
      }),
      transformResponse: (data) => {
        return data?.data;
      },
    }),

    // create a event by admin
    createEvent: builder.mutation({
      query: (payload) => ({
        url: "/event",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["event"],
      transformResponse: (data) => {
        return data;
      },
    }),
    // update event
    updateService: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/event/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["event"],
      transformResponse: (data) => {
        return data;
      },
    }),
    // delete service by admin
    deleteDelete: builder.mutation({
      query: (id) => ({
        url: `/event/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["event"],
      transformResponse: (data) => {
        return data;
      },
    }),
  }),
});

export const {
  useGetAllEventQuery,
  useGetSingleEventQuery,
  useCreateEventMutation,
  useUpdateServiceMutation,
  useDeleteDeleteMutation,
} = eventApi;
