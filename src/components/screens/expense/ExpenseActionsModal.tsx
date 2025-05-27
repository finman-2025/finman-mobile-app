import { memo } from "react";

import type { ExpenseDto } from "@/types/dto";

import { CustomBottomSheet } from "@/components/custom";
import DeleteExpenseButton from "./DeleteExpenseButton";

import { TEXT } from "@/utils/text";

type IProps = {
  expenseData: Partial<ExpenseDto>;
  show: boolean;
  onCancel: () => void;
};

export default memo(function ExpenseActionsModal(props: IProps) {
  const { expenseData, show, onCancel } = props;
  return (
    <CustomBottomSheet title={TEXT.actions} show={show} onCancel={onCancel}>
      <DeleteExpenseButton expenseData={expenseData} onCancel={onCancel} />
    </CustomBottomSheet>
  );
});
