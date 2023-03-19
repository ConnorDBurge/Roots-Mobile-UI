import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import * as Haptics from "expo-haptics";
import { Text, View } from "native-base";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Alert } from "react-native";

import {
  Button,
  Header,
  Link,
  TextInput,
  LoadingOverlay,
} from "../../../components";

export const ForgotPassword = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm();

  const onSendCode = async ({ email }) => {
    if (loading) return;
    setLoading(true);
    try {
      await Auth.forgotPassword(email);
      Haptics.notificationAsync();
      navigation.navigate("ResetPassword", { email });
    } catch (e) {
      Alert.alert(e.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.page}>
      {loading && <LoadingOverlay color={"#3C4142"} text={"Sending Code"} />}
      <View style={styles.container}>
        <Header style={styles.header} title={"Forgot Password"} />
        <TextInput
          control={control}
          email
          label={"Email"}
          name={"email"}
          rules={{
            required: "Enter your email",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Enter a valid email",
            },
          }}
          helperText={"We will send a confirmation code to your email"}
        />
        <Button
          style={styles.sendCodeButton}
          onPress={handleSubmit(onSendCode)}
          text={"Send Code"}
        />
        <Text style={styles.prompt}>
          Already have an account?
          <Link
            style={styles.logInLink}
            text={"Log in"}
            onPress={() => navigation.navigate("LogIn")}
          />
        </Text>
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
    marginTop: 60,
    marginHorizontal: 20,
    marginBottom: 22,
  },
  header: {
    marginBottom: 15,
  },
  subHeader: {
    color: "#9CA5B4",
  },
  sendCodeButton: {
    marginTop: 25,
    borderRadius: 2,
    height: 50,
    fontWeight: 700,
    color: "#FFFFFF",
    fontSize: 16,
    backgroundColor: "#3C4142",
  },
  prompt: {
    marginTop: 25,
    color: "#9CA5B4",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  logInLink: {
    color: "#0071DF",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 2,
  },
});
