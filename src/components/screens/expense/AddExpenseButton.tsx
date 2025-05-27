import { Fragment, memo, useCallback, useState } from "react";

import type { ICreateExpense } from "@/types/frontend";
import { useCreateExpense } from "@/hooks/expenses";

import { CustomBottomSheet, CustomButton } from "@/components/custom";
import AddExpenseForm from "./AddExpenseForm";

import { SUMMARY, TEXT } from "@/utils/text";
import { toDateString } from "@/utils/common";
import { DATE_FORMAT_DTO } from "@/constants";

type IProps = {
  categoryId?: number;
  date?: Date;
};

export default memo(function AddExpenseButton({ categoryId, date }: IProps) {
  const [show, setShow] = useState<boolean>(false);

  const [addExpense, { isLoading }] = useCreateExpense();

  const handleAdd = useCallback(
    (data: ICreateExpense) => {
      if (date) date.setHours(23, 59);
      else date = new Date();
      addExpense(
        {
          ...data,
          categoryId: categoryId || undefined,
          value: +data.value,
          date,
          invalidateArg: {
            categoryId,
            date: date ? toDateString(date, DATE_FORMAT_DTO) : undefined,
          },
        },
        () => setShow(false)
      );
    },
    [date]
  );

  return (
    <Fragment>
      <CustomButton
        type="clear"
        containerStyle={{ alignSelf: "center" }}
        onPress={() => setShow(true)}
      >
        {SUMMARY.add(TEXT.expense)}
      </CustomButton>

      <CustomBottomSheet
        title={SUMMARY.add(TEXT.expense)}
        show={show}
        onCancel={() => isLoading || setShow(false)}
      >
        <AddExpenseForm
          initial={{ categoryId }}
          submitting={isLoading}
          onCancel={() => setShow(false)}
          onSubmit={handleAdd}
        />
      </CustomBottomSheet>
    </Fragment>
  );
});
