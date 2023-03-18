import { useNavigation } from "@react-navigation/native";
import { Text, View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import { Button } from "../../../components";

export const Splash = () => {
  const navigation = useNavigation();

  const onLogIn = () => {
    navigation.navigate("LogIn");
  };

  const onSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Button style={styles.logInButton} onPress={onLogIn} text={"Log In"} />
        <Button
          style={styles.signUpButton}
          onPress={onSignUp}
          text={"Sign Up"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#21252B",
    height: "100%",
  },
  container: {
    marginTop: "auto",
    marginHorizontal: 20,
    marginBottom: 22,
  },
  logInButton: {
    marginTop: 10,
    borderRadius: 2,
    height: 50,
    fontWeight: 700,
    color: "#FFFFFF",
    fontSize: 16,
    backgroundColor: "#0071DF",
  },
  signUpButton: {
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 2,
    height: 50,
    fontWeight: 700,
    color: "#FFFFFF",
    fontSize: 16,
    backgroundColor: "#03A87C",
  },
});
