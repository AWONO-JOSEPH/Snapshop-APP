// src/components/store/store/index.js

import { configureStore } from "@reduxjs/toolkit";
import { AuthenticationApi } from "./api/Authentication";
import { EventApi } from "./api/EventApi2"; 
import { ProductApi } from "./api/ProductApi"; // Import the ProductApi
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "./slices/AuthSlice";

export const store = configureStore({
  reducer: {
    [AuthenticationApi.reducerPath]: AuthenticationApi.reducer,
    [EventApi.reducerPath]: EventApi.reducer, // Add EventApi reducer
    [ProductApi.reducerPath]: ProductApi.reducer, // Add ProductApi reducer
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      AuthenticationApi.middleware,
      EventApi.middleware, // Add EventApi middleware
      ProductApi.middleware, // Add ProductApi middleware
    ),
});

setupListeners(store.dispatch);