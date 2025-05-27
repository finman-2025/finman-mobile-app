import type { ReactNode } from "react";
import { Fragment, memo } from "react";
import type { FlatListProps } from "react-native";
import { View, FlatList } from "react-native";

import { CustomSkeleton, CustomText } from "@/components/custom";
import { TEXT } from "@/utils/text";

type IProps<ItemType> = Partial<FlatListProps<ItemType>> & {
  loading?: boolean;
  error?: boolean;
};

export default memo(function CategoryCardsList<T>(props: IProps<T>) {
  const { data = [], renderItem, loading, error, ...rest } = props;

  return (
    <Fragment>
      {error ? (
        <CustomText status="hint" style={{ textAlign: "center" }}>
          {TEXT.errorOccurred}
        </CustomText>
      ) : loading ? (
        <View style={{ gap: 16 }}>
          <CustomSkeleton height={70} />
          <CustomSkeleton height={70} />
        </View>
      ) : (
        <FlatList
          {...rest}
          data={data}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 16 }}
          style={{ overflow: "visible" }}
          scrollEnabled={false}
        />
      )}
    </Fragment>
  );
}) as <T>(props: IProps<T>) => ReactNode;
