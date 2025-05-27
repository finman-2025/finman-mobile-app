import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

import { useEffect } from "react";
import "react-native-reanimated";

import {
  ReduxToolkitProvider,
  RNElementsThemeProvider,
  AlertProvider,
} from "@/components/providers";

// import * as Sentry from "@sentry/react-native";

// Sentry.init({
//   dsn: "https://513da0f66f89fdf1df6d6f3f53fe0fec@o4509282411216896.ingest.de.sentry.io/4509282412789840",
//   // Adds more context data to events (IP address, cookies, user, etc.)
//   // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
//   sendDefaultPii: true,
// });

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ReduxToolkitProvider>
      <RNElementsThemeProvider>
        <AlertProvider>
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="+not-found" />
          </Stack>
        </AlertProvider>
      </RNElementsThemeProvider>
    </ReduxToolkitProvider>
  );
}

// export default Sentry.wrap(RootLayout);
