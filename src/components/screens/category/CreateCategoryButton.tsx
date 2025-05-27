import { Fragment, useCallback, useState } from "react";

import type { CreateCategoryDto } from "@/types/dto";
import { useCreateCategory } from "@/hooks/categories";

import { CustomBottomSheet, CustomButton } from "@/components/custom";
import CreateCategoryForm from "./CreateCategoryForm";

import { SUMMARY, TEXT } from "@/utils/text";

export default function CreateCategoryButton() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [createCategory, { isLoading }] = useCreateCategory();

  const handleCreate = useCallback((value: CreateCategoryDto) => {
    createCategory(value, () => setShowModal(false));
  }, []);
  return (
    <Fragment>
      <CustomButton
        type="clear"
        containerStyle={{ alignSelf: "center" }}
        onPress={() => setShowModal(true)}
      >
        {SUMMARY.create(TEXT.category)}
      </CustomButton>

      <CustomBottomSheet
        title={SUMMARY.create(TEXT.category)}
        show={showModal}
        onCancel={() => isLoading || setShowModal(false)}
      >
        <CreateCategoryForm
          submitting={isLoading}
          onCancel={() => setShowModal(false)}
          onSubmit={handleCreate}
        />
      </CustomBottomSheet>
    </Fragment>
  );
}
