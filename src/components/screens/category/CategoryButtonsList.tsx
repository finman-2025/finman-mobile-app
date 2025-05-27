import { Fragment, memo } from "react";
import type { FlatListProps } from "react-native";
import { View, FlatList, Dimensions } from "react-native";
import { useTheme } from "@rneui/themed";

import type { CategoryDto } from "@/types/dto";

import { CustomSkeleton, CustomText } from "@/components/custom";
import CategoryButton from "./CategoryButton";

import { TEXT } from "@/utils/text";
import { getCategoryColor } from "@/utils/categoryColors";

type ItemType = Pick<CategoryDto, "id" | "name" | "image">;
type IProps = Partial<FlatListProps<ItemType>> & {
  loading?: boolean;
  error?: boolean;
};

export default memo(function CategoriesList(props: IProps) {
  const { data = [], loading, error, ...rest } = props;

  const {
    theme: { colors },
  } = useTheme();

  const buttonWidth = Dimensions.get("window").width / 3 - 24;

  return (
    <Fragment>
      {error ? (
        <CustomText status="hint" style={{ textAlign: "center" }}>
          {TEXT.errorOccurred}
        </CustomText>
      ) : loading ? (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <CustomSkeleton width={buttonWidth} height={buttonWidth} />
          <CustomSkeleton width={buttonWidth} height={buttonWidth} />
          <CustomSkeleton width={buttonWidth} height={buttonWidth} />
        </View>
      ) : (
        <FlatList
          {...rest}
          data={data}
          renderItem={({ item }) => (
            <View style={{ width: buttonWidth }}>
              <CategoryButton {...item} />
            </View>
          )}
          contentContainerStyle={{ gap: 16 }}
          columnWrapperStyle={{ gap: 16 }}
          style={{ overflow: "visible" }}
          numColumns={3}
          scrollEnabled={false}
        />
      )}
    </Fragment>
  );
});
