import type { PropsWithChildren } from "react";
import { Fragment, memo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { ScrollView, StyleSheet, View } from "react-native";
import { BottomSheet, Dialog, Overlay, useTheme } from "@rneui/themed";

type IProps = PropsWithChildren<{
  show: boolean;
  title: string;
  onCancel?: () => void;
  contentStyle?: StyleProp<ViewStyle>;
}>;

export default memo(function CustomBottomSheet(props: IProps) {
  const { show, title, onCancel, contentStyle, children } = props;

  const {
    theme: { colors },
  } = useTheme();

  return (
    <Fragment>
      <Overlay
        isVisible={show}
        animationType="fade"
        overlayStyle={{ display: "none" }}
      />
      <BottomSheet
        isVisible={show}
        containerStyle={styles.wrapper}
        scrollViewProps={{ scrollEnabled: false }}
        onBackdropPress={onCancel}
      >
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.white,
              boxShadow: `0 0 15 5 ${colors.shadow}`,
            },
          ]}
        >
          <Dialog.Title title={title} titleStyle={{ textAlign: "center" }} />
          <ScrollView contentContainerStyle={[styles.content, contentStyle]}>
            {children}
          </ScrollView>
        </View>
      </BottomSheet>
    </Fragment>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    maxHeight: "80%",
    marginTop: "auto",
    backgroundColor: "transparent",
    pointerEvents: "box-none",
  },
  container: {
    maxHeight: "100%",
    paddingTop: 16,
    gap: 6,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    paddingTop: 10,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
});
