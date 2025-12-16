import React from "react";
import { RectButton } from "react-native-gesture-handler";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import * as Icons from "lucide-react-native";

import { getTextStyle } from "../../helpers/TextStyles";
import { useTheme } from "../../hooks/useTheme";

export function Button({
  title = "Button",
  onPress,
  disabled = false,
  loading = false,
  variant = "primary",
  textSize = "md",
  textWeight = "semibold",
  style = {},
  textStyle = {},
  icon = null,
  iconSize = 20,
  iconPosition = "left",
  iconOnly = false, // 👈 NUEVO
  fullWidth = false,
  ...props
}) {
  const { theme } = useTheme();

  const IconComponent = icon ? Icons[icon] : null;

  const getButtonStyles = () => {
    if (disabled) {
      return {
        backgroundColor: theme.outline,
        borderColor: theme.outline,
      };
    }

    switch (variant) {
      case "secondary":
        return {
          backgroundColor: theme.surface,
          borderColor: theme.primary,
          borderWidth: 1,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: theme.primary,
          borderWidth: 1,
        };
      default:
        return { backgroundColor: theme.primary };
    }
  };

  const getContentColor = () => {
    if (disabled) return theme.secondaryText;
    return variant === "primary" ? theme.onPrimary : theme.primary;
  };

  const baseTextStyle = getTextStyle(
    textSize,
    textWeight,
    getContentColor(),
    "center"
  );

  return (
    <View style={[fullWidth && styles.fullWidth]}>
      <RectButton
        enabled={!disabled && !loading}
        onPress={onPress}
        rippleColor={theme.primary + "33"}
        style={[
          styles.buttonContainer,
          iconOnly && styles.iconOnlyContainer, // 👈
          getButtonStyles(),
          fullWidth && styles.fullWidth,
          disabled && styles.disabled,
          style,
        ]}
        {...props}
      >
        <View style={styles.pressableContent}>
          {loading ? (
            <ActivityIndicator size="small" color={getContentColor()} />
          ) : (
            <View style={styles.contentRow}>
              {IconComponent && (
                <IconComponent size={iconSize} color={getContentColor()} />
              )}

              {!iconOnly && (
                <Text style={[baseTextStyle, textStyle]}>{title}</Text>
              )}
            </View>
          )}
        </View>
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 8,
    overflow: "hidden",
    minHeight: 48,
  },
  iconOnlyContainer: {
    minWidth: 48,
    paddingHorizontal: 0,
  },
  pressableContent: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  fullWidth: {
    width: "100%",
  },
  disabled: {
    opacity: 0.6,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
