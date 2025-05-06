import { Stack } from "expo-router";
import { Platform } from "react-native";
import { useTheme } from "@rneui/themed";

import { Header } from "@/components/custom";

import { TEXT } from "@/utils/text";

export default function HomeLayout() {
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
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="history"
        options={{ headerTitle: TEXT.transactionHistory }}
      />
      <Stack.Screen
        name="tips/index"
        options={{ headerTitle: TEXT.financeTips }}
      />
      <Stack.Screen
        name="tips/[tipId]"
        options={{ headerTitle: TEXT.financeTips }}
      />
    </Stack>
  );
}
