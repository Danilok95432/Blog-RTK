import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post, Comment, User, LoginData } from "../interfaces/interfaces";

const url = "https://dummyjson.com/";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    getPosts: builder.query<{ limit: number, posts: Post[], skip: number, total: number}, { page?: number; tag?: string; search?: string }>({
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
    getPostsByUser: builder.query<{ limit: number, posts: Post[], skip: number, total: number}, string | undefined>({
      query: (id) => `posts/user/${id}`,
    }),
    getPost: builder.query<Post, string | undefined>({
      query: (id) => `posts/${id}`,
    }),
    getPostsTagList: builder.query<string[], void>({
      query: () => ({
        url: 'posts/tag-list',
        params: {
          limit: 10,
          skip: 10,
        },
      }),
    }),
    getComments: builder.query<{ limit: number, comments: Comment[], skip: number, total: number}, string | undefined>({
      query: (id) => `comments/post/${id}`,
    }),
    getUser: builder.query<User, string | undefined>({
      query: (id) => `users/${id}`,
    }),
    login: builder.mutation<LoginData, {username: string, password: string, expiresInMins: number}>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    getMe: builder.mutation<User, string>({
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
