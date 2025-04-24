import type { ReactNode } from "react";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "@rneui/themed";
import { Feather, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";

import { CustomText } from "@/components/custom";

import { PATH } from "@/constants";
import { TEXT } from "@/utils/text";

export default function BalanceCard() {
  const {
    theme: { colors },
  } = useTheme();

  const [showBalance, setShowBalance] = useState<boolean>();

  return (
    <View
      style={[
        styles.balanceCard,
        {
          boxShadow: `0 5 10 ${colors.shadow}`,
          backgroundColor: colors.white,
        },
      ]}
    >
      <View>
        <View>
          <CustomText status="label">{TEXT.balance}</CustomText>
          <CustomText type="h2" style={{ marginVertical: 6 }}>
            {showBalance ? "8.000.500" : "*********"} đ
          </CustomText>
        </View>
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowBalance((prev) => !prev)}
        >
          <Feather
            name={showBalance ? "eye" : "eye-off"}
            size={22}
            color={colors.grey2}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        <ActionButton
          icon={<MaterialCommunityIcons name="line-scan" size={24} />}
          label={TEXT.scanBill}
          onPress={() => {}}
        />
        <ActionButton
          icon={<Feather name="plus" size={24} />}
          label={TEXT.addExpense}
          onPress={() => {}}
        />
        <ActionButton
          icon={<Octicons name="arrow-switch" size={22} />}
          label={TEXT.history}
          onPress={() => router.push(PATH.HISTORY)}
        />
        <ActionButton
          icon={<MaterialCommunityIcons name="bank-outline" size={24} />}
          label={TEXT.link}
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

type ActionButtonProps = {
  icon: ReactNode;
  label: string;
  onPress?: () => void;
};

const ActionButton = (props: ActionButtonProps) => {
  const { icon, label, onPress } = props;
  const {
    theme: { colors },
  } = useTheme();

  return (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <View
        style={[styles.wrapIcon, { backgroundColor: colors.backgroundPrimary }]}
      >
        <CustomText status="label">{icon}</CustomText>
      </View>
      <CustomText
        type="p4"
        status="hint"
        style={{ textAlign: "center", lineHeight: 20 }}
      >
        {label}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  balanceCard: {
    margin: 16,
    marginTop: -100,
    padding: 16,
    borderRadius: 12,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 8,
  },
  actionButton: { width: 60, alignItems: "center", gap: 6 },
  wrapIcon: {
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
