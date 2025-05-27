import { router } from "expo-router";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
} from "react-native";
import { Controller, useForm } from "react-hook-form";

import type { LoginReqDto } from "@/types/dto";
import { useLogin } from "@/hooks/auth";

import {
  CustomButton,
  CustomText,
  TextInput,
  PasswordInput,
} from "@/components/custom";

import { PATH } from "@/constants";
import { SUMMARY, TEXT } from "@/utils/text";

export default function LoginScreen() {
  const [login, { isLoading }] = useLogin();

  const { control, handleSubmit } = useForm<LoginReqDto>({
    disabled: isLoading,
  });

  const onSubmit = handleSubmit((value) => login(value));

  return (
    <ScrollView contentContainerStyle={styles.loginPage}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require("@/assets/images/logo.png")}
        />
        <CustomText type="h1" status="primary">
          {TEXT.appName}
        </CustomText>
      </View>

      <CustomText type="h1" style={styles.title}>
        {TEXT.login}
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
          rules={{ required: SUMMARY.pleaseEnter(TEXT.password) }}
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
        <TouchableOpacity style={{ alignSelf: "flex-end" }}>
          <CustomText type="h6" status="label">
            {TEXT.forgotPassword}
          </CustomText>
        </TouchableOpacity>
      </View>

      <View style={styles.buttons}>
        <CustomButton size="lg" onPress={onSubmit} loading={isLoading}>
          {TEXT.login}
        </CustomButton>

        <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={() => router.replace(PATH.REGISTER)}
        >
          <CustomText type="h5" status="primary">
            {TEXT.createAccount}
          </CustomText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loginPage: {
    flex: 1,
    minHeight: 600,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 60,
    justifyContent: "space-evenly",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 24,
  },
  logo: { width: 100, height: 100 },
  title: { alignSelf: "center", marginVertical: 10 },
  buttons: { marginVertical: 20, marginHorizontal: 50, gap: 30 },
});
