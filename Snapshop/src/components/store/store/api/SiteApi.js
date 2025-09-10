import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const SiteApi = createApi({
  reducerPath: "SiteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_API_URL}api/`,
    prepareHeaders: (headers) => {
      const raw = localStorage.getItem("user");
      if (raw) {
        try {
          const user = JSON.parse(raw);
          const token = user?.token?.access;
          if (token) headers.set("Authorization", `Bearer ${token}`);
        } catch (_) {}
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => `wishlist/`,
      transformResponse: (response) => {
        if (Array.isArray(response)) return response;
        if (response && Array.isArray(response.results)) return response.results;
        return [];
      },
    }),
    addToWishlist: builder.mutation({
      query: (productId) => ({
        url: `wishlist/`,
        method: "POST",
        body: { product_id: productId },
        headers: { "Content-Type": "application/json" },
      }),
    }),
    removeFromWishlist: builder.mutation({
      query: (id) => ({
        url: `wishlist/${id}/`,
        method: "DELETE",
      }),
    }),
    getSites: builder.query({
      query: () => "sites/",
    }),
    createSite: builder.mutation({
      query: ({ data }) => ({
        url: "sites/",
        body: data,
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    manageSiteGetData: builder.query({
      query: ({ id }) => ({
        url: `site/${id}/manage/`,
      }),
    }),
    updateSite: builder.mutation({
      query: ({ data, id }) => ({
        url: `sites/single_site/${id}/`,
        body: data,
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    addParcourToSite: builder.mutation({
      query: ({ id, data }) => ({
        url: `site/${id}/manage/`,
        body: data,
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    deleteSite: builder.mutation({
      query: (id) => ({
        url: `sites/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useGetSitesQuery,
  useCreateSiteMutation,
  useDeleteSiteMutation,
  useManageSiteGetDataQuery,
  useAddParcourToSiteMutation,
  useUpdateSiteMutation
} = SiteApi;
