import { memo, useEffect, useRef } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useTheme } from "@rneui/themed";

import { CustomText } from "@/components/custom";

import { compareDay, getAllDatesOfMonth } from "@/utils/common";

type IProps = {
  color?: string;
  value: Date;
  onChange?: (value: Date) => void;
};

export default memo(function DayCarousel(props: IProps) {
  const {
    theme: { colors },
  } = useTheme();

  const { color = colors.primary, value, onChange } = props;

  const flatListRef = useRef<FlatList>(null);
  useEffect(() => {
    setTimeout(() => {
      const day = value.getDate();
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: day > 3 ? day - 4 : 0,
      });
    }, 500);
  }, [flatListRef?.current, value]);

  return (
    <FlatList
      horizontal
      data={getAllDatesOfMonth(value)}
      renderItem={({ item, index }) => (
        <DayCard
          key={index}
          color={color}
          date={item}
          active={compareDay(value, item)}
          onPress={onChange}
        />
      )}
      style={{ overflow: "visible" }}
      ref={flatListRef}
      onScrollToIndexFailed={() => {}}
      showsHorizontalScrollIndicator={false}
    />
  );
});

type ICardProps = {
  color: string;
  active?: boolean;
  date: Date;
  onPress?: (value: Date) => void;
};

const DayCard = memo(({ color, active, date, onPress }: ICardProps) => {
  const {
    theme: { colors },
  } = useTheme();

  return (
    <TouchableOpacity
      style={{
        opacity: active ? 1 : 0.7,
        transform: [{ scale: active ? 1 : 0.8 }],
        backgroundColor: colors.white,
        boxShadow: `0 2 5 ${colors.shadow}`,
        borderColor: color,
        marginHorizontal: active ? 4 : 0,
        borderTopWidth: 6,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
      }}
      disabled={active}
      onPress={() => onPress(date)}
    >
      <CustomText type="h5">{date.getDate()}</CustomText>
    </TouchableOpacity>
  );
});
