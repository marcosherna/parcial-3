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
      case "primary":
        return { backgroundColor: theme.primary };
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.secondaryText;

    switch (variant) {
      case "secondary":
      case "outline":
        return theme.primary;
      default:
      case "primary":
        return theme.onPrimary;
    }
  };

  const baseTextStyle = getTextStyle(
    textSize,
    textWeight,
    getTextColor(),
    "center"
  );

  const renderIcon = () => {
    if (!IconComponent || loading) return null;

    return (
      <IconComponent
        size={iconSize}
        color={getTextColor()}
        style={[iconPosition === "left" ? styles.iconLeft : styles.iconRight]}
      />
    );
  };

  return (
    <View
      style={[
        styles.wrapper,
        getButtonStyles(),
        disabled && styles.disabled,
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      <RectButton
        enabled={!disabled && !loading}
        onPress={onPress}
        rippleColor={theme.primary + "33"}
        style={[styles.button, fullWidth && styles.fullWidth]}
        {...props}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === "primary" ? theme.onPrimary : theme.primary}
          />
        ) : (
          <View style={styles.contentRow}>
            {icon && iconPosition === "left" && renderIcon()}
            <Text style={[baseTextStyle, textStyle]}>{title}</Text>
            {icon && iconPosition === "right" && renderIcon()}
          </View>
        )}
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 8,
    overflow: "hidden",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
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
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
