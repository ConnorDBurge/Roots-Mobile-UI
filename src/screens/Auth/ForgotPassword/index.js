import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, View } from "native-base";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

import { Button, Header, Link, TextInput } from "../../../components";

export const ForgotPassword = () => {
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();

  const onSendCode = (data) => {
    console.log({ data });
    navigation.navigate("ResetPassword", { email: data?.email });
  };

  return (
    <View style={styles.page}>
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
