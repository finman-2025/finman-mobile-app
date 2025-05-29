import type { PropsWithChildren } from "react";
import { openBrowserAsync } from "expo-web-browser";
import { memo } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { CustomText } from "../custom";

type IProps = PropsWithChildren<{
  href: string;
}>;

export default memo(function ExternalLink({ href, children }: IProps) {
  const handlePress = async (event) => {
    if (Platform.OS !== "web") {
      event.preventDefault();
      await openBrowserAsync(href);
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={handlePress}>
      <CustomText status="primary" numberOfLines={1}>
        {children}
      </CustomText>
    </TouchableOpacity>
  );
});
