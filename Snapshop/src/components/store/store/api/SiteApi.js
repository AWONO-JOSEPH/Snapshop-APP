import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const SiteApi = createApi({
  reducerPath: "SiteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_API_URL,
    prepareHeaders: (headers) => {
      const user = localStorage.getItem("user");
      if (user) {
        const userParsed = JSON.parse(user);
        // console.log("USER PARSED ", userParsed);
        headers.set("authorization", `Bearer ${userParsed.token.access}`);
        headers.set("Content-type", "application/json");
        // // console.log(headers.get("authorization"));
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSites: builder.query({
      query: () => "sites/",
    }),
    createSite: builder.mutation({
      query: ({ data }) => {
        return {
          url: "sites/",
          body: data,
          method: "POST",
        };
      },
    }),
    manageSiteGetData: builder.query({
      query: ({ id }) => {
        return {
          url: `site/${id}/manage/`,
        };
      },
    }),
    updateSite: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `sites/single_site/${id}/`,
          body: data,
          method: "PUT",
        };
      },
    }),
    addParcourToSite: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `site/${id}/manage/`,
          body: data,
          method: "POST",
        };
      },
    }),
    deleteSite: builder.mutation({
      query: (id) => {
        return {
          url: `sites/${id}/`,
          method: "DELETE",
        };
      },
    }),
  }),

  //
});

export const {
  useGetSitesQuery,
  useCreateSiteMutation,
  useDeleteSiteMutation,
  useEditSiteMutation,
  useManageSiteGetDataQuery,
  useAddParcourToSiteMutation,
  useUpdateSiteMutation
} = SiteApi;
