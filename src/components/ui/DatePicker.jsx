import React from "react";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "../../hooks/useTheme";

export function DatePicker({ value, onChange, mode = "date", display }) {
  const { isDark, theme } = useTheme();

  return (
    <DateTimePicker
      value={value}
      mode={mode}
      onChange={onChange}
      display={display ?? "default"}
      {...(Platform.OS === "ios" && {
        themeVariant: isDark ? "dark" : "light",
        accentColor: theme.primary,
        textColor: theme.text,
      })}
    />
  );
}
