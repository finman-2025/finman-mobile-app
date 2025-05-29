import { router } from "expo-router";
import { useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import { Controller, useForm } from "react-hook-form";

import type { IExportReport } from "@/types/frontend";
import { useExportReport } from "@/hooks/reports";

import { RefreshableScrollView } from "@/components/common";
import {
  CustomButton,
  CustomText,
  DatePicker,
  Select,
} from "@/components/custom";

import { PATH, REPORT_FILE_TYPE } from "@/constants";
import { SUMMARY, TEXT } from "@/utils/text";

export default function ExportReportScreen() {
  const [exportReport, { isLoading }] = useExportReport();

  const { control, reset, handleSubmit } = useForm<IExportReport>({
    disabled: isLoading,
    defaultValues: { fileType: REPORT_FILE_TYPE.CSV },
  });

  const submit = useCallback(
    handleSubmit((data) => exportReport(data)),
    []
  );

  return (
    <RefreshableScrollView onRefresh={reset}>
      <Controller
        control={control}
        rules={{
          required: SUMMARY.pleaseSelect(TEXT.startDate),
          validate: (value, { endDate }) =>
            value > endDate ? TEXT.startDateBeforeEndDate : true,
          deps: "endDate",
        }}
        render={({
          field: { value, onChange, disabled },
          fieldState: { error },
        }) => (
          <DatePicker
            required
            label={TEXT.startDate}
            value={value}
            onChange={onChange}
            disabled={disabled}
            errorMessage={error?.message}
          />
        )}
        name="startDate"
      />

      <Controller
        control={control}
        rules={{
          required: SUMMARY.pleaseSelect(TEXT.endDate),
          validate: (value, { startDate }) =>
            value < startDate ? TEXT.startDateBeforeEndDate : true,
          deps: "startDate",
        }}
        render={({
          field: { value, onChange, disabled },
          fieldState: { error },
        }) => (
          <DatePicker
            required
            label={TEXT.endDate}
            value={value}
            onChange={onChange}
            disabled={disabled}
            errorMessage={error?.message}
          />
        )}
        name="endDate"
      />

      <Controller
        control={control}
        rules={{ required: SUMMARY.pleaseSelect(TEXT.endDate) }}
        render={({
          field: { value, onChange, disabled },
          fieldState: { error },
        }) => (
          <Select
            required
            label={TEXT.fileType}
            options={[{ value: REPORT_FILE_TYPE.CSV, label: ".csv" }]}
            value={value}
            onChange={onChange}
            disabled={disabled}
            errorMessage={error?.message}
          />
        )}
        name="fileType"
      />

      <View style={{ flexDirection: "row", gap: 16, marginVertical: 24 }}>
        <CustomButton
          color="secondary"
          type="clear"
          containerStyle={{ flex: 1 }}
          disabled={isLoading}
          onPress={() => reset()}
        >
          {TEXT.reset}
        </CustomButton>
        <CustomButton
          containerStyle={{ flex: 1 }}
          loading={isLoading}
          onPress={submit}
        >
          {TEXT.export}
        </CustomButton>
      </View>

      <TouchableOpacity
        style={{ alignSelf: "center" }}
        onPress={() => router.push(PATH.EXPORT_HISTORY)}
      >
        <CustomText type="h6" status="label">
          {TEXT.viewExportedReports}
        </CustomText>
      </TouchableOpacity>
    </RefreshableScrollView>
  );
}
