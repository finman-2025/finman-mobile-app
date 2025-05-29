import { Fragment, memo, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useTheme } from "@rneui/themed";

import type { IOption } from "@/types/frontend";
import type { CustomInputProps } from "./CustomInput";

import { TextInput } from "./CustomInput";
import { CustomBottomSheet } from "..";

import _ from "lodash";
import RadioButton from "./RadioButton";

type IProps = Omit<
  CustomInputProps,
  "ref" | "value" | "onChange" | "onChangeText"
> & {
  value: number | string;
  options: IOption[];
  onChange: (value: string | number) => void;
};

export default memo(function Select(props: IProps) {
  const { value, options, onChange, disabled, ...rest } = props;
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
          value={
            _.find(options, { value })?.label ??
            _.find(options, { value })?.value.toString() ??
            ""
          }
          rightIcon={{
            type: "feather",
            name: "chevron-down",
            color: disabled ? colors.grey3 : colors.grey1,
          }}
        />
      </TouchableOpacity>
      <CustomBottomSheet
        show={!disabled && showModal}
        onCancel={() => setShowModal(false)}
        title={(props.placeholder ?? props.label ?? "") as string}
        contentStyle={{
          paddingHorizontal: 0,
          paddingTop: 0,
          paddingBottom: 24,
        }}
      >
        <FlatList
          data={options}
          renderItem={({ item, index }) => (
            <RadioButton
              key={index}
              label={item.label ?? item.value.toString()}
              checked={item.value === value}
              onPress={() => {
                onChange(item.value);
                setShowModal(false);
              }}
            />
          )}
          scrollEnabled={false}
        />
      </CustomBottomSheet>
    </Fragment>
  );
});
