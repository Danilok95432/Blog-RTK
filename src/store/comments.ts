import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "../interfaces/interfaces";

export interface commentsState {
  id: number;
  comments: Comment[];
}

const initialState: commentsState = {
  id: JSON.parse(localStorage.getItem("id") ?? "1000"),
  comments: JSON.parse(localStorage.getItem("comments") ?? "[]"),
};

export const comments = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      const existingComments = new Set(
        state.comments.map((comment) => comment.id)
      );
      const newComments = action.payload.filter(
        (comment) => !existingComments.has(comment.id)
      );

      if (newComments.length > 0) {
        state.comments = [...state.comments, ...newComments];
        localStorage.setItem("comments", JSON.stringify(state.comments));
      }
    },

    addComment: (state, action: PayloadAction<Comment>) => {
      let currentId = JSON.parse(localStorage.getItem("id") ?? "1000");
      const newComment = { ...action.payload, id: currentId };
      state.comments = [...state.comments, newComment];
      localStorage.setItem("comments", JSON.stringify(state.comments));

      let nextId = currentId + 1;
      localStorage.setItem("id", String(nextId));
    },
  },
});

export const { setComments, addComment } = comments.actions;

export default comments.reducer;
