import { StyleSheet } from "react-native";

import { RefreshableScrollView } from "@/components/common";
import { ExpensesList } from "@/components/screens/expense";
import { useGetExpensesQuery } from "@/api/expenses";

export default function HistoryScreen() {
  const { data, isFetching, isError, refetch } = useGetExpensesQuery();

  return (
    <RefreshableScrollView
      contentContainerStyle={{ gap: 24 }}
      onRefresh={refetch}
    >
      <ExpensesList data={data} loading={isFetching} error={isError} />
    </RefreshableScrollView>
  );
}

const styles = StyleSheet.create({});
