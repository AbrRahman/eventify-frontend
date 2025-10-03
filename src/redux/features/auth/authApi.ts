import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (payload) => ({
        url: "/user",
        method: "POST",
        body: payload,
      }),
    }),
    signin: builder.mutation({
      query: (payload) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
      }),
      transformResponse: (data) => {
        return data?.data;
      },
    }),

    // for google authentication data post
    googleSingIn: builder.mutation({
      query: (payload) => ({
        url: "auth/google-login",
        method: "POST",
        body: payload,
      }),
      transformResponse: (data) => {
        return data;
      },
    }),

    // get user profile
    getUserProfile: builder.query({
      providesTags: ["profile"],
      query: () => ({
        url: "auth/profile",
        method: "GET",
      }),
      transformResponse: (data) => {
        return data?.data;
      },
    }),
    passwordChange: builder.mutation({
      query: (payload) => ({
        url: "auth/password-change",
        method: "PUT",
        body: payload,
      }),
    }),

    // update user profile
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: "auth/profile",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGoogleSingInMutation,
  useSigninMutation,
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  usePasswordChangeMutation,
} = authApi;
