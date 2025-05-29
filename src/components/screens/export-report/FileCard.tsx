import { Fragment, memo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@rneui/themed";

import type { ReportFileDto } from "@/types/dto";

import { CustomText } from "@/components/custom";
import { ExternalLink } from "@/components/common";

import { DATETIME_FORMAT, EXPENSE_TYPE } from "@/constants";
import { toDateString, toNumberString } from "@/utils/common";
import { TEXT } from "@/utils/text";
import { Feather } from "@expo/vector-icons";

type IProps = ReportFileDto;

export default memo(function FileCard(props: IProps) {
  const {
    theme: { colors },
  } = useTheme();

  const { fileName, url, createdAt } = props;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.white,
          boxShadow: `0 3 5 ${colors.shadow}`,
        },
      ]}
    >
      <Feather name="file" size={30} color={colors.grey2} />
      <View style={styles.info}>
        <ExternalLink href={url}>{fileName}</ExternalLink>
        <CustomText type="p4" status="hint">
          {toDateString(createdAt, DATETIME_FORMAT)}
        </CustomText>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  info: { flex: 1, gap: 4 },
});
