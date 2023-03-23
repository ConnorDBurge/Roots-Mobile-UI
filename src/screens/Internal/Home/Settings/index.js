import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { Main } from "./Settings";

export const SettingsStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main1"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Main2" component={Main} />
    </Stack.Navigator>
  );
};
