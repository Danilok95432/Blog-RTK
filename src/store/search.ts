import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface searchState {
  value: string;
}

const initialState: searchState = {
  value: "",
};

export const search = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeValue: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        value: action.payload
      }
    },
  },
});

export const { changeValue } = search.actions;

export default search.reducer;
