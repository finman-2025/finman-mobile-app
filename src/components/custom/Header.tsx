import type { ReactNode } from "react";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, useTheme } from "@rneui/themed";
import { FontAwesome6 } from "@expo/vector-icons";

import CustomText from "./CustomText";

type IProps = {
  title: string;
  backBtn?: boolean;
  right?: (props?: any) => ReactNode;
};

export default function Header({ title, backBtn, right }: IProps) {
  const {
    theme: { colors },
  } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: colors.background }]}>
      <View style={styles.left}>
        {backBtn && (
          <Button
            buttonStyle={styles.backBtn}
            icon={
              <FontAwesome6 name="arrow-left" size={22} color={colors.white} />
            }
            onPress={router.back}
          />
        )}
        <CustomText type="h4" style={styles.title}>
          {title}
        </CustomText>
      </View>
      {right && right()}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    zIndex: 1000,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  left: {
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  backBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 50,
  },
  title: { marginBottom: 1 },
});
