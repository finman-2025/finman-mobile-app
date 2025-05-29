import { Fragment, memo } from "react";
import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";

import type { CreateCategoryDto } from "@/types/dto";
import type { ICreateCategory } from "@/types/frontend";

import {
  CustomButton,
  TextInput,
  NumberInput,
  RadioGroup,
  ImageUpload,
} from "@/components/custom";

import { EXPENSE_TYPE } from "@/constants";
import { SUMMARY, TEXT } from "@/utils/text";

type IProps = {
  submitting?: boolean;
  onCancel?: () => void;
  onSubmit: (value: CreateCategoryDto) => void;
};

export default memo(function CreateCategoryForm(props: IProps) {
  const { submitting, onCancel, onSubmit } = props;

  const { control, watch, handleSubmit } = useForm<ICreateCategory>({
    disabled: submitting,
    defaultValues: { type: EXPENSE_TYPE.OUTCOME },
  });

  const type = watch("type");

  const submit = handleSubmit((value) =>
    onSubmit({
      ...value,
      type: value.type,
      limit: value.limit ? +value.limit : undefined,
    })
  );

  return (
    <Fragment>
      <Controller
        control={control}
        render={({ field: { value, onChange, disabled } }) => (
          <ImageUpload
            label={TEXT.image}
            value={value}
            onUpload={onChange}
            disabled={disabled}
            style={{ marginBottom: 20 }}
          />
        )}
        name="image"
      />

      <Controller
        control={control}
        rules={{ required: SUMMARY.pleaseEnter(TEXT.categoryName) }}
        render={({
          field: { value, onChange, disabled },
          fieldState: { error },
        }) => (
          <TextInput
            required
            label={TEXT.categoryName}
            placeholder={SUMMARY.enter(TEXT.categoryName)}
            value={value}
            onChangeText={onChange}
            disabled={disabled}
            errorMessage={error?.message}
          />
        )}
        name="name"
      />

      <Controller
        control={control}
        rules={{ required: SUMMARY.pleaseSelect(TEXT.expenseType) }}
        render={({
          field: { value, onChange, disabled },
          fieldState: { error },
        }) => (
          <RadioGroup
            required
            style={{ marginBottom: 10 }}
            label={TEXT.expenseType}
            options={[
              { value: EXPENSE_TYPE.OUTCOME, label: TEXT.outcome },
              { value: EXPENSE_TYPE.INCOME, label: TEXT.income },
            ]}
            value={value}
            onChange={onChange}
            disabled={disabled}
            errorMessage={error?.message}
          />
        )}
        name="type"
      />

      {type === EXPENSE_TYPE.OUTCOME && (
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
      )}

      <View style={{ flexDirection: "row", gap: 16, marginTop: 24 }}>
        <CustomButton
          color="secondary"
          type="clear"
          containerStyle={{ flex: 1 }}
          disabled={submitting}
          onPress={onCancel}
        >
          {TEXT.cancel}
        </CustomButton>
        <CustomButton
          containerStyle={{ flex: 1 }}
          loading={submitting}
          onPress={submit}
        >
          {TEXT.create}
        </CustomButton>
      </View>
    </Fragment>
  );
});
