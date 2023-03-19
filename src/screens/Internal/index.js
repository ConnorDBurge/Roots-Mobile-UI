import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { Home } from "./Home";

export const AppStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
