import { router, Tabs } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@rneui/themed";
import { Feather, FontAwesome6, Fontisto } from "@expo/vector-icons";

import { TabBarButton } from "@/components/custom";

import { PATH, TOKEN_NAME } from "@/constants";
import { removeItem, getItem } from "@/utils/store-actions";

export default function TabLayout() {
  const {
    theme: { colors },
  } = useTheme();

  useEffect(() => {
    const checkTokens = async () => {
      // await removeItem("hasOnboarding");
      const [hasOnboarding, accessToken] = await Promise.all([
        getItem(TOKEN_NAME.HAS_ONBOARDING),
        getItem(TOKEN_NAME.ACCESS_TOKEN),
      ]);
      if (!hasOnboarding) router.replace(PATH.ONBOARDING);
      else if (!accessToken) router.replace(PATH.LOGIN);
    };
    checkTokens();
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: colors.backgroundPrimary,
            boxShadow: `0 0 10 ${colors.disabled}`,
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
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    borderTopWidth: 0,
    paddingHorizontal: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    position: "absolute",
  },
  item: { alignItems: "center", justifyContent: "center" },
});
