import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthenticationApi = createApi({
  reducerPath: "AuthenticationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: " http://127.0.0.1:8000/auth/",
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ data }) => {
        return {
          url: "login/",
          body: data,
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    resetPassword: builder.mutation({
      query: ({ uid, token, data }) => {
        return {
          url: `reset_password_confirm/${uid}/${token}/`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useResetPasswordMutation } = AuthenticationApi;
