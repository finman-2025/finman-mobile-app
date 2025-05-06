import { memo } from "react";
import { View } from "react-native";
import { Dialog } from "@rneui/themed";

import { CustomButton, CustomText } from "@/components/custom";

import { TEXT } from "@/utils/text";

type IProps = {
  show: boolean;
  title: string;
  message: string;
  okText?: string;
  cancelText?: string;
  onCancel?: () => void;
  onOk?: () => void;
};

export default memo(function ConfirmModal(props: IProps) {
  const { show, title, message, okText, cancelText, onCancel, onOk } = props;

  return (
    <Dialog
      isVisible={show}
      onBackdropPress={onCancel}
      overlayStyle={{ width: "80%", borderRadius: 14 }}
    >
      <Dialog.Title title={title} titleStyle={{ textAlign: "center" }} />
      <CustomText style={{ textAlign: "center", marginTop: 8 }}>
        {message}
      </CustomText>
      <View style={{ flexDirection: "row", gap: 16, marginTop: 20 }}>
        <CustomButton
          color="secondary"
          containerStyle={{ flex: 1 }}
          onPress={onCancel}
        >
          {cancelText || TEXT.no}
        </CustomButton>
        <CustomButton
          color="success"
          containerStyle={{ flex: 1 }}
          onPress={onOk}
        >
          {okText || TEXT.yes}
        </CustomButton>
      </View>
    </Dialog>
  );
});
