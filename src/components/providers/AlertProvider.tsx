import type { PropsWithChildren } from "react";
import { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { Overlay, useTheme } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";

import { useAppDispatch, useAppSelector } from "@/hooks/common";
import { hide } from "@/store/reducers";

import { CustomButton, CustomText } from "@/components/custom";

import { TEXT } from "@/utils/text";

export default function AlertProvider({ children }: PropsWithChildren) {
  const {
    theme: { colors },
  } = useTheme();

  const props = useAppSelector(({ alert }) => alert);
  const dispatch = useAppDispatch();

  return (
    <Fragment>
      {children}
      <View style={{ position: "absolute", flex: 1 }}>
        <Overlay
          isVisible={props.show}
          overlayStyle={styles.wrapper}
          animationType="fade"
        >
          <View style={styles.wrapIcon}>
            <View style={styles.behindIcon}></View>
            <Ionicons
              name={
                props.status === "success" ? "checkmark-circle" : "close-circle"
              }
              size={66}
              color={props.status === "success" ? colors.success : colors.error}
            />
          </View>
          <CustomText style={styles.message}>{props.message}</CustomText>
          <CustomButton
            color={props.status === "success" ? "success" : "error"}
            onPress={() => {
              props.onOk && props.onOk();
              dispatch(hide());
            }}
          >
            {TEXT.ok}
          </CustomButton>
        </Overlay>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "80%",
    marginBottom: 30,
    borderRadius: 12,
    justifyContent: "center",
    gap: 24,
  },
  wrapIcon: {
    position: "absolute",
    top: -24,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  behindIcon: {
    position: "absolute",
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  message: {
    textAlign: "center",
    marginTop: 44,
    marginHorizontal: 12,
  },
});
