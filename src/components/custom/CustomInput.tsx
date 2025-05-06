import type { IconProps, InputProps } from "@rneui/themed";
import type { Dispatch, SetStateAction } from "react";
import { memo, useState } from "react";
import { Input, useTheme } from "@rneui/themed";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

type IProps = InputProps & {
  type?: "text" | "password";
};

export default memo(function CustomInput(props: IProps) {
  const { type = "text", leftIcon, rightIcon, ...rest } = props;
  const {
    theme: { colors },
  } = useTheme();

  const [hideText, setHideText] = useState<boolean>(type === "password");

  return (
    <Input
      {...rest}
      secureTextEntry={hideText}
      leftIcon={{ ...(leftIcon as IconProps), color: colors.grey1 }}
      rightIcon={
        type === "password" ? (
          <ShowTextButton hideText={hideText} setHideText={setHideText} />
        ) : (
          rightIcon
        )
      }
    />
  );
});

const ShowTextButton = memo(
  (props: {
    hideText: boolean;
    setHideText: Dispatch<SetStateAction<boolean>>;
  }) => {
    const { hideText, setHideText } = props;
    const {
      theme: { colors },
    } = useTheme();

    return (
      <TouchableOpacity
        style={{
          paddingVertical: 10,
          paddingLeft: 8,
        }}
        onPress={() => (hideText ? setHideText(false) : setHideText(true))}
      >
        <Feather
          name={hideText ? "eye-off" : "eye"}
          size={20}
          color={colors.grey3}
        />
      </TouchableOpacity>
    );
  }
);
