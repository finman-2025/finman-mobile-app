import { memo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";
import { ButtonGroup, useTheme } from "@rneui/themed";

import type { IOption } from "@/types/frontend";

import _ from "lodash";

type IProps = {
  options: IOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  style?: StyleProp<ViewStyle>;
};

export default memo(function Segmented(props: IProps) {
  const { options, value, onChange, style } = props;

  const {
    theme: { colors },
  } = useTheme();

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: `${colors.primary}22`,
          boxShadow: `0 5 5 ${colors.shadow}`,
        },
        style,
      ]}
    >
      <ButtonGroup
        buttons={options.map(({ value, label }) => label ?? value.toString())}
        selectedIndex={_.findIndex(options, { value })}
        onPress={(index) => onChange(options[index].value)}
        containerStyle={styles.container}
        innerBorderStyle={{ width: 0 }}
        buttonContainerStyle={styles.button}
        textStyle={{ fontSize: 16 }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: { padding: 6, borderRadius: 16 },
  container: {
    borderWidth: 0,
    marginHorizontal: 0,
    marginVertical: 0,
    backgroundColor: "transparent",
  },
  button: { borderRadius: 10, overflow: "hidden" },
});
