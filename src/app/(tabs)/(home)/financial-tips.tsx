import { StyleSheet } from "react-native";

import { useGetFinancialTipsQuery } from "@/api/financial-tips";

import { RefreshableScrollView } from "@/components/common";
import { TipCard2, TipsList } from "@/components/screens/tip";

export default function TipsScreen() {
  const {
    data = [],
    isFetching,
    isError,
    refetch,
  } = useGetFinancialTipsQuery();

  return (
    <RefreshableScrollView onRefresh={refetch}>
      <TipsList
        data={data}
        renderItem={({ item }) => <TipCard2 {...item} />}
        loading={isFetching}
        error={isError}
      />
    </RefreshableScrollView>
  );
}

const styles = StyleSheet.create({});
