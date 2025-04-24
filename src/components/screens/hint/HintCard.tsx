import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@rneui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { CustomButton, CustomText } from "@/components/custom";

import { TEXT } from "@/utils/text";

type PropsType = {
  hintId: number;
  title: string;
  content: string;
};

export default memo(function HintCard(props: PropsType) {
  const {
    theme: { colors },
  } = useTheme();

  const { hintId, title, content } = props;

  return (
    <View
      style={[
        styles.card,
        { boxShadow: `0 5 5 ${colors.shadow}`, backgroundColor: colors.white },
      ]}
    >
      <View style={styles.top}>
        <MaterialCommunityIcons
          name="lightbulb-on-outline"
          size={40}
          color={colors.warning}
        />
        <CustomButton color="warning" size="sm">
          {TEXT.detail}
        </CustomButton>
      </View>
      <View style={{ gap: 4 }}>
        <CustomText type="h6">{title}</CustomText>
        <CustomText type="p4" status="hint">
          {content}
        </CustomText>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    gap: 10,
  },
  top: { flexDirection: "row", justifyContent: "space-between" },
});
