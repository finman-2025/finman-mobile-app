import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
} from "react-native";
import { Controller, useForm } from "react-hook-form";

import type { LoginReqDto } from "@/types/dto";

import { CustomButton, CustomInput, CustomText } from "@/components/custom";

import { SUMMARY, TEXT } from "@/utils/text";
import { useLogin } from "@/hooks/auth";

export default function LoginScreen() {
  const [login, { isLoading }] = useLogin();

  const { control, handleSubmit } = useForm<LoginReqDto>({
    disabled: isLoading,
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = handleSubmit((value: LoginReqDto) => login(value));

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
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              placeholder={TEXT.username}
              autoCapitalize="none"
              leftIcon={{ type: "feather", name: "user" }}
              value={value}
              onChangeText={onChange}
              errorMessage={error?.message}
            />
          )}
          name="username"
        />

        <Controller
          control={control}
          rules={{ required: SUMMARY.pleaseEnter(TEXT.password) }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              type="password"
              placeholder={TEXT.password}
              autoCapitalize="none"
              leftIcon={{ type: "feather", name: "key" }}
              value={value}
              onChangeText={onChange}
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

        <TouchableOpacity style={{ alignSelf: "center" }}>
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
