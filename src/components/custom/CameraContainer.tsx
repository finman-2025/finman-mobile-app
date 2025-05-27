import type { CameraCapturedPicture } from "expo-camera";
import { CameraView, useCameraPermissions } from "expo-camera";
import { memo, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

type IProps = {
  onPermissionDenied?: () => void;
  onPictureSaved?: (picture: CameraCapturedPicture) => void;
  loading?: boolean;
};

export default memo(function CameraContainer(props: IProps) {
  const { onPermissionDenied, onPictureSaved, loading } = props;

  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    if (permission && !permission.granted && onPermissionDenied)
      onPermissionDenied();
  }, [permission]);

  const ref = useRef<CameraView>(null);

  const takePicture = () => {
    ref.current?.takePictureAsync({
      skipProcessing: true,
      onPictureSaved: (picture) => onPictureSaved && onPictureSaved(picture),
    });
  };

  return permission ? (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={ref}
        style={styles.camera}
        facing="back"
        animateShutter={false}
      >
        {loading && (
          <ActivityIndicator style={styles.spinner} size={80} color="#fff" />
        )}
        <TouchableOpacity
          style={[styles.button, { opacity: loading ? 0.5 : 1 }]}
          onPress={takePicture}
          disabled={loading}
        />
      </CameraView>
    </View>
  ) : null;
});

const styles = StyleSheet.create({
  camera: { flex: 1, alignItems: "center" },
  spinner: { margin: "auto" },
  button: {
    position: "absolute",
    bottom: "12%",
    backgroundColor: "white",
    height: 90,
    width: 90,
    borderRadius: 50,
    borderWidth: 12,
    borderColor: "#fff3",
  },
});
