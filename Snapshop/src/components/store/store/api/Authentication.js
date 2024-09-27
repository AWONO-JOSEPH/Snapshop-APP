import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthenticationApi = createApi({
  reducerPath: "AuthenticationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/auth/",
    prepareHeaders: (headers, { getState }) => {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token?.access; // Ensure you access the token correctly

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    }
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
    register: builder.mutation({
      query: ({ data }) => {
        return {
          url: "register/",
          body: data,
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    uploadProfilePicture: builder.mutation({
      query: ({ file }) => {
        const formData = new FormData();
        formData.append('profile_picture', file); // Adjust field name as necessary

        // Retrieve the user object from local storage
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token?.access; // Ensure you access the token correctly

        return {
          url: "upload/profile-picture/", // Ensure this matches your Django URL pattern
          method: "POST",
          body: formData,
          headers: {
            'Authorization': `Bearer ${token}` // Include token if available
          },
        };
      },
    }),

    // Fetch user profile
    getProfile: builder.query({
      query: () => "/get_user_profile/<str:username>/",
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
  useUpdateProfileMutation 
} = AuthenticationApi;
