import { memo, useCallback, useState } from "react";
import type { ScrollViewProps } from "react-native";
import { RefreshControl, ScrollView } from "react-native";
import { useTheme } from "@rneui/themed";

type IProps = ScrollViewProps & {
  onRefresh?: () => Promise<any>;
};

export default memo(function RefreshableScrollView(props: IProps) {
  const { onRefresh, contentContainerStyle, ...rest } = props;

  const {
    theme: { colors },
  } = useTheme();

  const [refreshing, setRefreshing] = useState<boolean>();
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
      {...rest}
      contentContainerStyle={[
        {
          paddingHorizontal: 16,
          paddingTop: 24,
          paddingBottom: 120,
        },
        contentContainerStyle,
      ]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[colors.primary]}
          // progressBackgroundColor={colors.cardBg}
        />
      }
    />
  );
});
