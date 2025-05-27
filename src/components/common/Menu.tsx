import type { ReactNode } from "react";
import type { FlatListProps } from "react-native";
import { memo } from "react";
import { FlatList, TouchableOpacity } from "react-native";

import { CustomText } from "@/components/custom";
import { router } from "expo-router";

type ItemType = { icon: ReactNode; text: string; url?: any };
type IProps = Partial<FlatListProps<ItemType>>;

export default memo(function Menu(props: IProps) {
  const { data, ...rest } = props;

  return (
    <FlatList
      {...rest}
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
          onPress={() => item.url && router.push(item.url)}
        >
          <CustomText status="label">{item.icon}</CustomText>
          <CustomText>{item.text}</CustomText>
        </TouchableOpacity>
      )}
      scrollEnabled={false}
    />
  );
});
