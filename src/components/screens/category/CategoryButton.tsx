import { router } from "expo-router";
import { Fragment, memo, useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@rneui/themed";

import type { CategoryDto } from "@/types/dto";

import { CustomText } from "@/components/custom";
import CategoryActionsModal from "./CategoryActionsModal";

import { PATH } from "@/constants";

type IProps = Pick<CategoryDto, "id" | "name" | "image">;

export default memo(function CategoryButton(props: IProps) {
  const {
    theme: { colors },
  } = useTheme();
  const { id, name, image } = props;

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <Fragment>
      <TouchableOpacity
        style={[styles.card, { boxShadow: `0 3 10 ${colors.shadow}` }]}
        onPress={() => router.push(PATH.CATEGORY(id, name))}
        onLongPress={() => setShowModal(true)}
      >
        <Image
          style={styles.image}
          src={image}
          source={require("@/assets/images/category.png")}
        />
        <CustomText style={{ margin: "auto" }} numberOfLines={1}>
          {name}
        </CustomText>
      </TouchableOpacity>

      <CategoryActionsModal
        categoryId={id}
        show={showModal}
        onCancel={() => setShowModal(false)}
      />
    </Fragment>
  );
});

const styles = StyleSheet.create({
  card: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 4,
    alignItems: "center",
  },
  image: { height: 50, width: 50 },
});
