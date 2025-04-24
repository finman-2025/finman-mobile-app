import type { PropsWithChildren } from "react";

import { ThemeProvider } from "@rneui/themed";

import { THEME } from "@/utils/theme";

export default function RNElementsThemeProvider({
  children,
}: PropsWithChildren) {
  return <ThemeProvider theme={THEME}>{children}</ThemeProvider>;
}
