import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@rneui/themed";

import { BarProgress } from "@/components/common";
import { CustomText } from "@/components/custom";

type PropsType = {
  title: string;
  color?: string;
  progress: number;
  limit: number;
  onPress?: () => void;
};

export default memo(function CategoryCard(props: PropsType) {
  const {
    theme: { colors },
  } = useTheme();

  const { title, color = colors.primary, progress, limit, onPress } = props;

  return (
    <View
      style={[
        styles.card,
        { boxShadow: `0 5 5 ${colors.shadow}`, backgroundColor: `${color}11` },
      ]}
    >
      <View style={styles.top}>
        <CustomText type="h6">{title}</CustomText>
        <View style={{ flexDirection: "row" }}>
          <CustomText type="p4" status="hint">
            {progress} đ /
          </CustomText>
          <CustomText type="p4" color={color}>
            {" "}
            {limit} đ
          </CustomText>
        </View>
      </View>
      <BarProgress color={color} percent={progress / limit} />
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
