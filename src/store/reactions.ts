import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Reaction, AddReactionPayload } from "../interfaces/interfaces";

export interface reactionsState {
  reactions: Reaction[];
}

const initialState: reactionsState = {
  reactions: [],
};

export const reactions = createSlice({
  name: "reactions",
  initialState,
  reducers: {
    addReaction: (state, action: PayloadAction<AddReactionPayload>) => {
      const { postId, commentId, reactionType } = action.payload;
      const existingReactionIndex = state.reactions.findIndex(
        (reaction) =>
          (reaction.postId === postId && reaction.commentId === null) ||
          (reaction.commentId === commentId && reaction.postId === null)
      );

      let newReactions = [...state.reactions];

      if (existingReactionIndex !== -1) {
        const existingReaction = newReactions[existingReactionIndex];
        if (
          (reactionType === "like" && existingReaction.like) ||
          (reactionType === "dislike" && existingReaction.dislike)
        ) {
          newReactions.splice(existingReactionIndex, 1);
        } else {
          newReactions[existingReactionIndex] = {
            like: reactionType === "like",
            dislike: reactionType === "dislike",
            postId: existingReaction.postId,
            commentId: existingReaction.commentId,
          };
        }
      } else {
        newReactions.push({
          like: reactionType === "like",
          dislike: reactionType === "dislike",
          postId: postId || null,
          commentId: commentId || null,
        });
      }

      return {
        ...state,
        reactions: newReactions,
      };
    },
    removeReaction: (state, action: PayloadAction<AddReactionPayload>) => {
      const { postId, commentId } = action.payload;
      let newReactions = state.reactions.filter(
        (reaction) =>
          !(reaction.postId === postId && reaction.commentId === null) &&
          !(reaction.commentId === commentId && reaction.postId === null)
      );
      return {
        ...state,
        reactions: newReactions,
      };
    },
    clearReactions: (state) => {
      return {
        ...state,
        reactions: [],
      };
    },
  },
});

export const { addReaction, removeReaction, clearReactions } =
  reactions.actions;

export default reactions.reducer;
