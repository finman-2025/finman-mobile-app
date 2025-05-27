import { router } from "expo-router";
import { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@rneui/themed";
import { Octicons } from "@expo/vector-icons";

import type { ExpenseType } from "@/types/dto";

import { CustomText } from "@/components/custom";

import { EXPENSE_TYPE, PATH } from "@/constants";
import { getCategoryColor } from "@/utils/categoryColors";

type IProps = {
  id: number;
  name: string;
  value: number;
  type?: ExpenseType;
};

export default memo(function CategoryCard2(props: IProps) {
  const {
    theme: { colors },
  } = useTheme();

  const { id, name, value, type = EXPENSE_TYPE.OUTCOME } = props;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { boxShadow: `0 3 5 ${colors.shadow}`, backgroundColor: colors.white },
      ]}
      onPress={() => router.push(PATH.CATEGORY(id, name))}
    >
      <Octicons
        name="dot-fill"
        size={28}
        color={getCategoryColor(type, id)}
        style={{ marginTop: 2 }}
      />
      <CustomText type="h6">{name}</CustomText>
      <CustomText status="label" style={{ marginLeft: "auto" }}>
        {value} đ
      </CustomText>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});
