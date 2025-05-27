import type { ButtonProps, IconProps } from "@rneui/themed";
import { Button, useTheme } from "@rneui/themed";
import { useMemo } from "react";

export default function CustomButton(props: ButtonProps) {
  const {
    size = "md",
    color = "primary",
    type = "solid",
    icon,
    containerStyle,
    buttonStyle,
    titleStyle,
    ...rest
  } = props;

  const {
    theme: { colors },
  } = useTheme();

  const buttonColor = useMemo(() => colors[color as string], [colors, color]);

  const colorStyle = useMemo(
    () => ({
      color: type === "solid" ? colors.white : buttonColor,
      backgroundColor:
        type === "solid"
          ? buttonColor
          : type === "clear"
          ? `${buttonColor}20`
          : "transparent",
      borderColor: type === "clear" ? `${buttonColor}20` : buttonColor,
    }),
    [type, buttonColor]
  );

  const sizeStyle = useMemo(
    () => ({
      sm: { paddingVertical: 3, paddingHorizontal: 10, borderRadius: 8 },
      md: { paddingVertical: 7, paddingHorizontal: 14, borderRadius: 10 },
      lg: { paddingVertical: 8, paddingHorizontal: 18, borderRadius: 12 },
    }),
    [size]
  );

  const fontSize = useMemo(() => ({ sm: 16, md: 17, lg: 18 }), [size]);

  return (
    <Button
      {...rest}
      type={type}
      icon={
        icon ? { ...(icon as IconProps), color: colorStyle.color } : undefined
      }
      containerStyle={[
        {
          borderRadius: sizeStyle[size].borderRadius,
          overflow: "hidden",
        },
        containerStyle,
      ]}
      buttonStyle={[
        {
          ...sizeStyle[size],
          ...colorStyle,
          borderWidth: 2,
        },
        buttonStyle,
      ]}
      titleStyle={[
        { fontSize: fontSize[size], color: colorStyle.color },
        titleStyle,
      ]}
      disabledStyle={{ ...colorStyle, opacity: 0.6 }}
      disabledTitleStyle={{ color: colorStyle.color }}
      loadingProps={{ size: size === "md" ? 21 : 22 }}
    />
  );
}
