import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider, ThemeProvider, ToastProvider } from "./src/providers";
import { MainNavigation } from "./src/navigations/MainNavigation";

export default function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <AuthProvider>
          <ThemeProvider>
            <ToastProvider>
              <MainNavigation />
            </ToastProvider>
          </ThemeProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
