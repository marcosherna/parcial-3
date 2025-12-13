import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WellcomeScreen from "../screens/WellcomeScreen";

import { BottomNavigation } from "./BottomNavigation";

const Stack = createNativeStackNavigator();

export function MainNavigation() {
  return (
    <>
      <StatusBar animated />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="wellcome" component={WellcomeScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="register" component={RegisterScreen} />
          <Stack.Screen name="main" component={BottomNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
