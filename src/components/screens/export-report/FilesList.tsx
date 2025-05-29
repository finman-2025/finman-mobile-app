import { Fragment, memo } from "react";
import type { FlatListProps } from "react-native";
import { View, FlatList } from "react-native";

import type { ReportFileDto } from "@/types/dto";

import { CustomSkeleton, CustomText } from "@/components/custom";
import FileCard from "./FileCard";

import { TEXT } from "@/utils/text";

type IProps = Partial<FlatListProps<ReportFileDto>> & {
  loading?: boolean;
  error?: boolean;
};

export default memo(function FilesList(props: IProps) {
  const { data = [], loading, error, ...rest } = props;

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
      ) : data.length === 0 ? (
        <CustomText
          status="hint"
          style={{ textAlign: "center", marginBottom: 10 }}
        >
          {TEXT.empty}
        </CustomText>
      ) : (
        <FlatList
          {...rest}
          data={data}
          renderItem={({ item }) => <FileCard {...item} />}
          contentContainerStyle={{ gap: 16 }}
          style={{ overflow: "visible" }}
          scrollEnabled={false}
        />
      )}
    </Fragment>
  );
});
