import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, View } from "native-base";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

import { Button, Header, Link, TextInput } from "../../../components";

export const ConfirmEmail = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { control, handleSubmit, watch } = useForm({
    defaultValues: { email: params?.email },
  });
  const email = watch("email");

  const onConfirmEmail = (data) => {
    console.log({ data });
    navigation.navigate("LogIn", { email });
  };

  const onResendCode = () => {
    console.warn(`Code sent to ${email}`);
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Header style={styles.header} title={"Confirm Email"} />
        <Text style={styles.subHeader}>
          We sent a confirmation code to{" "}
          <Text style={styles.inline}>{params?.email}</Text>
        </Text>
        <TextInput
          email
          control={control}
          label={"Email"}
          name={"email"}
          rules={{ required: "Enter your email" }}
        />
        <TextInput
          control={control}
          name={"confirmation"}
          label={"Confirmation Code"}
          rules={{ required: "Enter confirmation code" }}
        />
        <Button
          style={styles.confirmButton}
          onPress={handleSubmit(onConfirmEmail)}
          text={"Confirm"}
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
  subHeader: {
    color: "#9CA5B4",
  },
  inline: { fontWeight: "700", color: "#9CA5B4" },
  confirmButton: {
    marginTop: 25,
    borderRadius: 2,
    height: 50,
    fontWeight: 700,
    color: "#FFFFFF",
    fontSize: 16,
    backgroundColor: "#03A87C",
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
