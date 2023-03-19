import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import { useAuth } from "../providers";
import { AuthStack } from "./Auth";
import { AppStack } from "./Internal";

export const Navigation = () => {
  const Stack = createStackNavigator();
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <Stack.Screen name="AppStack" component={AppStack} />
          ) : (
            <Stack.Screen name="AuthStack" component={AuthStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
