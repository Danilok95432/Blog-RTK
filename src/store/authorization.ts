import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface authorizationState {
  isAuth: boolean;
  username: string;
  password: string;
  token: string;
}

const initialState: authorizationState = {
  isAuth: false,
  username: "",
  password: "",
  token: "",
};

export const authorization = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    changeLog: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isAuth: action.payload
      }
    },
    changeUsername: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        username: action.payload
      }
    },
    changePassword: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        password: action.payload
      }
    },
    setToken: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        token: action.payload
      }
    },
  },
});

export const { changeLog, changeUsername, changePassword, setToken } =
  authorization.actions;

export default authorization.reducer;
