import { Fragment, memo, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, useTheme } from "@rneui/themed";

import type { ExpenseType, ExpenseValueDto } from "@/types/dto";

import { CustomSkeleton, CustomText } from "@/components/custom";
import { BarProgress } from "@/components/common";
import UpdateLimitModal from "./UpdateLimitModal";

import { TEXT } from "@/utils/text";
import { EXPENSE_TYPE } from "@/constants";
import { toNumberString } from "@/utils/common";
import { getCategoryColor } from "@/utils/categoryColors";

type IProps = {
  categoryId: number;
  expenseValue: ExpenseValueDto;
  type?: ExpenseType;
  limit?: number;
  loading?: boolean;
  error?: boolean;
};

export default memo(function ProgressCard(props: IProps) {
  const {
    theme: { colors },
  } = useTheme();
  const { categoryId, limit, expenseValue, type, loading, error } = props;

  const [showModal, setShowModal] = useState<boolean>(false);

  return error ? (
    <CustomText status="hint" style={{ textAlign: "center", lineHeight: 132 }}>
      {TEXT.errorOccurred}
    </CustomText>
  ) : loading ? (
    <CustomSkeleton height={132} />
  ) : (
    <View
      style={[
        styles.progressCard,
        {
          boxShadow: `0 5 10 ${colors.shadow}`,
          backgroundColor: colors.white,
        },
      ]}
    >
      <View style={{ flexDirection: "row" }}>
        {(!type || type === EXPENSE_TYPE.OUTCOME) && (
          <Fragment>
            <View style={styles.item}>
              <CustomText status="hint">{TEXT.spent}</CustomText>
              <CustomText type="h4">
                {toNumberString(expenseValue?.spent ?? 0)}đ
              </CustomText>
            </View>
            <Divider orientation="vertical" style={{ marginVertical: 4 }} />
          </Fragment>
        )}

        {(!type || type === EXPENSE_TYPE.INCOME) && (
          <View style={styles.item}>
            <CustomText status="hint">{TEXT.earned}</CustomText>
            <CustomText type="h4">
              {toNumberString(expenseValue?.earned ?? 0)}đ
            </CustomText>
          </View>
        )}

        {type === EXPENSE_TYPE.OUTCOME && (
          <Fragment>
            <Divider orientation="vertical" style={{ marginVertical: 4 }} />

            <TouchableOpacity
              style={styles.item}
              onPress={() => setShowModal(true)}
            >
              <CustomText status="hint">{TEXT.limit}</CustomText>
              <CustomText type="h4" color={getCategoryColor(type, categoryId)}>
                {limit ? `${toNumberString(limit)}đ` : "-"}
              </CustomText>
            </TouchableOpacity>

            <UpdateLimitModal
              categoryId={categoryId}
              current={limit}
              show={showModal}
              onCancel={() => setShowModal(false)}
            />
          </Fragment>
        )}
      </View>

      {type === EXPENSE_TYPE.OUTCOME && (
        <BarProgress
          color={getCategoryColor(type, categoryId)}
          percent={(expenseValue?.spent ?? 0) / limit}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  progressCard: {
    padding: 16,
    paddingBottom: 20,
    borderRadius: 12,
    gap: 20,
  },
  item: { flex: 1, gap: 6, alignItems: "center" },
});
