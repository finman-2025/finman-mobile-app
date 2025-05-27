import type { IconProps, InputProps } from "@rneui/themed";
import { memo, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { Input, useTheme } from "@rneui/themed";
import { Feather } from "@expo/vector-icons";

import CustomText from "../CustomText";
import { checkNumber } from "@/utils/common";

export type CustomInputProps = InputProps & {
  required?: boolean;
};

const CustomInput = (props: CustomInputProps) => {
  const { required, leftIcon, label, ...rest } = props;
  const {
    theme: { colors },
  } = useTheme();

  return (
    <Input
      {...rest}
      placeholderTextColor={colors.grey4}
      label={
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 2 }}>
          <CustomText type="h6" status="label">
            {props.label}
          </CustomText>
          {props.required && (
            <CustomText type="h5" status="error">
              *
            </CustomText>
          )}
        </View>
      }
      containerStyle={{ paddingHorizontal: 0 }}
      leftIcon={
        leftIcon
          ? {
              ...(leftIcon as IconProps),
              color: props.disabled ? colors.grey3 : colors.grey1,
            }
          : undefined
      }
    />
  );
};

export const TextInput = memo((props: CustomInputProps) => {
  return <CustomInput {...props} />;
});

export const NumberInput = memo((props: CustomInputProps) => {
  const { onChangeText, ...rest } = props;
  const handleChange = (v: string) => checkNumber(v) && onChangeText(v);
  return (
    <CustomInput
      {...rest}
      onChangeText={handleChange}
      keyboardType="number-pad"
      inputMode="numeric"
    />
  );
});

export const PasswordInput = memo((props: CustomInputProps) => {
  const {
    theme: { colors },
  } = useTheme();

  const [hideText, setHideText] = useState<boolean>(true);

  return (
    <CustomInput
      {...props}
      autoCapitalize="none"
      secureTextEntry={hideText}
      rightIcon={
        <TouchableOpacity
          style={{ paddingVertical: 10, paddingLeft: 8 }}
          onPress={() => (hideText ? setHideText(false) : setHideText(true))}
        >
          <Feather
            name={hideText ? "eye-off" : "eye"}
            size={20}
            color={props.disabled ? colors.grey4 : colors.grey3}
          />
        </TouchableOpacity>
      }
    />
  );
});
