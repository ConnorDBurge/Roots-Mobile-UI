import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import { Text, View } from "native-base";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert, StyleSheet } from "react-native";

import { Google } from "../../../../assets/google";
import { Button, Checkbox, Header, Link, TextInput } from "../../../components";

export const SignUp = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, watch } = useForm();
  const password = watch("password");

  const onSignUp = async ({ first_name, email, password }) => {
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: { given_name: first_name, email },
      });
      navigation.navigate("ConfirmEmail", { email });
    } catch (e) {
      Alert.alert("Ooops", e.message);
    }
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
        <TextInput control={control} label={"First Name"} name={"first_name"} />
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
        <Checkbox
          control={control}
          name={"terms"}
          label={
            <Text style={styles.checkboxLabel}>
              I agree to the{" "}
              <Link style={styles.inlineLink} text={"Terms"} href="/" /> and{" "}
              <Link
                style={styles.inlineLink}
                text={"Privacy Policy"}
                href="/"
              />
            </Text>
          }
          style={styles.checkbox}
          rules={{ required: true }}
        />
        <Checkbox
          control={control}
          name={"subscribe"}
          label={
            <Text style={styles.checkboxLabel}>
              Subscribe for select product updates.
            </Text>
          }
          style={{
            marginTop: 15,
            fillColor: "#03A87C",
            borderColor: "#5E656F",
          }}
        />
        <Button
          style={styles.signUpButton}
          onPress={handleSubmit(onSignUp)}
          text={"Sign Up"}
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
          onPress={() => console.warn("Google Sign Up")}
          text={"Sign Up with Google"}
          icon={<Google />}
        />
        <Text style={styles.prompt}>
          Already have an account?
          <Link
            style={styles.accountLink}
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
  checkboxLabel: {
    color: "#9CA5B4",
  },
  inlineLink: { fontWeight: "700", color: "#9CA5B4" },
  link: { color: "#0071DF", fontWeight: "700", fontSize: 13 },
  checkbox: {
    marginTop: 20,
    fillColor: "#03A87C",
    borderColor: "#5E656F",
  },
  signUpButton: {
    marginTop: 25,
    borderRadius: 2,
    height: 50,
    fontWeight: 700,
    color: "#FFFFFF",
    fontSize: 16,
    backgroundColor: "#03A87C",
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
    color: "#0071DF",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 2,
  },
});
