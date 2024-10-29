import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = "https://dummyjson.com/";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    getPosts: builder.query<any, { page?: number; tag?: string; search?: string }>({
      query: ({ page, tag, search }) => {
        if (search) {
          return {
            url: 'posts/search',
            params: {
              q: search,
            },
          };
        } else if (tag) {
          return {
            url: `posts/tag/${tag}`,
          };
        } else {
          return {
            url: 'posts',
            params: {
              limit: 10 + (page || 0) * 10,
              skip: 0,
            },
          };
        }
      },
    }),
    getPostsByUser: builder.query<any, string | undefined>({
      query: (id) => `posts/user/${id}`,
    }),
    getPost: builder.query<any, string | undefined>({
      query: (id) => `posts/${id}`,
    }),
    getPostsTagList: builder.query<any, void>({
      query: () => ({
        url: 'posts/tag-list',
        params: {
          limit: 10,
          skip: 10,
        },
      }),
    }),
    getComments: builder.query<any, string | undefined>({
      query: (id) => `comments/post/${id}`,
    }),
    getUser: builder.query<any, string | undefined>({
      query: (id) => `users/${id}`,
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    getMe: builder.mutation({
      query: (token) => ({
        url: "/auth/me",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostsByUserQuery,
  useGetPostQuery,
  useGetPostsTagListQuery,
  useGetCommentsQuery,
  useGetUserQuery,
  useLoginMutation,
  useGetMeMutation,
} = api;
