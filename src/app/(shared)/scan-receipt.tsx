import { router } from "expo-router";
import { CameraCapturedPicture } from "expo-camera";
import { useCallback } from "react";

import { useUploadReceipt } from "@/hooks/receipt";

import { CameraContainer } from "@/components/custom";

export default function ScanReceiptScreen() {
  const [uploadReceipt, { isLoading }] = useUploadReceipt();

  const handleUpload = useCallback(
    ({ uri }: CameraCapturedPicture) =>
      uploadReceipt({ uri, name: "receipt", type: `image/${uri.slice(-3)}` }),
    []
  );

  return (
    <CameraContainer
      onPermissionDenied={() => router.back()}
      onPictureSaved={handleUpload}
      loading={isLoading}
    />
  );
}
