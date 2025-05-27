import { router, Tabs } from "expo-router";
import { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useTheme } from "@rneui/themed";
import { Feather, FontAwesome6, Fontisto } from "@expo/vector-icons";

import { TabBarButton } from "@/components/common";

import { PATH, TOKEN_NAME } from "@/constants";
import { getItem } from "@/utils/store-actions";

export default function TabLayout() {
  const {
    theme: { colors },
  } = useTheme();

  const [tokenChecked, setTokenChecked] = useState<boolean>(false);

  useEffect(() => {
    const checkTokens = async () => {
      // await removeItem("hasOnboarding");
      const [hasOnboarding, accessToken] = await Promise.all([
        getItem(TOKEN_NAME.HAS_ONBOARDING),
        getItem(TOKEN_NAME.ACCESS_TOKEN),
      ]);
      if (!hasOnboarding) router.replace(PATH.ONBOARDING);
      else if (!accessToken) router.replace(PATH.LOGIN);
      setTokenChecked(true);
    };
    checkTokens();
  }, []);

  return tokenChecked ? (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: colors.backgroundPrimary,
            boxShadow: `0 0 10 ${colors.disabled}`,
            height: Platform.OS === "ios" ? 100 : 80,
            paddingTop: Platform.OS === "ios" ? 14 : 0,
          },
        ],
        tabBarItemStyle: styles.item,
        tabBarButton: ({ children, onPress }) => (
          <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarButton active={focused}>
              <Feather name="home" size={27} />
            </TabBarButton>
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarButton active={focused}>
              <Feather name="bar-chart-2" size={29} />
            </TabBarButton>
          ),
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarButton active={focused}>
              <Fontisto name="hipchat" size={26} />
            </TabBarButton>
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarButton active={focused}>
              <Feather name="grid" size={27} />
            </TabBarButton>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarButton active={focused}>
              <FontAwesome6 name="user" size={25} />
            </TabBarButton>
          ),
        }}
      />
    </Tabs>
  ) : (
    <View style={{ flex: 1 }}>
      <Image
        style={{ width: 120, height: 120, opacity: 0.5, margin: "auto" }}
        resizeMode="contain"
        source={require("@/assets/images/logo.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0,
    paddingHorizontal: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    position: "absolute",
  },
  item: { alignItems: "center", justifyContent: "center" },
});
