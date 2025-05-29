import { Fragment, memo, useCallback, useMemo, useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "@rneui/themed";
import { Octicons } from "@expo/vector-icons";

import type { CustomInputProps } from "../CustomInput";
import { TextInput } from "../CustomInput";
import DateModal from "./DateModal";

import { toDateString } from "@/utils/common";

type IProps = Omit<
  CustomInputProps,
  "ref" | "value" | "onChange" | "onChangeText"
> & {
  value?: Date;
  onChange: (value: Date) => void;
};

export default memo(function DatePicker(props: IProps) {
  const { value, onChange, placeholder, disabled, ...rest } = props;

  const {
    theme: { colors },
  } = useTheme();

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <Fragment>
      <TouchableOpacity disabled={disabled} onPress={() => setShowModal(true)}>
        <TextInput
          {...rest}
          disabled
          disabledInputStyle={{ opacity: disabled ? 0.5 : 1 }}
          value={value ? toDateString(value) : ""}
          placeholder={placeholder || "dd/mm/yyyy"}
          rightIcon={{
            type: "feather",
            name: "calendar",
            color: disabled ? colors.grey3 : colors.grey1,
          }}
        />
      </TouchableOpacity>
      <DateModal
        initial={value}
        show={!disabled && showModal}
        onCancel={() => setShowModal(false)}
        onOk={(value: Date) => {
          onChange(value);
          setShowModal(false);
        }}
      />
    </Fragment>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    height: 62,
    paddingLeft: 2,
    paddingRight: 20,
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wrapInput: {
    flex: 1,
    height: 62,
    backgroundColor: "transparent",
  },
});
