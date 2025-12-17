import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { AuthProvider, ThemeProvider, ToastProvider } from "./src/providers";
import { MainNavigation } from "./src/navigations/MainNavigation";

export default function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <AuthProvider>
          <ThemeProvider>
            <BottomSheetModalProvider>
              <ToastProvider>
                <KeyboardProvider>
                  <MainNavigation />
                </KeyboardProvider>
              </ToastProvider>
            </BottomSheetModalProvider>
          </ThemeProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
