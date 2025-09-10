// src/components/store/store/index.js

import { configureStore } from "@reduxjs/toolkit";
import { AuthenticationApi } from "./api/Authentication";
import { EventApi } from "./api/EventApi"; // Fixed: use EventApi.js, not EventApi2.js
import { ProductApi } from "./api/ProductApi"; // Import the ProductApi
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "./slices/AuthSlice";
import { MessagingApi } from "./api/MessagingApi";
import { SiteApi } from "./api/SiteApi";

export const store = configureStore({
  reducer: {
    [AuthenticationApi.reducerPath]: AuthenticationApi.reducer,
    [EventApi.reducerPath]: EventApi.reducer, // Add EventApi reducer
    [ProductApi.reducerPath]: ProductApi.reducer, // Add ProductApi reducer
    [MessagingApi.reducerPath]: MessagingApi.reducer,
    [SiteApi.reducerPath]: SiteApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      AuthenticationApi.middleware,
      EventApi.middleware, // Add EventApi middleware
      ProductApi.middleware, // Add ProductApi middleware
      MessagingApi.middleware,
      SiteApi.middleware,
    ),
});

setupListeners(store.dispatch);