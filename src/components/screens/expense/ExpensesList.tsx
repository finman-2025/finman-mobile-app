import { Fragment, memo } from "react";
import type { FlatListProps } from "react-native";
import { View, FlatList } from "react-native";

import type { ExpenseDto } from "@/types/dto";

import { CustomSkeleton, CustomText } from "@/components/custom";
import ExpenseCard from "./ExpenseCard";

import { TEXT } from "@/utils/text";

type IProps = Partial<FlatListProps<ExpenseDto>> & {
  loading?: boolean;
  error?: boolean;
};

export default memo(function ExpensesList(props: IProps) {
  const { data = [], loading, error, ...rest } = props;

  return (
    <Fragment>
      {error ? (
        <CustomText status="hint" style={{ textAlign: "center" }}>
          {TEXT.errorOccurred}
        </CustomText>
      ) : loading ? (
        <View style={{ gap: 16 }}>
          <CustomSkeleton height={87} />
          <CustomSkeleton height={87} />
        </View>
      ) : data.length === 0 ? (
        <CustomText
          status="hint"
          style={{ textAlign: "center", marginBottom: 10 }}
        >
          {TEXT.noExpenses}
        </CustomText>
      ) : (
        <FlatList
          {...rest}
          data={data}
          renderItem={({ item }) => <ExpenseCard data={item} />}
          contentContainerStyle={{ gap: 16 }}
          scrollEnabled={false}
        />
      )}
    </Fragment>
  );
});
