import { memo } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@rneui/themed";

import { CustomText } from "@/components/custom";
import { router } from "expo-router";
import { PATH } from "@/constants";

type IProps = {
  id: number;
  name: string;
  image?: string;
};

export default memo(function CategoryButton(props: IProps) {
  const { id, name, image } = props;
  const {
    theme: { colors },
  } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { boxShadow: `0 5 5 ${colors.shadow}` }]}
      onPress={() => router.push(PATH.CATEGORY(id))}
    >
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.image}
      />
      <CustomText style={{ margin: "auto" }}>{name}</CustomText>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 20,
    gap: 4,
    alignItems: "center",
  },
  image: { height: 50, width: 50 },
});
