import { router } from "expo-router";

import type { IImageFile, IMutateFunction } from "@/types/frontend";
import { useUploadReceiptMutation } from "@/api/receipt";

import { error } from "@/store/reducers";
import { useAppDispatch } from "../common";

import { PATH } from "@/constants";
import { TEXT } from "@/utils/text";

export const useUploadReceipt = () => {
  const dispatch = useAppDispatch();

  const [uploadReceipt, result] = useUploadReceiptMutation();

  const handleUpload = (receipt: IImageFile) =>
    uploadReceipt(receipt)
      .unwrap()
      .then(({ value, date, seller }) =>
        value === null
          ? dispatch(error({ message: TEXT.cantIdentifyReceipt }))
          : router.push(PATH.ADD_EXPENSE(value, date, seller))
      );

  const res: [IMutateFunction<IImageFile>, typeof result] = [
    handleUpload,
    result,
  ];
  return res;
};
