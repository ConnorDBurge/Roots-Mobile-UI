import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "native-base";
import { StyleSheet } from "react-native";
import React from "react";

import { useAuth } from "../contexts";
import {
  Splash,
  LogIn,
  SignUp,
  ConfirmEmail,
  ForgotPassword,
  ResetPassword,
  Home,
} from "../screens";

export const Navigation = () => {
  const Stack = createStackNavigator();
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <Stack.Screen name="Home" component={Home} />
          ) : (
            <>
              <Stack.Screen name="Splash" component={Splash} />
              <Stack.Screen name="LogIn" component={LogIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
            </>
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
