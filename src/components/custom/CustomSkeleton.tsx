import type { SkeletonProps } from "@rneui/themed";
import { Skeleton, useTheme } from "@rneui/themed";
import { memo } from "react";

export default memo(function CustomSkeleton(props: SkeletonProps) {
  const { style, skeletonStyle, ...rest } = props;

  const {
    theme: { colors },
  } = useTheme();

  return (
    <Skeleton
      {...rest}
      skeletonStyle={[{ backgroundColor: colors.disabled }, skeletonStyle]}
      style={[
        { backgroundColor: colors.grey6 },
        props.circle
          ? { borderRadius: props.height + 100 }
          : { borderRadius: 10 },
        style,
      ]}
    />
  );
});
