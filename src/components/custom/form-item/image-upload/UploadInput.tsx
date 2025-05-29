import type { StyleProp, ViewStyle } from "react-native";
import { Fragment, memo } from "react";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";

import { CustomText } from "@/components/custom";

import { TEXT } from "@/utils/text";

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
      style={[
        styles.inputContainer,
        {
          opacity: disabled ? 0.8 : 1,
          backgroundColor: colors.disabled,
          borderColor: colors.grey5,
          aspectRatio: 1,
        },
        style,
      ]}
    >
      <TouchableOpacity
        style={styles.inputButton}
        disabled={disabled}
        onPress={onPress}
      >
        {image ? (
          <Image src={image} resizeMode="cover" style={styles.image} />
        ) : (
          <Fragment>
            <AntDesign name="plus" size={30} color={colors.grey4} />
            <CustomText status="hint">{TEXT.pressToUpload}</CustomText>
          </Fragment>
        )}
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    borderWidth: 1,
    width: 140,
    borderRadius: 16,
    alignSelf: "center",
    overflow: "hidden",
    borderStyle: "dashed",
  },
  image: { position: "absolute", inset: 0 },
  inputButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
});
