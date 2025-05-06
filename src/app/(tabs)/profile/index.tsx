import { ScrollView } from "react-native";

import { useLogout } from "@/hooks/auth";

import { CustomButton } from "@/components/custom";

import { TEXT } from "@/utils/text";

export default function ProfileScreen() {
  const [logout, { isLoading }] = useLogout();

  return (
    <ScrollView contentContainerStyle={{ paddingTop: 100 }}>
      <CustomButton color="error" loading={isLoading} onPress={() => logout()}>
        {TEXT.logout}
      </CustomButton>
    </ScrollView>
  );
}
