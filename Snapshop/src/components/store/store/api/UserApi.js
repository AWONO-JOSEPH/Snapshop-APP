import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_API_URL,
    prepareHeaders: (headers) => {
      const user = localStorage.getItem("user");
      if (user) {
        const userParsed = JSON.parse(user);
        headers.set("Authorization", `Bearer ${userParsed.token.access}`);
        headers.set("Content-type", "application/json");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "users/",
    }),
    createUser: builder.mutation({
      query: ({ data }) => ({
        url: "users/",
        body: data,
        method: "POST",
      }),
    }),
    editUser: builder.mutation({
      query: ({ data }) => ({
        url: `users/${data.id}/`,
        body: data,
        method: "PUT",
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}/`,
        method: "DELETE",
      }),
    }),
    getTokenExpiry: builder.query({
      query: () => 'check_session',
    }),
  }),
});

export const {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useEditUserMutation,
  useGetTokenExpiryQuery
} = UserApi;
