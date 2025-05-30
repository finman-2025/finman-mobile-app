import { Fragment, memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import PieChart from "react-native-pie-chart";

import type { ExpenseType } from "@/types/dto";
import { CustomSkeleton, CustomText } from "@/components/custom";

import { EXPENSE_TYPE } from "@/constants";
import { TEXT } from "@/utils/text";
import { getCategoryColor, useTheme } from "@/utils/theme";
import { toNumberString } from "@/utils/common";
import _ from "lodash";

type IProps = {
  data?: { id: number; value: number; type: ExpenseType }[];
  type: ExpenseType;
  loading?: boolean;
  error?: boolean;
};

export default memo(function PercentChart(props: IProps) {
  const { data = [], type, loading, error } = props;

  const {
    theme: { colors },
  } = useTheme();

  const total = useMemo(
    () => data?.reduce((result, { value }) => result + value, 0) ?? 0,
    [data]
  );

  const pieData = useMemo(
    () =>
      total && data
        ? data
            .filter(({ value }) => value)
            .map(({ id, value, type }) => ({
              value: (value * 100) / total,
              color: getCategoryColor(type, id),
            }))
        : [],
    [data, total]
  );

  return (
    <View style={styles.wrapper}>
      {error ? (
        <CustomText status="hint">{TEXT.errorOccurred}</CustomText>
      ) : loading ? (
        <CustomSkeleton circle width={240} height={240} />
      ) : (
        <Fragment>
          <PieChart
            widthAndHeight={240}
            series={
              pieData.length > 0
                ? pieData
                : [{ value: 10, color: colors.disabled }]
            }
            cover={0.75}
          />
          <View style={styles.center}>
            <CustomText
              type="h3"
              status={type === EXPENSE_TYPE.OUTCOME ? "error" : "success"}
            >
              {type === EXPENSE_TYPE.OUTCOME ? "-" : "+"}{" "}
              {toNumberString(total)}
            </CustomText>
            <CustomText type="p2">đ</CustomText>
          </View>
        </Fragment>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    height: 240,
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  center: { position: "absolute", alignItems: "center", paddingTop: 4 },
});
