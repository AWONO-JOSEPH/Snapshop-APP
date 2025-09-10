import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const EventApi = createApi({
  reducerPath: "EventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_API_URL, // <-- Vite uses import.meta.env
    prepareHeaders: (headers) => {
      const user = localStorage.getItem("user");
      if (user) {
        const userParsed = JSON.parse(user);
        headers.set("Authorization", `Bearer ${userParsed.token.access}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: ({ data }) => ({
        url: "events/",
        body: data,
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    getEvents: builder.query({
      query: () => "events/",
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `events/${id}/`,
        method: "DELETE",
      }),
    }),
    updateEvent: builder.mutation({
      query: ({ id, data }) => ({
        url: `events/${id}/`,
        method: "PUT",
        body: data,
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    manageEventGetData: builder.query({
      query: ({ id }) => ({
        url: `event/datas/${id}/`,
        method: "GET",
      }),
    }),
    addParticipantToEvent: builder.mutation({
      query: ({ id, data }) => ({
        url: `event/datas/${id}/`,
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    deleteParticipantFromEvent: builder.mutation({
      query: ({ id, data }) => ({
        url: `event/datas/${id}/`,
        method: "DELETE",
        body: data,
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetEventsQuery,
  useDeleteEventMutation,
  useManageEventGetDataQuery,
  useDeleteParticipantFromEventMutation,
  useAddParticipantToEventMutation,
  useUpdateEventMutation,
} = EventApi;
