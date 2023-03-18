import { useNavigation, useRoute } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import { Text, View } from "native-base";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

import { Button, Header, Link, TextInput } from "../../../components";

export const ResetPassword = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { control, handleSubmit, watch } = useForm({
    defaultValues: { email: params?.email },
  });
  const password = watch("password");
  const email = watch("email");

  const onResetPassword = async ({ email, confirmation, password }) => {
    try {
      await Auth.forgotPasswordSubmit(email, confirmation, password);
      navigation.navigate("LogIn", { email });
    } catch (e) {
      Alert.alert("Ooops", e.message);
    }
  };

  const onResendCode = async () => {
    await Auth.forgotPassword(email);
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Header
          style={styles.header}
          title={"Sign Up"}
          prompt={"Already have an account?"}
          link={
            <Link
              style={styles.link}
              text={"Log in"}
              onPress={() => navigation.navigate("LogIn")}
            />
          }
        />
        <TextInput
          control={control}
          label={"Email"}
          email
          name={"email"}
          rules={{
            required: "Enter an email",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Enter a valid email",
            },
          }}
        />
        <TextInput
          control={control}
          name={"confirmation"}
          label={"Confirmation Code"}
          rules={{ required: "Enter confirmation code" }}
        />
        <TextInput
          secure
          control={control}
          name={"password"}
          label={"Password"}
          rules={{
            required: "Choose a password",
            minLength: {
              value: 8,
              message: "Use 8 or more characters",
            },
          }}
        />
        <TextInput
          secure
          control={control}
          name={"confirm_password"}
          label={"Confirm Password"}
          rules={{
            required: "Confirm your password",
            validate: (val) => val === password || "Passwords do not match",
          }}
          helperText={
            "Use 8 or more characters with a mix of letters, numbers, and symbols."
          }
        />
        <Button
          style={styles.resetButton}
          onPress={handleSubmit(onResetPassword)}
          text={"Reset Password"}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "#9CA5B4" }} />
          <Text
            style={{
              width: 165,
              textAlign: "center",
              color: "#9CA5B4",
              marginVertical: 10,
            }}
          >
            Didn't receive a code?
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "#9CA5B4" }} />
        </View>
        <Button
          style={styles.resendCodeButton}
          onPress={onResendCode}
          text={"Resend Code"}
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
  link: { color: "#0071DF", fontWeight: "700", fontSize: 13 },
  resetButton: {
    marginTop: 25,
    borderRadius: 2,
    height: 50,
    fontWeight: 700,
    color: "#FFFFFF",
    fontSize: 16,
    backgroundColor: "#3C4142",
  },
  resendCodeButton: {
    borderRadius: 2,
    height: 50,
    fontWeight: 700,
    color: "#FFFFFF",
    fontSize: 16,
    backgroundColor: "#181A1F",
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
