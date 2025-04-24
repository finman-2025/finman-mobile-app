import type { ReactNode } from "react";
import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@rneui/themed";
import CustomText from "./CustomText";

type PropsType = {
  children: ReactNode;
  active?: boolean;
};

export default memo(function TabBarButton(props: PropsType) {
  const { children, active } = props;

  const {
    theme: { colors },
  } = useTheme();

  return (
    <View
      style={[
        styles.button,
        { backgroundColor: active ? colors.primary : "transparent" },
      ]}
    >
      <CustomText status={active ? "white" : "label"}>{children}</CustomText>
    </View>
  );
});

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 50,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
