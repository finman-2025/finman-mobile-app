import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type StateType = { theme: any; darkMode: any };

const slice = createSlice({
  name: "home",
  initialState: { theme: null, darkMode: null },
  reducers: {
    actionA: (state, { payload: { theme, darkMode } }) => {
      if (typeof theme !== "undefined") {
        state.theme = theme;
      }
      if (typeof darkMode !== "undefined") {
        state.darkMode = darkMode;
      }
    },
    actionB: (state, action: PayloadAction<StateType>) => {
      if (!state.theme) {
        state.theme = action.payload.theme;
        state.darkMode = action.payload.darkMode;
      }
    },
  },
});

export const { actionA, actionB } = slice.actions;

export const homeReducer = slice.reducer;
