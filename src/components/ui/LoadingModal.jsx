import React, { useEffect } from "react";
import {
  Modal,
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

import { spacing } from "../../resources/spacing";
import {
  fontSizes,
  fontWeights,
  lineHeights,
} from "../../resources/typography";

import { useTheme } from "../../hooks/useTheme";

export function LoadingModal({
  visible,
  text = "Cargando...",
  backgroundColor,
  spinnerColor,
  spinnerSize = "large",
  opacity = 0.4,
  disabled = true,
  style,
}) {
  const { theme, isDark } = useTheme();

  const effectiveBackground =
    backgroundColor ??
    (isDark ? "rgba(30,41,59,0.85)" : "rgba(255,255,255,0.75)");

  const effectiveSpinnerColor = spinnerColor ?? theme.primary;

  const scale = useSharedValue(0.9);

  useEffect(() => {
    scale.value = withTiming(visible ? 1 : 0.9, {
      duration: visible ? 250 : 200,
      easing: visible ? Easing.out(Easing.ease) : Easing.in(Easing.ease),
    });
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback
        onPress={() => !disabled && console.log("Overlay pressed")}
      >
        <View
          style={[
            styles.overlay,
            { backgroundColor: `rgba(0,0,0,${opacity})` },
          ]}
        >
          <Animated.View
            entering={FadeIn.duration(250)}
            exiting={FadeOut.duration(150)}
            style={[
              styles.container,
              animatedStyle,
              {
                backgroundColor: effectiveBackground,
                borderColor: isDark ? "#334155" : "rgba(255,255,255,0.3)",
                shadowColor: isDark ? "#000" : "#111827",
              },
              style,
            ]}
          >
            <ActivityIndicator
              size={spinnerSize}
              color={effectiveSpinnerColor}
            />

            {text ? (
              <Text
                style={[
                  styles.text,
                  {
                    color: theme.text,
                    fontSize: fontSizes.md,
                    lineHeight: lineHeights.md,
                    fontWeight: fontWeights.medium,
                  },
                ]}
              >
                {text}
              </Text>
            ) : null}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  text: {
    textAlign: "center",
    opacity: 0.9,
  },
});
