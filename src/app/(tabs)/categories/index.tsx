import { useState } from "react";
import { FlatList } from "react-native";

import { RefreshableScrollView } from "@/components/common";
import { CategoryButton } from "@/components/screens/category";

import { TEXT } from "@/utils/text";
import { useGetCategoriesQuery } from "@/api/categories";

export default function CategoriesScreen() {
  const [show, setShow] = useState<boolean>();

  const { refetch } = useGetCategoriesQuery();

  const data = [
    { id: 1, name: "abc" },
    { id: 2, name: "def" },
    { id: 3, name: "ghi" },
  ];

  return (
    <RefreshableScrollView onRefresh={refetch}>
      <FlatList
        data={data}
        renderItem={({ item }) => <CategoryButton {...item} />}
        contentContainerStyle={{ gap: 16 }}
        columnWrapperStyle={{ gap: 16 }}
        numColumns={3}
        scrollEnabled={false}
      />
    </RefreshableScrollView>
  );
}
