import { useNavigation, useRoute } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import * as Haptics from "expo-haptics";
import { Text, View } from "native-base";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, StyleSheet } from "react-native";
import * as Linking from "expo-linking";

import { Google } from "../../../../assets/google";
import {
  Button,
  Header,
  Link,
  LoadingOverlay,
  TextInput,
} from "../../../components";

export const LogIn = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: { email: params?.email },
  });

  const onLogIn = async ({ email, password }) => {
    if (loading) return;
    setLoading(true);
    try {
      await Auth.signIn(email, password);
      Haptics.notificationAsync();
    } catch (e) {
      Alert.alert(e.message);
      if (e.name === "UserNotConfirmedException") {
        await Auth.resendSignUp(email);
        navigation.navigate("ConfirmEmail", { email });
      }
    }
    setLoading(false);
  };

  const loginWithGoogle = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await Auth.federatedSignIn(
        { provider: "Google" },
        {
          redirectSignIn: Linking.createURL("/"),
          redirectSignOut: Linking.createURL("/"),
        }
      );
      Haptics.notificationAsync();
    } catch (e) {
      Alert.alert(e.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.page}>
      {loading && <LoadingOverlay color={"#0071DF"} text={"Logging In"} />}
      <View style={styles.container}>
        <Header
          style={styles.header}
          title={"Log In"}
          prompt={"Don't have an account?"}
          link={
            <Link
              style={styles.link}
              text={"Sign Up"}
              onPress={() => navigation.navigate("SignUp")}
            />
          }
        />
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
        />
        <TextInput
          secure
          control={control}
          name={"password"}
          label={"Password"}
          rules={{
            required: "Enter your password",
          }}
        />
        <Link
          style={styles.inlineLink}
          text={"Forgot your password?"}
          onPress={() => navigation.navigate("ForgotPassword")}
        />
        <Button
          style={styles.logInButton}
          onPress={handleSubmit(onLogIn)}
          text={"Log In"}
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
              width: 50,
              textAlign: "center",
              color: "#9CA5B4",
              marginVertical: 10,
            }}
          >
            or
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "#9CA5B4" }} />
        </View>
        <Button
          style={styles.googleButton}
          onPress={loginWithGoogle}
          text={"Log In with Google"}
          icon={<Google />}
        />
        <Text style={styles.prompt}>
          Don't have an account?
          <Link
            style={styles.accountLink}
            text={"Sign Up"}
            onPress={() => navigation.navigate("SignUp")}
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
  inlineLink: {
    fontWeight: "700",
    color: "#9CA5B4",
    marginVertical: 20,
    marginLeft: "auto",
  },
  link: { color: "#03A87C", fontWeight: "700", fontSize: 13 },
  checkbox: {
    marginTop: 20,
    fillColor: "#03A87C",
    borderColor: "#5E656F",
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
  googleButton: {
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
  accountLink: {
    color: "#03A87C",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 2,
  },
});
