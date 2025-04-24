import type { ButtonProps } from "@rneui/themed";
import { Button } from "@rneui/themed";
import { useMemo } from "react";

export default function CustomButton(props: ButtonProps) {
  const { size = "md", buttonStyle, titleStyle, ...rest } = props;

  const sizeStyle = useMemo(
    () => ({
      sm: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
      md: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 10 },
      lg: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12 },
    }),
    [size]
  );

  const fontSize = useMemo(() => ({ sm: 16, md: 17, lg: 18 }), [size]);

  return (
    <Button
      {...rest}
      buttonStyle={[buttonStyle, { ...sizeStyle[size] }]}
      titleStyle={[titleStyle, { fontSize: fontSize[size] }]}
    >
      {props.children}
    </Button>
  );
}
