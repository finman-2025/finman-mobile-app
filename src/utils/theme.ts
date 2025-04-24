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
      | "greyOutline"
      | "searchBg"
      | "success"
      | "warning"
      | "error"
      | "disabled"
      | "shadow",
      string
    > {}

  export interface FullTheme {
    lightColors: RecursivePartial<Colors>;
  }
}

const primary = "#33aaff";

export const THEME = createTheme({
  lightColors: {
    primary,
    secondary: "#2288cc",
    backgroundPrimary: "#e6f4ff",
    black: "#222",
    white: "#fff",
    background: "#f7fafe",
    grey0: "#444",
    grey1: "#555",
    grey2: "#666",
    grey3: "#888",
    grey4: "#aaa",
    grey5: "#ccc",
    greyOutline: "#bbb",
    searchBg: "#303337",
    success: "#41c431",
    error: "#ff5555",
    warning: "#ffaa33",
    disabled: "#eee",
    shadow: "#00000006",
  },
});
