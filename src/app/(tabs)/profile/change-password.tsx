import { Controller, useForm } from "react-hook-form";

import type { IChangePassword } from "@/types/frontend";
import { useChangePassword } from "@/hooks/auth";

import { RefreshableScrollView } from "@/components/common";
import { CustomButton, PasswordInput } from "@/components/custom";

import { SUMMARY, TEXT } from "@/utils/text";
import { View } from "react-native";
import { useCallback } from "react";
import { router } from "expo-router";

export default function ChangePasswordScreen() {
  const [changePassword, { isLoading }] = useChangePassword();

  const { control, reset, handleSubmit } = useForm<IChangePassword>({
    disabled: isLoading,
  });

  const submit = useCallback(
    handleSubmit(({ oldPassword, newPassword }) =>
      changePassword({ oldPassword, newPassword })
    ),
    []
  );

  return (
    <RefreshableScrollView
      contentContainerStyle={{ paddingTop: 0 }}
      onRefresh={reset}
    >
      <Controller
        control={control}
        rules={{ required: SUMMARY.pleaseEnter(TEXT.oldPassword) }}
        render={({
          field: { value, onChange, disabled },
          fieldState: { error },
        }) => (
          <PasswordInput
            placeholder={TEXT.oldPassword}
            leftIcon={{ type: "feather", name: "key" }}
            value={value}
            onChangeText={onChange}
            disabled={disabled}
            errorMessage={error?.message}
          />
        )}
        name="oldPassword"
      />

      <Controller
        control={control}
        rules={{
          required: SUMMARY.pleaseEnter(TEXT.newPassword),
          minLength: { value: 6, message: SUMMARY.minLengthPassword(6) },
        }}
        render={({
          field: { value, onChange, disabled },
          fieldState: { error },
        }) => (
          <PasswordInput
            placeholder={TEXT.newPassword}
            leftIcon={{ type: "feather", name: "key" }}
            value={value}
            onChangeText={onChange}
            disabled={disabled}
            errorMessage={error?.message}
          />
        )}
        name="newPassword"
      />

      <Controller
        control={control}
        rules={{
          required: TEXT.pleaseConfirmPassword,
          minLength: { value: 6, message: SUMMARY.minLengthPassword(6) },
          validate: (value, { newPassword }) =>
            value !== newPassword ? TEXT.passwordDoNotMatch : true,
        }}
        render={({
          field: { value, onChange, disabled },
          fieldState: { error },
        }) => (
          <PasswordInput
            placeholder={TEXT.confirmNewPassword}
            leftIcon={{ type: "feather", name: "key" }}
            value={value}
            onChangeText={onChange}
            disabled={disabled}
            errorMessage={error?.message}
          />
        )}
        name="confirmNewPassword"
      />

      <View style={{ flexDirection: "row", gap: 16, marginTop: 24 }}>
        <CustomButton
          color="secondary"
          type="clear"
          containerStyle={{ flex: 1 }}
          disabled={isLoading}
          onPress={() => router.back()}
        >
          {TEXT.cancel}
        </CustomButton>
        <CustomButton
          containerStyle={{ flex: 1 }}
          loading={isLoading}
          onPress={submit}
        >
          {TEXT.ok}
        </CustomButton>
      </View>
    </RefreshableScrollView>
  );
}
