import { memo } from "react";
import { StyleSheet, View, Image } from "react-native";
import { useTheme } from "@rneui/themed";

import { CustomText } from "@/components/custom";

import { TEXT } from "@/utils/text";

export default memo(function Header() {
  const {
    theme: { colors },
  } = useTheme();

  return (
    <View style={styles.header}>
      <Image
        source={require("@/assets/images/background.png")}
        style={styles.background}
      />
      <View style={styles.userInfo}>
        <Image
          source={require("@/assets/images/avatar.png")}
          style={styles.avatar}
        />
        <View style={{ gap: 2 }}>
          <CustomText type="p4" color={colors.grey5}>
            {TEXT.hello}
          </CustomText>
          <CustomText type="h5" status="white">
            Nguyễn Văn A
          </CustomText>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  background: { width: "100%", height: 240 },
  userInfo: {
    position: "absolute",
    top: 50,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: { width: 50, height: 50, borderRadius: 50 },
  balanceCard: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 16,
  },
});
