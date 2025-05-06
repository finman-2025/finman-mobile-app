import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import { useTheme } from "@rneui/themed";

import { CustomText } from "@/components/custom";
import { BalanceCard, Header } from "@/components/screens/home";
import { CategoryCard } from "@/components/screens/category";
import { HintCard } from "@/components/screens/hint";

import { TEXT } from "@/utils/text";
import { RefreshableScrollView } from "@/components/common";

export default function HomeScreen() {
  const {
    theme: { colors },
  } = useTheme();

  return (
    <RefreshableScrollView
      contentContainerStyle={{ paddingHorizontal: 0, paddingTop: 0 }}
    >
      <Header />

      <BalanceCard />

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <CustomText type="h5">{TEXT.almostLimit}</CustomText>
          <TouchableOpacity>
            <CustomText status="hint">{TEXT.showMore}</CustomText>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 16 }}>
          <CategoryCard title="Mua sắm" progress={1200000} limit={1500000} />
          <CategoryCard
            color={colors.success}
            title="Ăn uống"
            progress={2000000}
            limit={3500000}
          />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <CustomText type="h5">{TEXT.todayHint}</CustomText>
          <TouchableOpacity>
            <CustomText status="hint">{TEXT.showMore}</CustomText>
          </TouchableOpacity>
        </View>

        <HintCard
          hintId={1}
          title="Bí kíp tiết kiệm"
          content="Lorem, ipsum dolor sit amet consec tetur adipi sicing elit."
        />
      </View>
    </RefreshableScrollView>
  );
}

const styles = StyleSheet.create({
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
