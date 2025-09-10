import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const MessagingApi = createApi({
  reducerPath: 'MessagingApi',
  tagTypes: ['Conversations', 'Conversation', 'Unread'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_API_URL}api/`,
    prepareHeaders: (headers) => {
      const raw = localStorage.getItem('user');
      if (raw) {
        try {
          const user = JSON.parse(raw);
          const token = user?.token?.access;
          if (token) headers.set('Authorization', `Bearer ${token}`);
        } catch (_) {}
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => 'conversations/',
      transformResponse: (response) => {
        if (response && Array.isArray(response)) return response;
        if (response && Array.isArray(response.results)) return response.results;
        return [];
      },
      providesTags: (result) => {
        const list = Array.isArray(result) ? result : [];
        return [
          { type: 'Conversations', id: 'LIST' },
          { type: 'Unread', id: 'COUNT' },
          ...list.map((c) => ({ type: 'Conversation', id: c.id })),
        ];
      },
    }),
    getUnreadCount: builder.query({
      query: () => 'conversations/unread_count/',
      providesTags: [{ type: 'Unread', id: 'COUNT' }],
    }),
    getConversationMessages: builder.query({
      query: (id) => `conversations/${id}/messages/`,
      providesTags: (result, error, id) => [{ type: 'Conversation', id }],
    }),
    startConversation: builder.mutation({
      query: ({ data }) => ({
        url: 'conversations/start/',
        method: 'POST',
        body: data,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: (result) =>
        result
          ? [
              { type: 'Conversations', id: 'LIST' },
              { type: 'Conversation', id: result.id },
              { type: 'Unread', id: 'COUNT' },
            ]
          : [
              { type: 'Conversations', id: 'LIST' },
              { type: 'Unread', id: 'COUNT' },
            ],
    }),
    sendMessage: builder.mutation({
      query: ({ data }) => ({
        url: 'messages/',
        method: 'POST',
        body: data,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Conversations', id: 'LIST' },
        { type: 'Conversation', id: arg.data.conversation },
        { type: 'Unread', id: 'COUNT' },
      ],
    }),
    markAsRead: builder.mutation({
      query: ({ id }) => ({
        url: `messages/${id}/read/`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Conversations', id: 'LIST' }, { type: 'Unread', id: 'COUNT' }],
    }),
    deleteConversation: builder.mutation({
      query: (id) => ({
        url: `conversations/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Conversations', id: 'LIST' }, { type: 'Unread', id: 'COUNT' }],
    }),


  }),
});

export const {
  useGetConversationsQuery,
  useGetUnreadCountQuery,
  useGetConversationMessagesQuery,
  useStartConversationMutation,
  useSendMessageMutation,
  useMarkAsReadMutation,
  useDeleteConversationMutation,
} = MessagingApi;
