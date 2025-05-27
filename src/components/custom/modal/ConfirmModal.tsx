import { memo } from "react";
import { View } from "react-native";
import type { ButtonProps } from "@rneui/themed";
import { Dialog } from "@rneui/themed";

import { CustomButton, CustomText } from "@/components/custom";

import { TEXT } from "@/utils/text";

type IProps = {
  show: boolean;
  title: string;
  message: string;
  okText?: string;
  cancelText?: string;
  okBtnColor?: ButtonProps["color"];
  loading?: boolean;
  onCancel?: () => void;
  onOk?: () => void;
};

export default memo(function ConfirmModal(props: IProps) {
  const {
    show,
    title,
    message,
    okText,
    cancelText,
    okBtnColor,
    loading,
    onCancel,
    onOk,
  } = props;

  return (
    <Dialog
      isVisible={show}
      animationType="fade"
      onBackdropPress={onCancel}
      overlayStyle={{ width: "80%", borderRadius: 12 }}
    >
      <Dialog.Title title={title} titleStyle={{ textAlign: "center" }} />
      <CustomText style={{ textAlign: "center", marginTop: 8 }}>
        {message}
      </CustomText>
      <View style={{ flexDirection: "row", gap: 16, marginTop: 20 }}>
        <CustomButton
          color="secondary"
          type="clear"
          containerStyle={{ flex: 1 }}
          disabled={loading}
          onPress={onCancel}
        >
          {cancelText || TEXT.no}
        </CustomButton>
        <CustomButton
          color={okBtnColor ?? "primary"}
          containerStyle={{ flex: 1 }}
          loading={loading}
          onPress={onOk}
        >
          {okText || TEXT.yes}
        </CustomButton>
      </View>
    </Dialog>
  );
});
