import type { PropsWithChildren } from "react";
import { Fragment, useMemo } from "react";
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

  const statusStyle = useMemo(
    () => ({
      success: {
        top: -24,
        bgWidth: 50,
        iconSize: 66,
        icon: "checkmark-circle",
        color: colors.success,
        btnStatus: "success",
      },
      warning: {
        top: -30,
        bgWidth: 8,
        iconSize: 68,
        icon: "warning",
        color: colors.warning,
        btnStatus: "warning",
      },
      error: {
        top: -24,
        bgWidth: 50,
        iconSize: 66,
        icon: "close-circle",
        color: colors.error,
        btnStatus: "error",
      },
    }),
    [colors]
  );

  return (
    <Fragment>
      {children}
      {props.show && (
        <View style={{ position: "absolute", flex: 1 }}>
          <Overlay
            isVisible={props.show}
            overlayStyle={styles.wrapper}
            animationType="fade"
          >
            <View
              style={[styles.wrapIcon, { top: statusStyle[props.status].top }]}
            >
              <View
                style={[
                  styles.behindIcon,
                  { width: statusStyle[props.status].bgWidth },
                ]}
              />
              <Ionicons
                name={statusStyle[props.status].icon as any}
                size={statusStyle[props.status].iconSize}
                color={statusStyle[props.status].color}
              />
            </View>
            <CustomText style={styles.message}>{props.message}</CustomText>
            <CustomButton
              color={statusStyle[props.status].btnStatus}
              onPress={() => {
                props.onOk && props.onOk();
                dispatch(hide());
              }}
            >
              {TEXT.ok}
            </CustomButton>
          </Overlay>
        </View>
      )}
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
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  behindIcon: {
    position: "absolute",
    height: 45,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  message: {
    textAlign: "center",
    marginTop: 44,
    marginHorizontal: 12,
  },
});
