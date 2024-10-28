import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../interfaces/interfaces";

export interface userState {
  user: User | null
}

const initialState: userState = {
  user: null
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        user: action.payload
      }
    },
    logout: (state) => {
      return {
        ...state,
        user: null
      }
    } 
  },
});

export const { setUser, logout } = user.actions;

export default user.reducer;
