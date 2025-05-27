import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { View, ScrollView } from "react-native";

import type { ICreateExpense } from "@/types/frontend";
import { useCreateExpense } from "@/hooks/expenses";
import { useAppDispatch } from "@/hooks/common";
import { success } from "@/store/reducers";

import { CustomText } from "@/components/custom";
import { AddExpenseForm } from "@/components/screens/expense";

import { SUMMARY, TEXT } from "@/utils/text";
import { DATE_FORMAT_DTO, DATETIME_FORMAT } from "@/constants";
import { toDateString } from "@/utils/common";

export default function AddExpenseScreen() {
  const { value, date, description } = useLocalSearchParams<{
    value?: string;
    date?: string;
    description?: string;
  }>();

  const dispatch = useAppDispatch();

  const [addExpense, { isLoading }] = useCreateExpense();

  const handleAdd = useCallback((data: ICreateExpense) => {
    addExpense(
      {
        ...data,
        date: data.date ?? new Date(),
        value: +data.value,
        invalidateArg: {
          categoryId: data.categoryId,
          date: toDateString(data.date, DATE_FORMAT_DTO),
        },
      },
      () => dispatch(success({ message: SUMMARY.successfully(TEXT.add) }))
    );
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {date && (
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 20 }}>
          <CustomText type="h6" status="label">
            {TEXT.time}:
          </CustomText>
          <CustomText>
            {toDateString(new Date(date), DATETIME_FORMAT)}
          </CustomText>
        </View>
      )}
      <AddExpenseForm
        initial={{
          value,
          date: date ? new Date(date) : undefined,
          description,
        }}
        submitting={isLoading}
        onSubmit={handleAdd}
      />
    </ScrollView>
  );
}
