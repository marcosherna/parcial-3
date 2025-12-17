import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";

const DividerComponent = ({
  orientation = "horizontal",
  thickness = 1,
  color,
  margin = 0,
  text = "",
  textStyle,
  style,
}) => {
  const { theme } = useTheme();
  const isHorizontal = orientation === "horizontal";

  const colors = {
    line: color || theme.outline,
    text: theme.secondaryText,
  };

  const containerStyle =
    useMemo(() => ({
      ...(isHorizontal
        ? { marginVertical: margin }
        : { marginHorizontal: margin }),
    }),
    [isHorizontal, margin]);

  const lineStyle =
    useMemo(() => ({
      backgroundColor: colors.line,
      ...(isHorizontal
        ? { height: thickness, flex: 1 }
        : { width: thickness, flex: 1 }),
    }),
    [isHorizontal, colors.line, thickness]);

  if (!text) {
    return (
      <View
        style={[
          styles.container,
          containerStyle,
          isHorizontal ? styles.row : styles.column,
          style,
        ]}
      >
        <View style={lineStyle} />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        styles.row,
        { alignItems: "center" },
        style,
      ]}
    >
      <View style={lineStyle} />
      <Text
        style={[styles.text, { color: colors.text }, textStyle]}
        numberOfLines={1}
      >
        {text}
      </Text>
      <View style={lineStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  text: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: "500",
  },
});

export const Divider = React.memo(DividerComponent);
