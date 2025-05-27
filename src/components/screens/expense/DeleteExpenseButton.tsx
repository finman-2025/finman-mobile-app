import { Fragment, memo, useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "@rneui/themed";
import { Feather } from "@expo/vector-icons";

import type { ExpenseDto } from "@/types/dto";
import { useDeleteExpenseMutation } from "@/api/expenses";

import { ConfirmModal, CustomText } from "@/components/custom";

import { SUMMARY, TEXT } from "@/utils/text";
import { toDateString } from "@/utils/common";
import { DATE_FORMAT_DTO } from "@/constants";

type IProps = {
  expenseData: Partial<ExpenseDto>;
  onCancel?: () => void;
};

export default memo(function DeleteExpenseButton(props: IProps) {
  const { expenseData, onCancel } = props;
  const {
    theme: { colors },
  } = useTheme();

  const [showModal, setShowModal] = useState<boolean>(false);

  const [deleteExpense, { isLoading }] = useDeleteExpenseMutation();

  const handleDelete = useCallback(
    () =>
      deleteExpense({
        id: expenseData.id,
        invalidateArg: {
          categoryId: expenseData.category?.id,
          date: toDateString(expenseData.date, DATE_FORMAT_DTO),
        },
      }),
    []
  );

  return (
    <Fragment>
      <TouchableOpacity
        style={{
          paddingVertical: 12,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
        onPress={() => setShowModal(true)}
      >
        <Feather name="trash" size={24} color={colors.error} />
        <CustomText status="error">{SUMMARY.delete(TEXT.expense)}</CustomText>
      </TouchableOpacity>

      <ConfirmModal
        show={showModal}
        title={SUMMARY.delete(TEXT.expense)}
        message={SUMMARY.confirmDelete(TEXT.expense)}
        loading={isLoading}
        okBtnColor="error"
        onCancel={() => {
          setShowModal(false);
          onCancel();
        }}
        onOk={handleDelete}
      />
    </Fragment>
  );
});
