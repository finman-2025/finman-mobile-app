import { Stack } from "expo-router";
import { useTheme } from "@rneui/themed";

import { Header } from "@/components/custom";

import { TEXT } from "@/utils/text";

export default function CategoriesLayout() {
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
      <Stack.Screen name="index" options={{ headerTitle: TEXT.categories }} />
      <Stack.Screen
        name="[categoryId]"
        options={{ headerTitle: TEXT.categories }}
      />
    </Stack>
  );
}
