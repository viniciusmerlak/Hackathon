// AppNavigator.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from ".";
import MappingScreen from "./MappingScreen"; // Importe a tela de mapeamento

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Mapping" component={MappingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;