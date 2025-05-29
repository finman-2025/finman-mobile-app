import { useChangeAvatarMutation } from "@/api/user";

import type { IImageFile, IMutateFunction } from "@/types/frontend";

import { useAppDispatch } from "../common";
import { success } from "@/store/reducers";

import { SUMMARY, TEXT } from "@/utils/text";

export const useChangeAvatar = () => {
  const dispatch = useAppDispatch();

  const [changeAvatar, result] = useChangeAvatarMutation();

  const handleChange = (avatar: IImageFile) =>
    changeAvatar(avatar)
      .unwrap()
      .then(() =>
        dispatch(success({ message: SUMMARY.successfully(TEXT.update) }))
      );

  const res: [IMutateFunction<IImageFile>, typeof result] = [
    handleChange,
    result,
  ];
  return res;
};
