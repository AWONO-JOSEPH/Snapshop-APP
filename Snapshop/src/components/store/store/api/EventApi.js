import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const EventApi = createApi({
  reducerPath: "EventApi",
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
    createEvent: builder.mutation({
      query: ({ data }) => {
        return {
          url: "events/",
          body: data,
          method: "POST",
        };
      },
    }),
    getEvents: builder.query({
      query: () => "events/",
    }),
    deleteEvents: builder.mutation({
      query: (id) => {
        return {
          url: `events/${id}/`,
          method: "DELETE",
        }
      },
    }),
    updateEvent: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `events/${id}/`,
          method: "PUT",
          body: data
        }
      },
    }),
    manageEventGetData: builder.query({
      query: ({ id }) => {
        return {
          url: `event/datas/${id}/`,
          method: "GET",

        }
      },
    }),
    addParticipantToEvent: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `event/datas/${id}/`,
          method: "POST",
          body: data

        }
      },
    }),
    deleteParticipantToEvent: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `event/datas/${id}/`,
          method: "DELETE",
          body: data
        }
      },
    }),
  }),

  //
});

export const { useCreateEventMutation,
  useGetEventsQuery,
  useDeleteEventsMutation,
  useManageEventGetDataQuery,
  useDeleteParticipantToEventMutation,
  useAddParticipantToEventMutation,
  useUpdateEventMutation
} = EventApi;
