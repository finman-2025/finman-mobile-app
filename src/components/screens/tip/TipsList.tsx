import { Fragment, memo } from "react";
import type { FlatListProps } from "react-native";
import { View, FlatList } from "react-native";

import type { FinancialTipDto } from "@/types/dto";

import { CustomSkeleton, CustomText } from "@/components/custom";

import { TEXT } from "@/utils/text";

type IProps = Partial<FlatListProps<FinancialTipDto>> & {
  loading?: boolean;
  error?: boolean;
};

export default memo(function ExpensesList(props: IProps) {
  const { data = [], renderItem, loading, error, ...rest } = props;

  return (
    <Fragment>
      {error ? (
        <CustomText status="hint" style={{ textAlign: "center" }}>
          {TEXT.errorOccurred}
        </CustomText>
      ) : loading ? (
        <View style={{ gap: 16 }}>
          <CustomSkeleton height={140} />
          <CustomSkeleton height={140} />
        </View>
      ) : (
        <FlatList
          {...rest}
          data={data}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 16 }}
          scrollEnabled={false}
        />
      )}
    </Fragment>
  );
});
