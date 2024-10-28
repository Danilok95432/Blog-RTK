import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = "https://dummyjson.com/";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    getPosts: builder.query<any, any>({
      query: (page) => `posts?limit=${10 + parseInt(page, 10) * 10}&skip=${0}`,
    }),
    getPostsByUser: builder.query<any, any>({
      query: (id) => `posts/user/${id}`,
    }),
    getPost: builder.query<any, any>({
      query: (id) => `posts/${id}`,
    }),
    getPostsTagList: builder.query<any, void>({
      query: () => `posts/tag-list?limit=10&skip=10`,
    }),
    getPostsByTag: builder.query<any, any>({
      query: (tag) => `posts/tag/${tag}`,
    }),
    getComments: builder.query<any, any>({
      query: (id) => `comments/post/${id}`,
    }),
    getUser: builder.query<any, any>({
      query: (id) => `users/${id}`,
    }),
    searchPost: builder.query<any, string>({
      query: (field) => `posts/search?q=${field}`,
    }),
    sortPosts: builder.query<any, { field: string; direct: string }>({
      query: ({ field, direct }) => `posts?sortBy=${field}&order=${direct}`,
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
  useGetPostsByTagQuery,
  useSearchPostQuery,
  useGetCommentsQuery,
  useGetUserQuery,
  useLoginMutation,
  useGetMeMutation,
} = api;
