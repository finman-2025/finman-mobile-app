import { useLocalSearchParams } from "expo-router";
import { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@rneui/themed";

import { useGetFinancialTipQuery } from "@/api/financial-tips";

import { RefreshableScrollView } from "@/components/common";
import { CustomSkeleton, CustomText } from "@/components/custom";

import { TEXT } from "@/utils/text";

export default function TipScreen() {
  const { tipId } = useLocalSearchParams<{ tipId: string }>();

  const {
    theme: { colors },
  } = useTheme();

  const { data, isFetching, isError, refetch } = useGetFinancialTipQuery(
    +tipId
  );

  return (
    <RefreshableScrollView onRefresh={refetch}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.white,
            boxShadow: `0 10 15 ${colors.shadow}`,
          },
        ]}
      >
        {isError ? (
          <CustomText status="label" style={{ textAlign: "center" }}>
            {TEXT.errorOccurred}
          </CustomText>
        ) : isFetching ? (
          <View style={{ gap: 16 }}>
            <CustomSkeleton
              height={30}
              width={200}
              style={{ alignSelf: "center", marginBottom: 10 }}
            />
            <CustomSkeleton height={20} />
            <CustomSkeleton height={20} width={200} />
            <CustomSkeleton height={20} width={150} />
          </View>
        ) : (
          <Fragment>
            <CustomText type="h4" style={{ textAlign: "center" }}>
              {data?.title}
            </CustomText>
            <CustomText status="hint" style={styles.author}>
              {TEXT.author}: {data?.author}
            </CustomText>
            <CustomText style={{ textAlign: "justify" }}>
              {data?.content}
            </CustomText>
          </Fragment>
        )}
      </View>
    </RefreshableScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 30,
    gap: 8,
    borderRadius: 10,
  },
  author: { fontStyle: "italic", textAlign: "center", marginBottom: 10 },
});
