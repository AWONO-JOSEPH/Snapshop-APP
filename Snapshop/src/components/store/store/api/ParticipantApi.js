import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ParticipantApi = createApi({
  reducerPath: 'participantApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api/products/',
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token?.access;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productData) => ({
        url: 'create-product/',
        method: 'POST',
        body: productData,
      }),
    }),
    getProducts: builder.query({
      query: () => ({
        url: '?category=',
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreateProductMutation, useGetProductsQuery } = ParticipantApi;