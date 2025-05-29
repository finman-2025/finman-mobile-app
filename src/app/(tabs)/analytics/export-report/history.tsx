import { useGetExportedReportsQuery } from "@/api/reports";

import { RefreshableScrollView } from "@/components/common";
import { FilesList } from "@/components/screens/export-report";

export default function ExportHistoryScreen() {
  const { data, isFetching, isError, refetch } = useGetExportedReportsQuery();

  return (
    <RefreshableScrollView onRefresh={refetch}>
      <FilesList data={data} loading={isFetching} error={isError} />
    </RefreshableScrollView>
  );
}
