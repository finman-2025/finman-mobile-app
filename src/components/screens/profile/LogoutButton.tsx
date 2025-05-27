import { Fragment, memo, useState } from "react";

import { useLogout } from "@/hooks/auth";

import { ConfirmModal, CustomButton } from "@/components/custom";

import { SUMMARY, TEXT } from "@/utils/text";

export default memo(function LogoutButton() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [logout, { isLoading }] = useLogout();

  return (
    <Fragment>
      <CustomButton
        color="error"
        type="clear"
        onPress={() => setShowModal(true)}
      >
        {TEXT.logout}
      </CustomButton>

      <ConfirmModal
        show={showModal}
        onCancel={() => setShowModal(false)}
        title={TEXT.logout}
        message={SUMMARY.confirm(TEXT.logout)}
        loading={isLoading}
        okBtnColor="error"
        onOk={logout}
      />
    </Fragment>
  );
});
