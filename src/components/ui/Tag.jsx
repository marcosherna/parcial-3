import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function Tag({ label, variant = "default", size = "md" }) {
  return (
    <View style={[styles.base, styles[variant], styles[size]]}>
      <Text style={[styles.text, styles[`text_${variant}`]]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
  },

  sm: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  md: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  lg: {
    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  default: {
    backgroundColor: "#E5E7EB",
  },
  primary: {
    backgroundColor: "#DBEAFE",
  },
  success: {
    backgroundColor: "#DCFCE7",
  },
  warning: {
    backgroundColor: "#FEF3C7",
  },
  error: {
    backgroundColor: "#FEE2E2",
  },

  text: {
    fontSize: 12,
    fontWeight: "500",
  },
  text_default: {
    color: "#374151",
  },
  text_primary: {
    color: "#1D4ED8",
  },
  text_success: {
    color: "#15803D",
  },
  text_warning: {
    color: "#92400E",
  },
  text_error: {
    color: "#B91C1C",
  },
});
