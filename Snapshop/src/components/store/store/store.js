import { configureStore } from "@reduxjs/toolkit";
import { AuthenticationApi } from "./api/Authentication";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "./slices/AuthSlice";
// import { EventApi } from "./api/EventApi";
// import { ParticipantApi } from "./api/ParticipantApi";
// import { UserApi } from "./api/UserApi";
// import { SiteApi } from "./api/SiteApi";

export const store = configureStore({
  reducer: {
    [AuthenticationApi.reducerPath]: AuthenticationApi.reducer,
    // [EventApi.reducerPath]: EventApi.reducer,
    // [ParticipantApi.reducerPath]: ParticipantApi.reducer,
    // [UserApi.reducerPath]: UserApi.reducer,
    // [SiteApi.reducerPath]: SiteApi.reducer,
    auth: authSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      AuthenticationApi.middleware,
    //   EventApi.middleware,
    //   ParticipantApi.middleware,
    //   UserApi.middleware,
    //   SiteApi.middleware
    ),
});
setupListeners(store.dispatch);