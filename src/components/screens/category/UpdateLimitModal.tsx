import { memo } from "react";
import { Controller, useForm } from "react-hook-form";

import { useUpdateCategory } from "@/hooks/categories";

import {
  CustomBottomSheet,
  CustomButton,
  NumberInput,
} from "@/components/custom";

import { SUMMARY, TEXT } from "@/utils/text";
import { View } from "react-native";

type IProps = {
  categoryId: number;
  current?: number;
  show: boolean;
  onCancel?: () => void;
};

export default memo(function UpdateLimtiModal(props: IProps) {
  const { categoryId, current, show, onCancel } = props;

  const [updateCategory, { isLoading }] = useUpdateCategory();

  const { control, handleSubmit, reset } = useForm<{ limit: string }>({
    disabled: isLoading,
    defaultValues: { limit: current?.toString() },
  });

  const handleUpdate = handleSubmit(
    ({ limit }) =>
      +limit !== current &&
      updateCategory({ id: categoryId, limit: +limit }, onCancel)
  );

  return (
    <CustomBottomSheet
      title={SUMMARY.edit(TEXT.limit)}
      show={show}
      onCancel={() => {
        if (!isLoading) {
          reset();
          onCancel();
        }
      }}
    >
      <Controller
        control={control}
        rules={{ min: { value: 1000, message: SUMMARY.minLimit(1000, "đ") } }}
        render={({
          field: { value, onChange, disabled },
          fieldState: { error },
        }) => (
          <NumberInput
            label={`${TEXT.limit} (đ)`}
            placeholder={SUMMARY.enter(TEXT.limit)}
            value={value}
            onChangeText={onChange}
            disabled={disabled}
            errorMessage={error?.message}
          />
        )}
        name="limit"
      />

      <View style={{ flexDirection: "row", gap: 16, marginTop: 20 }}>
        <CustomButton
          type="clear"
          color="secondary"
          containerStyle={{ flex: 1 }}
          disabled={isLoading}
          onPress={() => {
            reset();
            onCancel();
          }}
        >
          {TEXT.cancel}
        </CustomButton>
        <CustomButton
          containerStyle={{ flex: 1 }}
          loading={isLoading}
          onPress={handleUpdate}
        >
          {TEXT.ok}
        </CustomButton>
      </View>
    </CustomBottomSheet>
  );
});
