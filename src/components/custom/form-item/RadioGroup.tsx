import { memo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { FlatList, View } from "react-native";

import type { IOption } from "@/types/frontend";

import RadioButton from "./RadioButton";
import CustomText from "../CustomText";

type IProps = {
  required?: boolean;
  style?: StyleProp<ViewStyle>;
  label?: string;
  options: IOption[];
  value: number | string;
  onChange: (value: string | number) => void;
  disabled?: boolean;
  errorMessage?: string;
};

export default memo(function RadioGroup(props: IProps) {
  const {
    required,
    style,
    label,
    options,
    value,
    onChange,
    disabled,
    errorMessage,
  } = props;

  return (
    <View>
      {label && (
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 10 }}>
          <CustomText type="h6" status="label">
            {label}
          </CustomText>
          {required && (
            <CustomText type="h5" status="error">
              *
            </CustomText>
          )}
        </View>
      )}
      <FlatList
        data={options}
        renderItem={({ item, index }) => (
          <RadioButton
            key={index}
            disabled={disabled}
            style={{ paddingHorizontal: 0, paddingVertical: 2 }}
            label={item.label ?? item.value.toString()}
            checked={item.value === value}
            onPress={() => onChange(item.value)}
          />
        )}
        horizontal
        contentContainerStyle={[{ gap: 30 }, style]}
        scrollEnabled={false}
      />
      {errorMessage && (
        <CustomText type="p5" status="error">
          {errorMessage}
        </CustomText>
      )}
    </View>
  );
});
