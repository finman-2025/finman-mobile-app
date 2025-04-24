import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-reanimated";

import {
  ReduxToolkitProvider,
  RNElementsThemeProvider,
} from "@/components/providers";

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
    <SafeAreaProvider>
      <ReduxToolkitProvider>
        <RNElementsThemeProvider>
          <Stack screenOptions={{ headerShown: false, statusBarStyle: "dark" }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </RNElementsThemeProvider>
      </ReduxToolkitProvider>
    </SafeAreaProvider>
  );
}
