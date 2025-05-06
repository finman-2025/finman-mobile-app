import { useState } from "react";
import { ViewProps } from "react-native";
import type { AnimatedProps } from "react-native-reanimated";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function AppearView(props: AnimatedProps<ViewProps>) {
  const { style, ...rest } = props;

  const opacity = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, { duration: 200 }),
  }));
  useState(() => {
    opacity.value = 1;
  });

  return <Animated.View {...rest} style={[style, animatedStyles]} />;
}
