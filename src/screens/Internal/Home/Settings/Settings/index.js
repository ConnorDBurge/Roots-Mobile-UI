import { useNavigation } from "@react-navigation/native";
import { Text, View, ScrollView } from "native-base";
import * as Haptics from "expo-haptics";
import React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

export const Main = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView>
        <View style={styles.title}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            onPressIn={() =>
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            }
          >
            <Text style={styles.text}>Go Back</Text>
          </TouchableOpacity>
          <Text style={styles.text}>Settings</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Main2")}
          onPressIn={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          }
        >
          <Text style={styles.text}>Main 2</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#21252B",
    height: "100%",
  },
  text: {
    color: "#FFFFFF",
  },
});
