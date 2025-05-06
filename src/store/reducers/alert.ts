import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StateType = {
  show?: boolean;
  status?: "success" | "error";
  message: string;
  onOk?: () => void;
};

const initialState: StateType = { show: false, message: "" };

const slice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    success: (
      state,
      { payload: { message, onOk } }: PayloadAction<StateType>
    ) => {
      state.show = true;
      state.status = "success";
      state.message = message;
      state.onOk = onOk;
    },
    error: (
      state,
      { payload: { message, onOk } }: PayloadAction<StateType>
    ) => {
      state.show = true;
      state.status = "error";
      state.message = message;
      state.onOk = onOk;
    },
    hide: (state) => {
      state.show = false;
      state.onOk = undefined;
    },
  },
});

export const { success, error, hide } = slice.actions;

export const alertReducer = slice.reducer;
