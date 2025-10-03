import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../features/store";
import { logOut, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauthToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 404) {
    console.log("api not found");
  }
  if (result?.error?.status === 401) {
    const res = await fetch("http://localhost:8000/api/v1/auth/refresh", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;
      const googleUiu = (api.getState() as RootState).auth.googleUiu;

      api.dispatch(
        setUser({ user, token: data?.data?.accessToken, googleUiu })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauthToken,
  tagTypes: ["event", "booking", "review", "profile"],
  endpoints: () => ({}),
});
