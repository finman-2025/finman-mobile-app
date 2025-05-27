import { Stack } from "expo-router";
import { useTheme } from "@rneui/themed";

import { Header } from "@/components/common";

import { SUMMARY, TEXT } from "@/utils/text";

export default function ProfileLayout() {
  const {
    theme: { colors },
  } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
        header: ({ options: { headerTitle }, route: { name } }) => (
          <Header title={headerTitle as string} backBtn={name !== "index"} />
        ),
      }}
      initialRouteName="index"
    >
      <Stack.Screen name="index" options={{ headerTitle: TEXT.profile }} />
      <Stack.Screen
        name="update"
        options={{ headerTitle: SUMMARY.update(TEXT.information) }}
      />
      <Stack.Screen
        name="change-password"
        options={{ headerTitle: SUMMARY.change(TEXT.password) }}
      />
    </Stack>
  );
}
