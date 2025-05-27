import { memo, useMemo } from "react";
import { View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

import type { ExpenseType } from "@/types/dto";
import { CustomSkeleton, CustomText } from "@/components/custom";

import { TEXT } from "@/utils/text";
import { getCategoryColor, useTheme } from "@/utils/theme";
import { toNumberString } from "@/utils/common";
import { sum } from "lodash";
import { EXPENSE_TYPE } from "@/constants";

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
    () => sum(data?.map(({ value }) => value) ?? []),
    [data]
  );

  const pieData = useMemo(
    () =>
      total
        ? data.map(({ id, value, type }) => ({
            value: value / total,
            color: getCategoryColor(type, id),
          }))
        : [{ value: 10, color: colors.disabled }],
    [data, total]
  );

  return (
    <View style={{ margin: "auto", height: 240 }}>
      {error ? (
        <CustomText status="hint" style={{ margin: "auto" }}>
          {TEXT.errorOccurred}
        </CustomText>
      ) : loading ? (
        <CustomSkeleton circle width={240} height={240} />
      ) : (
        <PieChart
          donut
          data={pieData}
          radius={120}
          innerRadius={90}
          centerLabelComponent={() => {
            return (
              <View style={{ alignItems: "center", marginTop: 4 }}>
                <CustomText
                  type="h3"
                  status={type === EXPENSE_TYPE.OUTCOME ? "error" : "success"}
                >
                  {type === EXPENSE_TYPE.OUTCOME ? "-" : "+"}{" "}
                  {toNumberString(total)}
                </CustomText>
                <CustomText type="p2">đ</CustomText>
              </View>
            );
          }}
        />
      )}
    </View>
  );
});
