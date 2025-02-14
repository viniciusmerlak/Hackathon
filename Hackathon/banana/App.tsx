import React from "react";
import { createStaticNavigation, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "./screens/MapScreen";
import RelatorioScreen from "./screens/RelatorioScreen"; // Certifique-se de importar corretamente a tela

const Stack = createStackNavigator();
 
  
const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MapScreen">
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="RelatorioScreen" component={RelatorioScreen} /> {/* Nome exato da tela */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
