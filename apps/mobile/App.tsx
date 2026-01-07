import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/app/AppNavigator";
import { LocationProvider } from "./src/state/LocationContext";

export default function App() {
  return (
    <LocationProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </LocationProvider>
  );
}
