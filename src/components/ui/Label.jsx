import React from "react";
import { Text } from "react-native";

import { getTextStyle } from "../../helpers/TextStyles";
import { useTheme } from "../../hooks/useTheme";

export function Label({
  children,
  size = "md",
  weight = "normal",
  color,
  align = "left",
  paragraph = false,
  numberOfLines,
  style,
  ...rest
}) {
  const { theme } = useTheme();

  const resolvedColor = color ?? theme.text;

  const textStyle = getTextStyle(size, weight, resolvedColor, align, paragraph);

  return (
    <Text style={[textStyle, style]} numberOfLines={numberOfLines} {...rest}>
      {children}
    </Text>
  );
}
