import { memo } from "react";

import { useChangeAvatar } from "@/hooks/user";

import { ImageUpload } from "@/components/custom";

type IProps = {
  avatar?: string;
};

export default memo(function Avatar({ avatar }: IProps) {
  const [changeAvatar, { isLoading }] = useChangeAvatar();

  return (
    <ImageUpload
      type="avatar"
      value={{ uri: avatar }}
      onUpload={changeAvatar}
      disabled={isLoading}
    />
  );
});
