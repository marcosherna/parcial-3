import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { useTheme } from "../hooks/useTheme";
import { spacing } from "../resources/spacing";
import { fontSizes, lineHeights, fontWeights } from "../resources/typography";

export function MessageBubble({
  text = "Hello!",
  isMine = false,
  time = "01:16 PM",
  style = {},
  textStyle = {},
}) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isMine ? theme.primary : theme.surface,
          alignSelf: isMine ? "flex-end" : "flex-start",
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: isMine ? theme.onPrimary : theme.text,
          },
          textStyle,
        ]}
      >
        {text}
      </Text>

      <Text
        style={[
          styles.time,
          {
            color: isMine ? theme.onPrimary : theme.secondaryText,
          },
        ]}
      >
        {time}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.md,
    marginVertical: spacing.xs,
    maxWidth: "80%",
  },
  text: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    fontWeight: fontWeights.normal,
  },
  time: {
    fontSize: fontSizes.xs,
    marginTop: spacing.xs,
    textAlign: "right",
  },
});
