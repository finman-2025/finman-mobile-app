import { Fragment, memo, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "@rneui/themed";

import type { ExpenseDto } from "@/types/dto";

import { CustomText } from "@/components/custom";

import { DATETIME_FORMAT, EXPENSE_TYPE } from "@/constants";
import { toDateString, toNumberString } from "@/utils/common";
import ExpenseActionsModal from "./ExpenseActionsModal";
import { TEXT } from "@/utils/text";

type PropsType = {
  data: Partial<ExpenseDto>;
  color?: string;
};

export default memo(function ExpenseCard(props: PropsType) {
  const {
    theme: { colors },
  } = useTheme();

  const { data, color = colors.primary } = props;

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <Fragment>
      <TouchableOpacity
        style={[styles.card, { boxShadow: `0 5 5 ${colors.shadow}` }]}
        activeOpacity={0.5}
        onLongPress={() => setShowModal(true)}
      >
        <View style={styles.row}>
          <CustomText type="h6">
            {data.category?.name ??
              (data.type === EXPENSE_TYPE.INCOME ? TEXT.income : TEXT.outcome)}
          </CustomText>
          <CustomText
            type="h6"
            status={data.type === EXPENSE_TYPE.INCOME ? "success" : "error"}
          >
            {data.type === EXPENSE_TYPE.INCOME ? "+" : "-"}{" "}
            {toNumberString(data.value)}đ
          </CustomText>
        </View>
        <View style={styles.row}>
          <CustomText type="p4" status="disabled">
            {data.description}
          </CustomText>
          <CustomText type="p4" status="hint">
            {toDateString(data.date, DATETIME_FORMAT)}
          </CustomText>
        </View>
      </TouchableOpacity>

      <ExpenseActionsModal
        expenseData={data}
        show={showModal}
        onCancel={() => setShowModal(false)}
      />
    </Fragment>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
