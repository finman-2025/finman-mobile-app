import { memo, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import { Dialog, useTheme } from "@rneui/themed";
import { Feather } from "@expo/vector-icons";

import { CustomButton, CustomText } from "@/components/custom";

import dayjs from "dayjs";
import { TEXT } from "@/utils/text";

import _ from "lodash";

type IProps = {
  initial?: Date;
  maxDate?: Date;
  show: boolean;
  onOk: (value: Date) => void;
  onCancel: () => void;
};

export default memo((props: IProps) => {
  const { initial, maxDate = new Date(), show, onOk, onCancel } = props;

  const {
    theme: { colors },
  } = useTheme();

  const [selected, setSelected] = useState<Date>(initial);

  useEffect(() => {
    setSelected(initial ?? new Date());
  }, [initial]);

  return (
    <Dialog
      isVisible={show}
      animationType="fade"
      onBackdropPress={onCancel}
      overlayStyle={{ width: "90%", borderRadius: 12 }}
    >
      <DateTimePicker
        mode="single"
        locale="vi"
        date={selected}
        maxDate={maxDate}
        minDate={dayjs().subtract(100, "year").toDate()}
        onChange={({ date }) => date && setSelected(date as Date)}
        components={{
          IconPrev: (
            <View
              style={[styles.prevBtn, { backgroundColor: colors.disabled }]}
            >
              <Feather name="chevron-left" size={24} color={colors.black} />
            </View>
          ),
          IconNext: (
            <View
              style={[styles.nextBtn, { backgroundColor: colors.disabled }]}
            >
              <Feather name="chevron-right" size={24} color={colors.black} />
            </View>
          ),
          Month: ({ name, isSelected }) => (
            <View
              style={[
                styles.monthYearButton,
                {
                  borderColor: colors.disabled,
                  backgroundColor: isSelected ? colors.primary : colors.shadow,
                  borderWidth: isSelected ? 0 : 1,
                },
              ]}
            >
              <CustomText status={isSelected ? "white" : ""}>
                {_.upperFirst(name.full)}
              </CustomText>
            </View>
          ),
          Year: ({ number, isSelected }) => (
            <View
              style={[
                styles.monthYearButton,
                {
                  borderColor: colors.disabled,
                  backgroundColor: isSelected ? colors.primary : colors.shadow,
                  borderWidth: isSelected ? 0 : 1,
                },
              ]}
            >
              <CustomText status={isSelected ? "white" : ""}>
                {number}
              </CustomText>
            </View>
          ),
          Day: ({ number, isDisabled, isSelected }) => (
            <CustomText
              status={isDisabled ? "disabled" : isSelected ? "white" : ""}
            >
              {number}
            </CustomText>
          ),
        }}
        styles={{
          header: { margin: -6 },
          year_selector_label: styles.headerText,
          month_selector_label: styles.headerText,
          months: { top: -12 },
          years: { top: -12 },
          weekdays: { ...styles.weekdays, borderColor: colors.disabled },
          weekday_label: { color: colors.grey3 },
          day: styles.day,
          selected: { backgroundColor: colors.primary },
          selected_label: { color: colors.white },
        }}
      />
      <View style={styles.buttons}>
        <CustomButton
          color="secondary"
          type="clear"
          containerStyle={{ flex: 1 }}
          onPress={onCancel}
        >
          {TEXT.cancel}
        </CustomButton>
        <CustomButton
          containerStyle={{ flex: 1 }}
          onPress={() => onOk(selected)}
        >
          {TEXT.ok}
        </CustomButton>
      </View>
    </Dialog>
  );
});

const styles = StyleSheet.create({
  wrapper: { paddingHorizontal: 16 },
  container: {
    padding: 16,
    borderRadius: 16,
  },
  prevBtn: {
    paddingRight: 7,
    paddingLeft: 5,
    paddingTop: 6,
    paddingBottom: 5,
    borderRadius: 6,
  },
  nextBtn: {
    paddingLeft: 7,
    paddingRight: 5,
    paddingTop: 6,
    paddingBottom: 5,
    borderRadius: 6,
  },
  headerText: { fontSize: 20, fontWeight: 500 },
  monthYearButton: {
    flex: 1,
    alignSelf: "stretch",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  weekdays: { borderBottomWidth: 1, height: 40, marginTop: 8 },
  day: { borderRadius: 50, margin: 2, aspectRatio: 1 },
  buttons: { marginTop: 20, flexDirection: "row", gap: 16 },
});
