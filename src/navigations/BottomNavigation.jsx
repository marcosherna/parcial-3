import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, User, Bot } from "lucide-react-native";

import HomeScreen from "../screens/tabs/HomeScreen";
import ProfileScreen from "../screens/tabs/ProfileScreen";
import ChatScreen from "../screens/ChatScreen";

const Tab = createBottomTabNavigator();

export function BottomNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Bot color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
