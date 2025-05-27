import { Fragment, memo, useEffect, useMemo } from "react";
import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";

import type { ICreateExpense, IOption } from "@/types/frontend";
import { useGetCategoriesQuery } from "@/api/categories";

import {
  CustomButton,
  TextInput,
  NumberInput,
  Select,
  RadioGroup,
} from "@/components/custom";

import { EXPENSE_TYPE } from "@/constants";
import { SUMMARY, TEXT } from "@/utils/text";
import _ from "lodash";

type IProps = {
  initial?: Partial<ICreateExpense>;
  submitting?: boolean;
  onCancel?: () => void;
  onSubmit: (value: ICreateExpense) => void;
};

export default memo(function AddExpenseForm(props: IProps) {
  const { initial, submitting, onCancel, onSubmit } = props;

  const { data = [], isLoading, isError } = useGetCategoriesQuery();

  const categoryOptions = useMemo<IOption[]>(
    () => data.map(({ id, name }) => ({ value: id, label: name })),
    [data]
  );

  const { control, watch, setValue, handleSubmit } = useForm<ICreateExpense>({
    disabled: submitting || isLoading,
    defaultValues: { type: EXPENSE_TYPE.OUTCOME, ...initial },
  });

  const categoryId = watch("categoryId");

  useEffect(() => {
    if (categoryId) {
      const category = _.find(data, { id: categoryId });
      setValue("type", category?.type);
    }
  }, [categoryId]);

  return (
    <Fragment>
      <Controller
        control={control}
        rules={{ required: SUMMARY.pleaseSelect(TEXT.category) }}
        render={({
          field: { value, onChange, disabled },
          fieldState: { error },
        }) => (
          <Select
            required
            label={TEXT.category}
            placeholder={SUMMARY.select(TEXT.category)}
            options={categoryOptions}
            value={value}
            onChange={onChange}
            disabled={disabled || isError}
            errorMessage={error?.message}
          />
        )}
        name="categoryId"
      />

      <Controller
        control={control}
        render={({ field: { value, onChange, disabled } }) => (
          <TextInput
            label={TEXT.description}
            placeholder={SUMMARY.enter(TEXT.description)}
            value={value}
            onChangeText={onChange}
            disabled={disabled}
          />
        )}
        name="description"
      />

      <Controller
        control={control}
        rules={{ required: SUMMARY.pleaseEnter(TEXT.amount) }}
        render={({
          field: { value, onChange, disabled },
          fieldState: { error },
        }) => (
          <NumberInput
            required
            label={`${TEXT.amount} (đ)`}
            placeholder={SUMMARY.enter(TEXT.amount)}
            value={value}
            onChangeText={onChange}
            disabled={disabled}
            errorMessage={error?.message}
          />
        )}
        name="value"
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
            label={TEXT.expenseType}
            options={[
              { value: EXPENSE_TYPE.OUTCOME, label: TEXT.outcome },
              { value: EXPENSE_TYPE.INCOME, label: TEXT.income },
            ]}
            value={value}
            onChange={onChange}
            disabled={disabled || Boolean(categoryId)}
            errorMessage={error?.message}
          />
        )}
        name="type"
      />

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
          onPress={handleSubmit(onSubmit)}
        >
          {TEXT.add}
        </CustomButton>
      </View>
    </Fragment>
  );
});
