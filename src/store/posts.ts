import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../interfaces/interfaces";

export interface postsState {
  posts: Post[];
  searchField: string,
  filterTag: string
}

const initialState: postsState = {
  posts: [],
  searchField: '',
  filterTag: ''
};

export const posts = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      return {
        ...state,
        posts: action.payload
      }
    },
    isSearching: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        searchField: action.payload
      }
    },
    isFiltering: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        filterTag: action.payload
      }
    }
  },
});

export const { setPosts, isSearching, isFiltering } = posts.actions;
