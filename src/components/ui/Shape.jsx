import React from "react";
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../hooks/useTheme";

// type Variant = "default" | "outline" | "contained" | "ghost";
// type Shape = "rounded" | "circle";

export const Shape = ({
  size = 24,
  color,
  colorShape,
  variant = "default",
  shape = "rounded",
  borderWidth,
  borderColor,
  opacity = 1,
  shadow = false,
  elevated = false,
  disabled = false,
  style,
  children,
  onPress,
}) => {
  const { theme } = useTheme();

  const colors = {
    icon: color ?? theme.surface,
    shape: colorShape ?? theme.surface,
    outline: borderColor ?? theme.outline,
    primary: color ?? theme.primary,
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "outline":
        return {
          borderWidth: borderWidth ?? 1,
          borderColor: colors.outline,
          backgroundColor: "transparent",
        };
      case "contained":
        return {
          backgroundColor: colors.primary,
        };
      case "ghost":
        return {
          backgroundColor: `${colors.primary}22`,
        };
      default:
        return {
          backgroundColor: "transparent",
        };
    }
  };

  const getShapeStyles = () =>
    shape === "circle"
      ? {
          borderRadius: size,
          width: size * 2,
          height: size * 2,
        }
      : {
          borderRadius: 8,
          padding: size * 0.5,
        };

  const shadowStyle =
    shadow || elevated
      ? {
          shadowColor: "black",
          shadowOpacity: 0.2,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 3 },
          elevation: 4,
        }
      : {};

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      activeOpacity={0.8}
      disabled={disabled}
      style={[
        styles.container,
        getShapeStyles(),
        getVariantStyles(),
        shadowStyle,
        { opacity },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
    >
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    opacity: 0.5,
  },
});
