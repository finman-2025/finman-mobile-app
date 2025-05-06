import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { useTheme } from "@rneui/themed";

import { PATH, TOKEN_NAME } from "@/constants";
import { getItem } from "@/utils/store-actions";

export default function AuthLayout() {
  const {
    theme: { colors },
  } = useTheme();

  useEffect(() => {
    const checkTokens = async () => {
      const accessToken = await getItem(TOKEN_NAME.ACCESS_TOKEN);
      if (accessToken) router.replace(PATH.HOME);
    };
    checkTokens();
  }, []);

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.background },
        header: () => <StatusBar barStyle="dark-content" />,
      }}
      initialRouteName="login"
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
