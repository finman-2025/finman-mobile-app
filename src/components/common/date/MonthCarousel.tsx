import { memo } from "react";
import { View } from "react-native";

import { CustomText, CustomButton } from "@/components/custom";

import {
  toMonthYearString,
  getFirstDateNextMonth,
  getFirstDatePrevMonth,
} from "@/utils/common";

type IProps = {
  value: Date;
  onChange?: (value: Date) => void;
};

export default memo(function MonthCarousel(props: IProps) {
  const { value, onChange } = props;

  const handleBack = () => onChange(getFirstDatePrevMonth(value));

  const handleNext = () => onChange(getFirstDateNextMonth(value));

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <CustomButton
        color="secondary"
        type="clear"
        buttonStyle={{ paddingHorizontal: 3 }}
        icon={{ type: "feather", name: "chevron-left" }}
        onPress={handleBack}
      />

      <CustomText type="h5">{toMonthYearString(value)}</CustomText>

      <CustomButton
        color="secondary"
        type="clear"
        buttonStyle={{ paddingHorizontal: 3 }}
        icon={{ type: "feather", name: "chevron-right" }}
        onPress={handleNext}
      />
    </View>
  );
});
