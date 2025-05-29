import { router, Stack } from "expo-router";
import { useTheme } from "@rneui/themed";

import { Header } from "@/components/common";

import { TEXT } from "@/utils/text";
import { CustomButton } from "@/components/custom";
import { PATH } from "@/constants";

export default function AnalyticsLayout() {
  const {
    theme: { colors },
  } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
        header: ({
          options: { headerTitle, headerRight },
          route: { name },
        }) => (
          <Header
            title={headerTitle as string}
            backBtn={name !== "index"}
            right={headerRight}
          />
        ),
      }}
      initialRouteName="index"
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: TEXT.analytics,
          headerRight: () => (
            <CustomButton
              type="clear"
              size="sm"
              onPress={() => router.push(PATH.EXPORT_REPORT)}
            >
              {TEXT.exportReport}
            </CustomButton>
          ),
        }}
      />
      <Stack.Screen
        name="export-report/index"
        options={{ headerTitle: TEXT.exportReport }}
      />
      <Stack.Screen
        name="export-report/history"
        options={{ headerTitle: TEXT.exportHistory }}
      />
    </Stack>
  );
}
