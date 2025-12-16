import React, { memo, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useTheme } from "../../hooks/useTheme";

const SPRING_CONFIG = {
  damping: 18,
  stiffness: 220,
  mass: 0.7,
};

export const Card = memo(
  ({
    style,
    backgroundColor,
    borderRadius = 14,
    children,
    onPress,
    onLongPress,
    scaleEffect = true,
    pressable = true,
  }) => {
    const { theme } = useTheme();
    const scale = useSharedValue(1);

    const handlePress = useCallback(() => {
      if (onPress) onPress();
    }, [onPress]);

    const handleLongPress = useCallback(() => {
      if (onLongPress) onLongPress();
    }, [onLongPress]);

    const tapGesture = Gesture.Tap()
      .enabled(pressable)
      .maxDuration(200)
      .onBegin(() => {
        if (scaleEffect) {
          scale.value = withSpring(0.96, SPRING_CONFIG);
        }
      })
      .onFinalize(() => {
        if (scaleEffect) {
          scale.value = withSpring(1, SPRING_CONFIG);
        }
      })
      .onEnd((_event, success) => {
        if (success && onPress) {
          runOnJS(handlePress)();
        }
      });

    const longPressGesture = Gesture.LongPress()
      .enabled(pressable && !!onLongPress)
      .minDuration(400)
      .onStart(() => {
        if (scaleEffect) {
          scale.value = withSpring(0.95, SPRING_CONFIG);
        }
      })
      .onEnd((_event, success) => {
        if (success && onLongPress) {
          runOnJS(handleLongPress)();
        }
        if (scaleEffect) {
          scale.value = withSpring(1, SPRING_CONFIG);
        }
      });

    const gesture = Gesture.Exclusive(longPressGesture, tapGesture);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const CardContent = (
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: backgroundColor ?? theme.surface,
            borderRadius,
            shadowColor: theme.shadow ?? "#000",
          },
          animatedStyle,
          style,
        ]}
      >
        <View style={styles.inner}>{children}</View>
      </Animated.View>
    );

    if (!pressable) {
      return CardContent;
    }

    return <GestureDetector gesture={gesture}>{CardContent}</GestureDetector>;
  }
);

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    alignSelf: "stretch",
    marginVertical: 6,
  },
  inner: {
    width: "100%",
  },
});
