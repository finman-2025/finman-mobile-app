import { memo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { CheckBox, useTheme } from "@rneui/themed";
import { Fontisto } from "@expo/vector-icons";

type IProps = {
  style?: StyleProp<ViewStyle>;
  label: string;
  disabled?: boolean;
  checked: boolean;
  onPress?: () => void;
};

export default memo(function RadioButton(props: IProps) {
  const { style, label, disabled, checked, onPress } = props;
  const {
    theme: { colors },
  } = useTheme();
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <CheckBox
        title={label}
        disabled={disabled}
        textStyle={[styles.radioText, { color: colors.black }]}
        containerStyle={[styles.radioContainer, style]}
        checked={checked}
        checkedIcon={
          <Fontisto name="radio-btn-active" size={22} color={colors.primary} />
        }
        uncheckedIcon={
          <Fontisto name="radio-btn-passive" size={22} color={colors.grey3} />
        }
      />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  radioContainer: {
    pointerEvents: "none",
    backgroundColor: "transparent",
    padding: 12,
    marginLeft: 0,
    marginRight: 0,
  },
  radioText: { fontSize: 16, fontWeight: 400 },
});
