import { memo, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { arr } from "@/utils/common";

type IProps = {
  numSteps: number;
  current: number;
};

export default memo(function StepProgress({ numSteps, current }: IProps) {
  return (
    <View style={styles.container}>
      {arr(numSteps).map((_, index) => (
        <Circle active={index + 1 === current} key={index} />
      ))}
    </View>
  );
});

const Circle = ({ active }: { active: boolean }) => {
  const width = useSharedValue(10);
  useEffect(() => {
    width.value = active ? 20 : 10;
  }, [active]);

  const style = useAnimatedStyle(() => ({
    width: withTiming(width.value, { duration: active ? 500 : 300 }),
  }));

  return (
    <Animated.View
      style={[
        { backgroundColor: active ? "#33aaff" : "#eee" },
        styles.circle,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
  circle: {
    height: 10,
    borderRadius: 100,
  },
});
