import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import { useTheme } from "../../hooks";

export function LoadingOverlay({
  loading = false,
  children,
  size = 90,
  opacity = 0.25,
  background = "transparent",
}) {
  const { theme, isDark } = useTheme();

  if (!loading) {
    return <View style={styles.container}>{children}</View>;
  }

  const resolveBackground = () => {
    if (typeof background === "string" && background.startsWith("#")) {
      return background;
    }

    switch (background) {
      case "theme":
        return theme.background;

      case "surface":
        return theme.surface;

      case "dark":
        return "rgba(0,0,0,0.9)";

      case "light":
        return "rgba(255,255,255,0.9)";

      case "transparent":
      default:
        return `rgba(0,0,0,${opacity})`;
    }
  };

  return (
    <View style={styles.container}>
      {children}

      <View
        style={[
          styles.overlay,
          {
            backgroundColor: resolveBackground(),
          },
        ]}
        pointerEvents="auto"
      >
        <LottieView
          source={require("../../../assets/animations/bubbles-loading.json")}
          autoPlay
          loop
          style={{ width: size, height: size }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
