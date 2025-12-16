import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";

import { Label } from "./Label";
import { spacing } from "../../resources/spacing";

export function LoadingTemplate({
  message = "Cargando...",
  size = 80,
  hasMessage,
}) {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../../assets/animations/bubbles-loading.json")}
        autoPlay
        loop
        style={{
          ...styles.animation,
          height: size,
          width: size,
        }}
      />
      {hasMessage && <Label color="gray">{message}</Label>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.md,
  },
  animation: {
    width: 100,
    height: 100,
  },
});
