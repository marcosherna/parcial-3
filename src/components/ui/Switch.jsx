import React from "react";
import { Switch as RNSwitch, Platform } from "react-native";
import { useTheme } from "../../hooks";

export function Switch({ value, onValueChange, disabled = false }) {
  const { theme, isDark } = useTheme();

  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{
        false: theme.outline,
        true: theme.primary,
      }}
      thumbColor={
        Platform.OS === "android"
          ? value
            ? theme.onPrimary
            : theme.surface
          : undefined
      }
      ios_backgroundColor={theme.outline}
    />
  );
}
