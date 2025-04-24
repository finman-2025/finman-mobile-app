import { StyleSheet, Text, View } from "react-native";
import { memo } from "react";
import { useTheme } from "@rneui/themed";

type PropsType = {
  color: string;
  percent: number;
};

export default memo(function BarProgress(props: PropsType) {
  const { color, percent } = props;
  const {
    theme: { colors },
  } = useTheme();

  return (
    <View style={[styles.bar, { backgroundColor: colors.disabled }]}>
      <View
        style={[
          styles.progress,
          { backgroundColor: color, width: `${percent * 100}%` },
        ]}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  bar: {
    height: 16,
    borderRadius: 10,
    overflow: "hidden",
  },
  progress: {
    position: "absolute",
    height: 16,
    maxWidth: "100%",
    borderRadius: 2,
  },
  percent: { lineHeight: 18, textAlign: "center" },
});
