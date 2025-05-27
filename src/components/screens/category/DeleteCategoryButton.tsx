import { Fragment, memo, useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "@rneui/themed";
import { Feather } from "@expo/vector-icons";

import { useDeleteCategoryMutation } from "@/api/categories";

import { ConfirmModal, CustomText } from "@/components/custom";

import { SUMMARY, TEXT } from "@/utils/text";

type IProps = {
  categoryId: number;
  onCancel?: () => void;
};

export default memo(function DeleteCategoryButton(props: IProps) {
  const { categoryId, onCancel } = props;
  const {
    theme: { colors },
  } = useTheme();

  const [showModal, setShowModal] = useState<boolean>(false);

  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  const handleDelete = useCallback(() => deleteCategory(categoryId), []);

  return (
    <Fragment>
      <TouchableOpacity
        style={{
          paddingVertical: 12,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
        onPress={() => setShowModal(true)}
      >
        <Feather name="trash" size={24} color={colors.error} />
        <CustomText status="error">{SUMMARY.delete(TEXT.category)}</CustomText>
      </TouchableOpacity>

      <ConfirmModal
        show={showModal}
        title={SUMMARY.delete(TEXT.category)}
        message={SUMMARY.confirmDelete(TEXT.category)}
        loading={isLoading}
        okBtnColor="error"
        onCancel={() => {
          setShowModal(false);
          onCancel();
        }}
        onOk={handleDelete}
      />
    </Fragment>
  );
});
