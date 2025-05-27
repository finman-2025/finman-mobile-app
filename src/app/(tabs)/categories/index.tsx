import { RefreshableScrollView } from "@/components/common";
import {
  CategoryButtonsList,
  CreateCategoryButton,
} from "@/components/screens/category";

import { useGetCategoriesQuery } from "@/api/categories";

export default function CategoriesScreen() {
  const { data, isLoading, isError, refetch } = useGetCategoriesQuery();

  return (
    <RefreshableScrollView
      contentContainerStyle={{ gap: 24 }}
      onRefresh={refetch}
    >
      <CategoryButtonsList data={data} loading={isLoading} error={isError} />

      <CreateCategoryButton />
    </RefreshableScrollView>
  );
}
