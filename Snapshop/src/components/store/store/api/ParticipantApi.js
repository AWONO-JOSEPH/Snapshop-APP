import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ParticipantApi = createApi({
  reducerPath: "ParticiPantApi",
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
    createParticipant: builder.mutation({
      query: ({ data }) => {
        return {
          url: "participant/create/",
          body: data,
          method: "POST",
        };
      },
    }),
    getParticipantsDetails: builder.query({
      query: (id) => {
        return {
          url: `participant/${id}/details/`,
        };
      },
    }),
    getParticipants: builder.query({
      query: () => "participants_list/",
    }),
    // deleteParticipant: builder.mutation({
    //   query: (id) => {
    //     return {
    //         url: `events/${id}/`,
    //         method: "DELETE",
    //     }
    //   },
    // }),
  }),

  //
});

export const {
  useCreateParticipantMutation,
  useGetParticipantsDetailsQuery,
  useGetParticipantsQuery,
} = ParticipantApi;
