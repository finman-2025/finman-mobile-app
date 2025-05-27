import type { ReceiptDataDto } from "@/types/dto";
import type { IImageFile } from "@/types/frontend";
import API from "./base";

const receiptApi = API.injectEndpoints({
  endpoints: (build) => ({
    uploadReceipt: build.mutation<ReceiptDataDto, IImageFile>({
      query: (receipt) => {
        const body = new FormData();
        body.append("file", receipt as any);
        return {
          url: "/receipts/upload",
          method: "POST",
          body,
          headers: { "Content-type": "multipart/form-data" },
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useUploadReceiptMutation } = receiptApi;
