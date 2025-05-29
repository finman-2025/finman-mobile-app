import type { StyleProp, ViewStyle } from "react-native";
import { memo, useCallback } from "react";
import { View } from "react-native";
import { launchImageLibraryAsync } from "expo-image-picker";

import type { IImageFile } from "@/types/frontend";
import { useAppDispatch } from "@/hooks/common";
import { error } from "@/store/reducers";

import UploadInput from "./UploadInput";
import { CustomText } from "@/components/custom";

import { ALLOWED_IMAGE_SIZE } from "@/constants";
import { TEXT } from "@/utils/text";
import UploadAvatar from "./UploadAvatar";

type IProps = {
  type?: "input" | "avatar";
  label?: string;
  value?: IImageFile;
  onUpload: (value: IImageFile) => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export default memo(function ImageUpload(props: IProps) {
  const { type = "input", label, value, onUpload, style, disabled } = props;

  const dispatch = useAppDispatch();

  const pickImage = useCallback(async () => {
    const result = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      if (asset.fileSize < ALLOWED_IMAGE_SIZE) {
        onUpload({
          uri: asset.uri,
          name: asset.fileName,
          type: `${asset.type}/${asset.fileName.split(".")[1]}`,
        });
      } else dispatch(error({ message: TEXT.imageTooLarge }));
    }
  }, []);

  return (
    <View style={[{ gap: 10 }, style]}>
      {label && (
        <CustomText type="h6" status="label">
          {label}
        </CustomText>
      )}
      {type === "input" ? (
        <UploadInput
          image={value?.uri}
          onPress={pickImage}
          disabled={disabled}
        />
      ) : (
        <UploadAvatar
          image={value?.uri}
          onPress={pickImage}
          disabled={disabled}
        />
      )}
    </View>
  );
});
