import { useMemo, useState } from "react";

import type { CategoryWithExpenseValueDto, ExpenseType } from "@/types/dto";
import { useGetCategoriesWithExpenseValueQuery } from "@/api/categories";

import { MonthCarousel, RefreshableScrollView } from "@/components/common";
import { Segmented } from "@/components/custom";
import { PercentChart } from "@/components/screens/analytics";
import {
  CategoryCard2,
  CategoryCardsList,
} from "@/components/screens/category";

import { DATE_FORMAT_DTO, EXPENSE_TYPE } from "@/constants";
import { TEXT } from "@/utils/text";
import {
  getFirstDateOfMonth,
  getLastDateOfMonth,
  toDateString,
} from "@/utils/common";

export default function AnalyticsScreen() {
  const [date, setDate] = useState<Date>(new Date());
  const [expenseType, setExpenseType] = useState<ExpenseType>(
    EXPENSE_TYPE.OUTCOME
  );

  const { data, isFetching, isError, refetch } =
    useGetCategoriesWithExpenseValueQuery({
      startDate: toDateString(getFirstDateOfMonth(date), DATE_FORMAT_DTO),
      endDate: toDateString(getLastDateOfMonth(date), DATE_FORMAT_DTO),
    });

  const categories = useMemo(
    () => data?.filter(({ type }) => !type || type === expenseType),
    [data, expenseType]
  );

  const chartData = useMemo(
    () =>
      data?.map(({ id, expenseValue, type }) => ({
        id,
        value:
          expenseType == EXPENSE_TYPE.OUTCOME
            ? expenseValue.spent
            : expenseValue.earned,
        type,
      })) ?? [],
    [data, expenseType]
  );

  return (
    <RefreshableScrollView
      onRefresh={refetch}
      contentContainerStyle={{ gap: 24 }}
    >
      <MonthCarousel value={date} onChange={setDate} />

      <PercentChart
        data={chartData}
        type={expenseType}
        loading={isFetching}
        error={isError}
      />

      <Segmented
        value={expenseType}
        options={[
          { value: EXPENSE_TYPE.OUTCOME, label: TEXT.outcome },
          { value: EXPENSE_TYPE.INCOME, label: TEXT.income },
        ]}
        onChange={(value) => setExpenseType(value as EXPENSE_TYPE)}
        style={{ marginTop: 10 }}
      />

      <CategoryCardsList<CategoryWithExpenseValueDto>
        data={categories}
        renderItem={({ item }) => (
          <CategoryCard2
            id={item.id}
            name={item.name}
            type={item.type}
            value={
              expenseType == EXPENSE_TYPE.OUTCOME
                ? item.expenseValue.spent
                : item.expenseValue.earned
            }
          />
        )}
        loading={isFetching}
        error={isError}
      />
    </RefreshableScrollView>
  );
}
