import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { useAuth, useTheme } from "../hooks";

import SplashScreen from "../screens/SplashScreen";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WellcomeScreen from "../screens/WellcomeScreen";
import DetailScreen from "../screens/DetailScreen";
import SettingScreen from "../screens/SettingScreen";

import { BottomNavigation } from "./BottomNavigation";

const Stack = createNativeStackNavigator();

export function MainNavigation() {
  const { user, loading } = useAuth();
  const { theme, isDark } = useTheme();

  if (loading) return <SplashScreen />;

  const navigationTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      background: theme.background,
      card: theme.surface,
      text: theme.text,
      border: theme.outline,
      primary: theme.primary,
    },
  };

  return (
    <>
      <StatusBar
        animated
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />

      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {user ? (
            <>
              <Stack.Screen name="main" component={BottomNavigation} />
              <Stack.Screen
                name="detail"
                options={{
                  title: "",
                  headerBackTitle: "Home",
                  headerShown: true,
                }}
                component={DetailScreen}
              />

              <Stack.Screen
                name="setting"
                options={{
                  title: "Configuraciones",
                  headerBackTitle: "Perfil",
                  headerShown: true,
                }}
                component={SettingScreen}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="wellcome" component={WellcomeScreen} />
              <Stack.Screen name="login" component={LoginScreen} />
              <Stack.Screen name="register" component={RegisterScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
