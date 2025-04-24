import type { TextProps, TextStyle } from "react-native";
import { Fragment, memo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { useTheme } from "@rneui/themed";
import { TEXT } from "@/utils/text";

export type TextStatus =
  | ""
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "label"
  | "hint"
  | "disabled"
  | "white";
export type TextType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p1"
  | "p2"
  | "p3"
  | "p4"
  | "p5";

export type CustomTextProps = TextProps & {
  color?: string;
  type?: TextType;
  status?: TextStatus;
  style?: TextStyle;
  canExpand?: boolean;
};

export default memo((props: CustomTextProps) => {
  const {
    style,
    color,
    type = "p3",
    status = "",
    numberOfLines,
    canExpand = false,
    ...rest
  } = props;

  const {
    theme: { colors },
  } = useTheme();

  const [showMore, setShowMore] = useState<boolean>(false);

  let themedColor: string = colors.black;

  if (color) themedColor = color;
  else if (status === "primary") themedColor = colors.primary;
  else if (status === "success") themedColor = colors.success;
  else if (status === "warning") themedColor = colors.warning;
  else if (status === "danger") themedColor = colors.error;
  else if (status === "label") themedColor = colors.grey2;
  else if (status === "hint") themedColor = colors.grey3;
  else if (status === "disabled") themedColor = colors.grey4;
  else if (status === "white") themedColor = colors.white;

  return (
    <Fragment>
      <Text
        style={[
          { color: themedColor },
          styles[type],
          style,
          canExpand ? { marginBottom: 0 } : undefined,
        ]}
        numberOfLines={canExpand && showMore ? undefined : numberOfLines}
        ellipsizeMode="tail"
        {...rest}
      />
      {canExpand && (
        <TouchableOpacity
          style={{ alignSelf: "flex-start", marginBottom: style?.marginBottom }}
          onPress={() => setShowMore(!showMore)}
        >
          <Text
            style={[
              styles[type],
              { color: showMore ? colors.grey2 : colors.primary },
            ]}
          >
            {showMore ? TEXT.showLess : TEXT.showMore}
          </Text>
        </TouchableOpacity>
      )}
    </Fragment>
  );
});

const styles = StyleSheet.create({
  h1: { fontSize: 28, fontWeight: 500, lineHeight: 38 },
  h2: { fontSize: 24, fontWeight: 500, lineHeight: 34 },
  h3: { fontSize: 22, fontWeight: 500, lineHeight: 30 },
  h4: { fontSize: 20, fontWeight: 500, lineHeight: 28 },
  h5: { fontSize: 18, fontWeight: 500, lineHeight: 27 },
  h6: { fontSize: 16, fontWeight: 500, lineHeight: 26 },
  p1: { fontSize: 20, lineHeight: 28 },
  p2: { fontSize: 18, lineHeight: 27 },
  p3: { fontSize: 16, lineHeight: 26 },
  p4: { fontSize: 14, lineHeight: 24 },
  p5: { fontSize: 12, lineHeight: 22 },
});
