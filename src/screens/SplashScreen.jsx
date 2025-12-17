import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

import { Layout } from "../components/ui";

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Layout alignHorizontal="center" alignVertical="center" fullWidth flex={1}>
        <LottieView
          source={require("../../assets/animations/time-tracker.json")}
          autoPlay
          loop
          style={{ height: 240, width: 240 }}
        />
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Adjust if you have a theme color
  },
});
