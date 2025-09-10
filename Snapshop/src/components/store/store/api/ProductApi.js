import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProductApi = createApi({
  reducerPath: "ProductApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_API_URL}api/products/`,
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
    getProducts: builder.query({
      query: (params) => ({
        url: "",
        method: "GET",
        params,
      }),
      transformResponse: (response) => {
        // Support paginated or plain array responses
        if (response && Array.isArray(response)) return response;
        if (response && Array.isArray(response.results)) return response.results;
        return [];
      },
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "",
        method: "POST",
        body: productData, // productData should be FormData
        // Remove Content-type header here!
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `${id}/`,
        method: "PUT",
        body: data,
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    markSold: builder.mutation({
      query: (id) => ({
        url: `${id}/mark_sold/`,
        method: "POST",
      }),
    }),
    markAvailable: builder.mutation({
      query: (id) => ({
        url: `${id}/mark_available/`,
        method: "POST",
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${id}/`,
        method: "DELETE",
      }),
    }),
    getSoldProducts: builder.query({
      query: () => ({
        url: "sold-by-me/", // <-- Remove "api/" here!
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetSoldProductsQuery,
  useMarkSoldMutation,
  useMarkAvailableMutation,
} = ProductApi;