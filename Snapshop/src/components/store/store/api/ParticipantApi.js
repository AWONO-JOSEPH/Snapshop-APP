import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ProductApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api/products/',
  }),
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productData) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token?.access;
        return {
          url: 'create-product/', 
          method: 'POST',
          body: productData,
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        };
      },
    }),
    getProducts: builder.query({
      query: () => ({
        url: 'http://127.0.0.1:8000/api/products/?category=',
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreateProductMutation, useGetProductsQuery } = ProductApi;