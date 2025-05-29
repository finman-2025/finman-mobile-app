import { router } from "expo-router";
import { Fragment, memo } from "react";
import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";

import type { UserDto } from "@/types/dto";
import type { IUpdateUser } from "@/types/frontend";

import { RefreshableScrollView } from "@/components/common";
import {
  CustomButton,
  DatePicker,
  NumberInput,
  RadioGroup,
  TextInput,
} from "@/components/custom";

import { GENDER, NAME_REGEX, EMAIL_REGEX, PHONE_REGEX } from "@/constants";
import { SUMMARY, TEXT } from "@/utils/text";

type IProps = {
  initial?: Partial<UserDto>;
  loading?: boolean;
  submitting?: boolean;
  onSubmit: (value: IUpdateUser) => void;
};

export default memo(function UpdateProfileForm(props: IProps) {
  const { initial, loading, submitting, onSubmit } = props;

  const { control, handleSubmit } = useForm<IUpdateUser>({
    disabled: loading || submitting,
    defaultValues: {
      ...initial,
      dateOfBirth: initial.dateOfBirth
        ? new Date(initial.dateOfBirth)
        : undefined,
    },
  });

  return (
    <Fragment>
      <View>
        <Controller
          control={control}
          rules={{
            required: SUMMARY.pleaseEnter(TEXT.fullname),
            pattern: {
              value: NAME_REGEX,
              message: SUMMARY.invalid(TEXT.fullname),
            },
          }}
          render={({
            field: { value, onChange, disabled },
            fieldState: { error },
          }) => (
            <TextInput
              required
              label={TEXT.fullname}
              placeholder={SUMMARY.enter(TEXT.fullname)}
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
          rules={{
            required: SUMMARY.pleaseEnter(TEXT.email),
            pattern: {
              value: EMAIL_REGEX,
              message: SUMMARY.invalid(TEXT.email),
            },
          }}
          render={({
            field: { value, onChange, disabled },
            fieldState: { error },
          }) => (
            <TextInput
              required
              label={TEXT.email}
              placeholder={SUMMARY.enter(TEXT.email)}
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              disabled={disabled}
              errorMessage={error?.message}
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          render={({ field: { value, onChange, disabled } }) => (
            <RadioGroup
              style={{ marginBottom: 20 }}
              label={TEXT.sex}
              options={[
                { value: GENDER.MALE, label: TEXT.male },
                { value: GENDER.FEMALE, label: TEXT.female },
                { value: GENDER.OTHER, label: TEXT.other },
              ]}
              value={value}
              onChange={onChange}
              disabled={disabled}
            />
          )}
          name="sex"
        />

        <Controller
          control={control}
          render={({ field: { value, onChange, disabled } }) => (
            <DatePicker
              label={TEXT.birthday}
              value={value}
              onChange={onChange}
              disabled={disabled}
            />
          )}
          name="dateOfBirth"
        />

        <Controller
          control={control}
          rules={{
            pattern: {
              value: PHONE_REGEX,
              message: SUMMARY.invalid(TEXT.phoneNumber),
            },
          }}
          render={({
            field: { value, onChange, disabled },
            fieldState: { error },
          }) => (
            <NumberInput
              label={TEXT.phoneNumber}
              placeholder={SUMMARY.enter(TEXT.phoneNumber)}
              value={value}
              onChangeText={onChange}
              disabled={disabled}
              errorMessage={error?.message}
            />
          )}
          name="phoneNumber"
        />

        <Controller
          control={control}
          render={({ field: { value, onChange, disabled } }) => (
            <TextInput
              label={TEXT.address}
              placeholder={SUMMARY.enter(TEXT.address)}
              value={value}
              onChangeText={onChange}
              disabled={disabled}
            />
          )}
          name="address"
        />
      </View>

      <View style={{ flexDirection: "row", gap: 16, marginTop: 24 }}>
        <CustomButton
          color="secondary"
          type="clear"
          containerStyle={{ flex: 1 }}
          disabled={loading || submitting}
          onPress={() => router.back()}
        >
          {TEXT.cancel}
        </CustomButton>
        <CustomButton
          containerStyle={{ flex: 1 }}
          disabled={loading}
          loading={submitting}
          onPress={handleSubmit(onSubmit)}
        >
          {TEXT.update}
        </CustomButton>
      </View>
    </Fragment>
  );
});
