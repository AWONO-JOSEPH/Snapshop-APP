import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthenticationApi = createApi({
  reducerPath: "AuthenticationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_API_URL}auth/`,
    prepareHeaders: (headers, { endpoint }) => {
      if (endpoint !== "register" && endpoint !== "login") {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token?.access;
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ data }) => ({
        url: "login/",
        body: data,
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ uid, token, data }) => ({
        url: `reset_password_confirm/${uid}/${token}/`,
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    register: builder.mutation({
      query: ({ data }) => ({
        url: "register/",
        body: data,
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    refresh: builder.mutation({
      query: ({ refresh }) => ({
        url: "refresh/",
        method: "POST",
        body: { refresh },
        headers: { "Content-type": "application/json" },
      }),
    }),
    uploadProfilePicture: builder.mutation({
      query: ({ file }) => {
        const formData = new FormData();
        formData.append("profile_picture", file);
        return {
          url: "upload/profile-picture/",
          method: "POST",
          body: formData,
        };
      },
    }),

    // Fetch user profile by username
    getProfile: builder.query({
      query: (username) => `get_user_profile/${username}/`,
    }),

    // Fetch current authenticated user's profile
    getOwnProfile: builder.query({
      query: () => `get_own_profile/`,
    }),

    // Update user profile
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "update_profile/",
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useResetPasswordMutation,
  useRegisterMutation,
  useUploadProfilePictureMutation,
  useGetProfileQuery,
  useGetOwnProfileQuery,
  useUpdateProfileMutation,
  useRefreshMutation,
} = AuthenticationApi;
