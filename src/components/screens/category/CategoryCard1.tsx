import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@rneui/themed";

import type { ExpenseType } from "@/types/dto";

import { BarProgress } from "@/components/common";
import { CustomText } from "@/components/custom";

import { EXPENSE_TYPE } from "@/constants";
import { getCategoryColor } from "@/utils/categoryColors";

type IProps = {
  id: number;
  name: string;
  spent: number;
  type?: ExpenseType;
  limit?: number;
};

export default memo(function CategoryCard(props: IProps) {
  const {
    theme: { colors },
  } = useTheme();

  const { id, name, spent, type = EXPENSE_TYPE.OUTCOME, limit } = props;

  return (
    <View
      style={[
        styles.card,
        { boxShadow: `0 5 5 ${colors.shadow}`, backgroundColor: colors.white },
      ]}
    >
      <View style={styles.top}>
        <CustomText type="h6">{name}</CustomText>
        <View style={{ flexDirection: "row" }}>
          <CustomText type="p4" status="hint">
            {spent} đ /
          </CustomText>
          <CustomText type="p4" color={getCategoryColor(type, id)}>
            {" "}
            {limit} đ
          </CustomText>
        </View>
      </View>
      <BarProgress color={getCategoryColor(type, id)} percent={spent / limit} />
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
