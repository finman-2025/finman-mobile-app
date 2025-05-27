import { Fragment, type ReactNode } from "react";
import { router } from "expo-router";
import { StatusBar, StyleSheet, View } from "react-native";
import { Button, useTheme } from "@rneui/themed";
import { FontAwesome6 } from "@expo/vector-icons";

import { CustomText } from "@/components/custom";

type IProps = {
  title: string;
  backBtn?: boolean;
  right?: (props?: any) => ReactNode;
};

export default function Header(props: IProps) {
  const { title, backBtn, right } = props;

  const {
    theme: { colors },
  } = useTheme();

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />

      <View
        style={[
          styles.header,
          title
            ? { backgroundColor: colors.background }
            : { position: "absolute" },
        ]}
      >
        <View style={styles.left}>
          {backBtn && <BackButton />}
          <CustomText type="h4" style={styles.title}>
            {title}
          </CustomText>
        </View>
        {right && right()}
      </View>
    </Fragment>
  );
}

const BackButton = () => (
  <Button
    buttonStyle={styles.backBtn}
    containerStyle={styles.backBtnContainer}
    icon={<FontAwesome6 name="arrow-left" size={22} color="#fff" />}
    onPress={router.back}
  />
);

const styles = StyleSheet.create({
  header: {
    zIndex: 1000,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 28,
  },
  left: {
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  backBtn: { paddingVertical: 6, paddingHorizontal: 16 },
  backBtnContainer: { borderRadius: 50, overflow: "hidden" },
  title: { marginBottom: 1 },
});
