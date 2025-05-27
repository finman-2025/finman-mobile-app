import { router } from "expo-router";
import React, { useMemo } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import type { CategoryWithExpenseValueDto } from "@/types/dto";
import { useGetProfileQuery } from "@/api/auth";
import { useGetCategoriesWithExpenseValueQuery } from "@/api/categories";
import { useGetTotalExpenseValueQuery } from "@/api/expenses";
import { useGetFinancialTipsQuery } from "@/api/financial-tips";

import { RefreshableScrollView } from "@/components/common";
import { CustomSkeleton, CustomText } from "@/components/custom";
import { BalanceCard, Header } from "@/components/screens/home";
import {
  CategoryCard1,
  CategoryCardsList,
} from "@/components/screens/category";
import { TipCard1 } from "@/components/screens/tip";

import { DATE_FORMAT_DTO, PATH } from "@/constants";
import { TEXT } from "@/utils/text";
import { getCategoryColor } from "@/utils/categoryColors";
import {
  getFirstDateOfMonth,
  getLastDateOfMonth,
  toDateString,
} from "@/utils/common";

export default function HomeScreen() {
  const {
    data: profile,
    isFetching: loading1,
    isError: error1,
    refetch: refetch1,
  } = useGetProfileQuery();

  const {
    data: expenseValue,
    isFetching: loading2,
    isError: error2,
    refetch: refetch2,
  } = useGetTotalExpenseValueQuery();

  const {
    data: categories = [],
    isFetching: loading3,
    isError: error3,
    refetch: refetch3,
  } = useGetCategoriesWithExpenseValueQuery({
    startDate: toDateString(getFirstDateOfMonth(), DATE_FORMAT_DTO),
    endDate: toDateString(getLastDateOfMonth(), DATE_FORMAT_DTO),
  });

  const {
    data: financialTips = [],
    isFetching: loading4,
    isError: error4,
    refetch: refetch4,
  } = useGetFinancialTipsQuery();

  const almostLimitCategories = useMemo(
    () =>
      categories?.filter(
        (c) => c.limit && c.expenseValue.spent / c.limit > 0.5
      ) ?? [],
    [categories]
  );

  return (
    <RefreshableScrollView
      contentContainerStyle={styles.homeScreen}
      onRefresh={() =>
        Promise.all([refetch1(), refetch2(), refetch3(), refetch4()])
      }
    >
      <Header
        avatar={profile?.avatar}
        name={profile?.name}
        loading={loading1}
        error={error1}
      />

      <BalanceCard
        balance={expenseValue?.earned - expenseValue?.spent}
        loading={loading2}
        error={error2}
      />

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <CustomText type="h5">{TEXT.almostLimit}</CustomText>
          <TouchableOpacity onPress={() => router.push(PATH.CATEGORIES)}>
            <CustomText status="hint">{TEXT.showMore}</CustomText>
          </TouchableOpacity>
        </View>

        <View>
          {almostLimitCategories.length === 0 && !loading3 ? (
            <CustomText status="label" style={{ textAlign: "center" }}>
              {TEXT.empty}
            </CustomText>
          ) : (
            <CategoryCardsList<CategoryWithExpenseValueDto>
              data={almostLimitCategories}
              renderItem={({ item }) => (
                <CategoryCard1 {...item} spent={item.expenseValue.spent} />
              )}
              loading={loading3}
              error={error3}
            />
          )}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <CustomText type="h5">{TEXT.todayHint}</CustomText>
          <TouchableOpacity onPress={() => router.push(PATH.FINANCIAL_TIPS)}>
            <CustomText status="hint">{TEXT.showMore}</CustomText>
          </TouchableOpacity>
        </View>

        {financialTips.length === 0 && !loading4 ? (
          <CustomText status="label" style={{ textAlign: "center" }}>
            {TEXT.empty}
          </CustomText>
        ) : error4 ? (
          <CustomText status="label" style={{ textAlign: "center" }}>
            {TEXT.errorOccurred}
          </CustomText>
        ) : loading4 ? (
          <CustomSkeleton height={160} />
        ) : (
          <TipCard1 {...financialTips[0]} />
        )}
      </View>
    </RefreshableScrollView>
  );
}

const styles = StyleSheet.create({
  homeScreen: { paddingHorizontal: 0, paddingTop: 0 },
  section: {
    marginHorizontal: 16,
    marginVertical: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
});
