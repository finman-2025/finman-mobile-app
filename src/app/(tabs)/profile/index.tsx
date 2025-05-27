import { Image, StyleSheet, View } from "react-native";
import { useTheme } from "@rneui/themed";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";

import { useGetProfileQuery } from "@/api/auth";

import { CustomSkeleton, CustomText } from "@/components/custom";
import { Menu, RefreshableScrollView } from "@/components/common";

import { SUMMARY, TEXT } from "@/utils/text";
import { PATH } from "@/constants";
import { LogoutButton } from "@/components/screens/profile";
import { Fragment } from "react";

export default function ProfileScreen() {
  const {
    theme: { colors },
  } = useTheme();

  const { data, isFetching, isError, refetch } = useGetProfileQuery();

  return (
    <RefreshableScrollView
      contentContainerStyle={styles.profileScreen}
      onRefresh={refetch}
    >
      {isError ? (
        <CustomText status="label" style={{ textAlign: "center" }}>
          {TEXT.errorOccurred}
        </CustomText>
      ) : isFetching ? (
        <View style={styles.loader}>
          <CustomSkeleton circle height={100} width={100} />
          <CustomSkeleton height={30} width={200} />
          <CustomSkeleton height={100} />
        </View>
      ) : (
        <Fragment>
          <View style={styles.top}>
            <Image
              style={styles.image}
              src={data?.avatar}
              source={require("@/assets/images/avatar.png")}
            />
            <CustomText type="h4">{data?.name}</CustomText>
          </View>

          <View style={[styles.section, { backgroundColor: colors.white }]}>
            <CustomText type="h5" style={{ paddingHorizontal: 16 }}>
              {TEXT.personal}
            </CustomText>
            <Menu
              data={[
                {
                  icon: <AntDesign name="edit" size={24} />,
                  text: SUMMARY.update(TEXT.information),
                  url: PATH.UPDATE_INFORMATION,
                },
                {
                  icon: <Feather name="key" size={24} />,
                  text: SUMMARY.change(TEXT.password),
                  url: PATH.CHANGE_PASSWORD,
                },
              ]}
            />
          </View>

          <View style={[styles.section, { backgroundColor: colors.white }]}>
            <CustomText type="h5" style={{ paddingHorizontal: 16 }}>
              {TEXT.advanceSettings}
            </CustomText>
            <Menu
              data={[
                {
                  icon: <Feather name="moon" size={24} />,
                  text: SUMMARY.change(TEXT.theme),
                },
                {
                  icon: <MaterialIcons name="language" size={24} />,
                  text: SUMMARY.change(TEXT.language),
                },
              ]}
            />
          </View>

          <View style={styles.logoutBtn}>
            <LogoutButton />
          </View>
        </Fragment>
      )}
    </RefreshableScrollView>
  );
}

const styles = StyleSheet.create({
  profileScreen: { paddingTop: 0, paddingHorizontal: 0, gap: 16 },
  loader: { alignItems: "center", gap: 20, paddingHorizontal: 16 },
  image: { height: 100, width: 100, borderRadius: 100 },
  top: { alignItems: "center", gap: 12, marginBottom: 10 },
  section: { paddingVertical: 16, gap: 12 },
  logoutBtn: { alignSelf: "center", marginTop: 20 },
});
