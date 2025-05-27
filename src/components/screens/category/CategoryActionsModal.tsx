import { memo } from "react";

import { CustomBottomSheet } from "@/components/custom";
import DeleteCategoryButton from "./DeleteCategoryButton";

import { TEXT } from "@/utils/text";

type IProps = {
  categoryId: number;
  show: boolean;
  onCancel: () => void;
};

export default memo(function CategoryActionsModal(props: IProps) {
  const { categoryId, show, onCancel } = props;
  return (
    <CustomBottomSheet title={TEXT.actions} show={show} onCancel={onCancel}>
      <DeleteCategoryButton categoryId={categoryId} onCancel={onCancel} />
    </CustomBottomSheet>
  );
});
