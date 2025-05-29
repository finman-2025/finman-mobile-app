import { router } from "expo-router";
import { useCallback, useMemo } from "react";

import type { IUpdateUser } from "@/types/frontend";
import { useGetProfileQuery } from "@/api/user";
import { useUpdateProfile } from "@/hooks/user";
import { useAppDispatch } from "@/hooks/common";
import { success } from "@/store/reducers";

import { RefreshableScrollView } from "@/components/common";
import { CustomText } from "@/components/custom";

import { DATE_FORMAT_DTO } from "@/constants";
import { SUMMARY, TEXT } from "@/utils/text";
import { UpdateProfileForm } from "@/components/screens/profile";
import { removeEmpty, toDateString } from "@/utils/common";
import _ from "lodash";

export default function UpdateProfileScreen() {
  const dispatch = useAppDispatch();

  const { data, isFetching, isError, refetch } = useGetProfileQuery();

  const [updateProfile, { isLoading }] = useUpdateProfile();

  const initial = useMemo(
    () =>
      data
        ? _.pick(data, [
            "name",
            "email",
            "sex",
            "dateOfBirth",
            "phoneNumber",
            "address",
          ])
        : {},
    [data]
  );

  const handleUpdate = useCallback(
    (value: IUpdateUser) => {
      const initialValue = removeEmpty({
        ...initial,
        dateOfBirth: value.dateOfBirth
          ? toDateString(value.dateOfBirth, DATE_FORMAT_DTO)
          : undefined,
      });
      const updateValue = removeEmpty({
        ...value,
        dateOfBirth: value.dateOfBirth
          ? toDateString(value.dateOfBirth, DATE_FORMAT_DTO)
          : undefined,
      });

      if (_.isEqual(initialValue, updateValue)) {
        dispatch(success({ message: SUMMARY.successfully(TEXT.update) }));
        router.back();
      } else updateProfile(updateValue);
    },
    [data]
  );

  return (
    <RefreshableScrollView onRefresh={refetch}>
      {isError ? (
        <CustomText status="label" style={{ textAlign: "center" }}>
          {TEXT.errorOccurred}
        </CustomText>
      ) : (
        <UpdateProfileForm
          initial={initial}
          loading={isFetching}
          submitting={isLoading}
          onSubmit={handleUpdate}
        />
      )}
    </RefreshableScrollView>
  );
}
