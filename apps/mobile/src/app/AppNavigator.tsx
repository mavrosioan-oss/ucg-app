import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import TermsScreen from "../screens/TermsScreen";
import LocationScreen from "../screens/LocationScreen";
import HomeScreen from "../screens/HomeScreen";

export type RootStackParamList = {
  Splash: undefined;
  Terms: undefined;
  Location: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
      <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
