import { createTheme } from "@rneui/themed";

export * from "@rneui/themed";

type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };

declare module "@rneui/themed" {
  export interface Colors
    extends Record<
      | "primary"
      | "secondary"
      | "background"
      | "backgroundPrimary"
      | "white"
      | "black"
      | "grey0"
      | "grey1"
      | "grey2"
      | "grey3"
      | "grey4"
      | "grey5"
      | "grey6"
      | "greyOutline"
      | "searchBg"
      | "success"
      | "warning"
      | "error"
      | "disabled"
      | "shadow"
      | "backdrop",
      string
    > {}

  export interface FullTheme {
    lightColors: RecursivePartial<Colors>;
  }
}

export const THEME = createTheme({
  lightColors: {
    primary: "#33aaff",
    secondary: "#666666",
    backgroundPrimary: "#e6f4ff",
    black: "#222222",
    white: "#ffffff",
    background: "#f7fafe",
    grey0: "#444444",
    grey1: "#555555",
    grey2: "#666666",
    grey3: "#888888",
    grey4: "#aaaaaa",
    grey5: "#cccccc",
    grey6: "#dddddd",
    greyOutline: "#bbbbbb",
    searchBg: "#303337",
    success: "#53d145",
    error: "#ff5555",
    warning: "#ffaa33",
    disabled: "#eeeeee",
    shadow: "#00000006",
    backdrop: "#0001",
  },
});

export * from "./categoryColors";
