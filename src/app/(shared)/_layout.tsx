import { Stack } from "expo-router";
import { useTheme } from "@rneui/themed";

import { Header } from "@/components/common";

import { SUMMARY, TEXT } from "@/utils/text";

export default function HomeLayout() {
  const {
    theme: { colors },
  } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
        header: ({ options: { headerTitle } }) => (
          <Header title={headerTitle as string} backBtn />
        ),
      }}
    >
      <Stack.Screen name="scan-receipt" />
      <Stack.Screen
        name="add-expense"
        options={{ headerTitle: SUMMARY.add(TEXT.expense) }}
      />
      <Stack.Screen
        name="categories/[categoryId]"
        options={({ route }) => ({ headerTitle: route.params["categoryName"] })}
      />
      <Stack.Screen
        name="financial-tips/[tipId]"
        options={{ headerTitle: TEXT.financialTips }}
      />
    </Stack>
  );
}
