import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { spacing } from "../../resources/spacing";

export function Layout({
  direction = "column",
  alignVertical = "flex-start",
  alignHorizontal = "flex-start",
  wrap = "nowrap",

  gap,
  padding,
  paddingHorizontal,
  paddingVertical,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,

  margin,
  marginHorizontal,
  marginVertical,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,

  fullWidth = false,
  fullHeight = false,
  borderRadius,
  backgroundColor,
  borderWidth,
  borderColor,

  screen = false,

  style,
  children,
  ...props
}) {
  const parseSpace = (value) => {
    if (typeof value === "string") return spacing[value] ?? 0;
    if (typeof value === "number") return value;
    return undefined;
  };

  const parsedGap = parseSpace(gap);

  const styleLayout = {
    flexDirection: direction,
    justifyContent: alignVertical,
    alignItems: alignHorizontal,
    flexWrap: wrap,

    ...(parsedGap !== undefined && {
      gap: parsedGap,
      rowGap: parsedGap,
      columnGap: parsedGap,
    }),

    ...(padding !== undefined && { padding: parseSpace(padding) }),
    ...(paddingHorizontal !== undefined && {
      paddingHorizontal: parseSpace(paddingHorizontal),
    }),
    ...(paddingVertical !== undefined && {
      paddingVertical: parseSpace(paddingVertical),
    }),
    ...(paddingTop !== undefined && { paddingTop: parseSpace(paddingTop) }),
    ...(paddingBottom !== undefined && {
      paddingBottom: parseSpace(paddingBottom),
    }),
    ...(paddingLeft !== undefined && { paddingLeft: parseSpace(paddingLeft) }),
    ...(paddingRight !== undefined && {
      paddingRight: parseSpace(paddingRight),
    }),

    ...(margin !== undefined && { margin: parseSpace(margin) }),
    ...(marginHorizontal !== undefined && {
      marginHorizontal: parseSpace(marginHorizontal),
    }),
    ...(marginVertical !== undefined && {
      marginVertical: parseSpace(marginVertical),
    }),
    ...(marginTop !== undefined && { marginTop: parseSpace(marginTop) }),
    ...(marginBottom !== undefined && {
      marginBottom: parseSpace(marginBottom),
    }),
    ...(marginLeft !== undefined && { marginLeft: parseSpace(marginLeft) }),
    ...(marginRight !== undefined && { marginRight: parseSpace(marginRight) }),

    ...(fullWidth && { width: "100%" }),
    ...(fullHeight && { height: "100%" }),

    ...(screen && { flex: 1 }),

    ...(borderRadius && { borderRadius }),
    ...(backgroundColor && { backgroundColor }),
    ...(borderWidth && { borderWidth }),
    ...(borderColor && { borderColor }),
  };

  const Container = screen ? SafeAreaView : View;

  return (
    <Container
      style={[styles.base, styleLayout, style]}
      edges={screen ? ["top", "bottom", "left", "right"] : undefined}
      {...props}
    >
      {children}
    </Container>
  );
}

const styles = StyleSheet.create({
  base: {
    flexShrink: 0,
    flexGrow: 0,
  },
});
