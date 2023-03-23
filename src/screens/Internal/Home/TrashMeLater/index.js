import { Auth } from "aws-amplify";
import { View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { gql, useQuery } from "@apollo/client";

import { Button } from "../../../../components";
import { useAuth } from "../../../../providers";

export const TrashMeLater = () => {
  const { user } = useAuth();

  const onSignUp = async () => {
    await Auth.signOut();
  };

  const onDelete = async () => {
    await Auth.deleteUser(user?.attributes?.email);
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Button
          style={styles.logInButton}
          onPress={onSignUp}
          text={"Log Out"}
        />
        <Button
          style={styles.deleteMeButton}
          onPress={onDelete}
          text={"Delete Me"}
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
    marginTop: 20,
    borderRadius: 2,
    height: 50,
    fontWeight: 700,
    color: "#FFFFFF",
    fontSize: 16,
    backgroundColor: "#03A87C",
  },
  deleteMeButton: {
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 2,
    height: 50,
    fontWeight: 700,
    color: "#FFFFFF",
    fontSize: 16,
    backgroundColor: "#FF7A59",
  },
});
