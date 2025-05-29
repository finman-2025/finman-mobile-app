import type { StyleProp, ViewStyle } from "react-native";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { memo } from "react";
import { useTheme } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";

type IProps = {
  image: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export default memo(function UploadInput(props: IProps) {
  const { style, disabled, image, onPress } = props;

  const {
    theme: { colors },
  } = useTheme();

  return (
    <View
      style={[styles.avatarContainer, { opacity: disabled ? 0.5 : 1 }, style]}
    >
      <TouchableOpacity disabled={disabled} onPress={onPress}>
        <Image
          style={[styles.avatar, { backgroundColor: `${colors.primary}22` }]}
          resizeMode="cover"
          source={require("@/assets/images/avatar.png")}
          src={image || undefined}
        />
      </TouchableOpacity>
      <View style={[styles.wrapIcon, { backgroundColor: colors.primary }]}>
        <FontAwesome name="camera" size={12} color="#eee" />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  avatarContainer: { width: 100, height: 100 },
  avatar: { height: 100, width: 100, borderRadius: 100 },
  wrapIcon: {
    padding: 6,
    borderRadius: 20,
    position: "absolute",
    bottom: 2,
    right: 4,
  },
});
