import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import { useGetCategoryQuery } from "@/api/categories";
import {
  useGetExpensesQuery,
  useGetTotalExpenseValueQuery,
} from "@/api/expenses";

import { ProgressCard } from "@/components/screens/category";
import { AddExpenseButton, ExpensesList } from "@/components/screens/expense";

import {
  RefreshableScrollView,
  MonthCarousel,
  DayCarousel,
} from "@/components/common";

import { DATE_FORMAT_DTO } from "@/constants";
import {
  getFirstDateOfMonth,
  getLastDateOfMonth,
  toDateString,
} from "@/utils/common";

export default function CategoryScreen() {
  const [date, setDate] = useState<Date>(new Date());

  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();

  const {
    data: category,
    isFetching: loading1,
    isError: error1,
    refetch: refetch1,
  } = categoryId !== "0" ? useGetCategoryQuery(+categoryId) : {};

  const {
    data: expenseValue,
    isFetching: loading2,
    isError: error2,
    refetch: refetch2,
  } = useGetTotalExpenseValueQuery({
    startDate: toDateString(getFirstDateOfMonth(date), DATE_FORMAT_DTO),
    endDate: toDateString(getLastDateOfMonth(date), DATE_FORMAT_DTO),
    categoryId: +categoryId,
  });

  const {
    data: expenses,
    isFetching: loading3,
    isError: error3,
    refetch: refetch3,
  } = useGetExpensesQuery({
    categoryId: +categoryId,
    date: toDateString(date, DATE_FORMAT_DTO),
  });

  return (
    <RefreshableScrollView
      contentContainerStyle={{ gap: 24 }}
      onRefresh={() =>
        Promise.all([categoryId !== "0" && refetch1(), refetch2(), refetch3()])
      }
    >
      <MonthCarousel value={date} onChange={setDate} />

      <ProgressCard
        categoryId={+categoryId}
        expenseValue={expenseValue}
        type={category?.type}
        limit={category?.limit}
        loading={loading1 || loading2}
        error={error1 || error2}
      />

      <View style={{ marginTop: 10 }}>
        <DayCarousel value={date} onChange={setDate} />
      </View>

      <ExpensesList data={expenses} loading={loading3} error={error3} />

      <AddExpenseButton date={date} categoryId={+categoryId} />
    </RefreshableScrollView>
  );
}
