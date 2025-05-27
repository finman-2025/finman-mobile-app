import { router } from "expo-router";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
} from "react-native";
import { Controller, useForm } from "react-hook-form";

import type { RegisterDto } from "@/types/dto";
import { useRegister } from "@/hooks/auth";

import {
  CustomButton,
  CustomText,
  TextInput,
  PasswordInput,
} from "@/components/custom";

import { PATH } from "@/constants";
import { SUMMARY, TEXT } from "@/utils/text";
import { emailRegex, nameRegex } from "@/utils/common";

export default function RegisterScreen() {
  const [register, { isLoading }] = useRegister();

  const { control, handleSubmit } = useForm<RegisterDto>({
    disabled: isLoading,
  });

  const onSubmit = handleSubmit((value) => register(value));

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.registerPage}>
      <CustomText type="h1" style={{ textAlign: "center" }}>
        {TEXT.register}
      </CustomText>

      <View>
        <Controller
          control={control}
          rules={{ required: SUMMARY.pleaseEnter(TEXT.username) }}
          render={({
            field: { value, onChange, disabled },
            fieldState: { error },
          }) => (
            <TextInput
              placeholder={TEXT.username}
              autoCapitalize="none"
              leftIcon={{ type: "feather", name: "user" }}
              value={value}
              onChangeText={onChange}
              disabled={disabled}
              errorMessage={error?.message}
            />
          )}
          name="username"
        />

        <Controller
          control={control}
          rules={{
            required: SUMMARY.pleaseEnter(TEXT.password),
            minLength: { value: 6, message: SUMMARY.minLengthPassword(6) },
          }}
          render={({
            field: { value, onChange, disabled },
            fieldState: { error },
          }) => (
            <PasswordInput
              placeholder={TEXT.password}
              leftIcon={{ type: "feather", name: "key" }}
              value={value}
              onChangeText={onChange}
              disabled={disabled}
              errorMessage={error?.message}
            />
          )}
          name="password"
        />

        <Controller
          control={control}
          rules={{
            required: TEXT.pleaseConfirmPassword,
            minLength: { value: 6, message: SUMMARY.minLengthPassword(6) },
            validate: (value, { password }) =>
              value !== password ? TEXT.passwordDoNotMatch : true,
          }}
          render={({
            field: { value, onChange, disabled },
            fieldState: { error },
          }) => (
            <PasswordInput
              placeholder={TEXT.confirmPassword}
              leftIcon={{ type: "feather", name: "key" }}
              value={value}
              onChangeText={onChange}
              disabled={disabled}
              errorMessage={error?.message}
            />
          )}
          name="confirmPassword"
        />

        <Controller
          control={control}
          rules={{
            required: SUMMARY.pleaseEnter(TEXT.fullname),
            pattern: {
              value: nameRegex,
              message: SUMMARY.invalid(TEXT.fullname),
            },
          }}
          render={({
            field: { value, onChange, disabled },
            fieldState: { error },
          }) => (
            <TextInput
              placeholder={TEXT.fullname}
              leftIcon={{ type: "feather", name: "user" }}
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
              value: emailRegex,
              message: SUMMARY.invalid(TEXT.email),
            },
          }}
          render={({
            field: { value, onChange, disabled },
            fieldState: { error },
          }) => (
            <TextInput
              placeholder={TEXT.email}
              leftIcon={{ type: "feather", name: "mail" }}
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
      </View>

      <View style={styles.buttons}>
        <CustomButton size="lg" onPress={onSubmit} loading={isLoading}>
          {TEXT.register}
        </CustomButton>

        <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={() => router.replace(PATH.LOGIN)}
        >
          <CustomText type="h5" status="primary">
            {TEXT.login}
          </CustomText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  registerPage: { paddingHorizontal: 16, paddingVertical: 60, gap: 10 },
  buttons: { marginTop: 30, marginHorizontal: 50, gap: 30 },
});
