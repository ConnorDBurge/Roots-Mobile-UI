import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { ConfirmEmail } from "./ConfirmEmail";
import { ForgotPassword } from "./ForgotPassword";
import { LogIn } from "./LogIn";
import { ResetPassword } from "./ResetPassword";
import { SignUp } from "./SignUp";
import { Splash } from "./Splash";

export const AuthStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};
