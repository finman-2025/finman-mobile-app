import { router } from "expo-router";
import { ScrollView } from "react-native";

import { CustomButton } from "@/components/custom";

import { PATH, TOKEN_NAME } from "@/constants";
import { TEXT } from "@/utils/text";
import { setItem } from "@/utils/store-actions";

export default function LoginScreen() {
  const handleLogin = () => {
    setItem(TOKEN_NAME.ACCESS_TOKEN, "abcxyz");
    router.replace(PATH.HOME);
  };

  return (
    <ScrollView contentContainerStyle={{ paddingTop: 100 }}>
      <CustomButton onPress={handleLogin}>{TEXT.login}</CustomButton>
    </ScrollView>
  );
}
