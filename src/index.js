import { StyleSheet } from "react-native";
import { View } from "native-base";

import { SignUp } from "./screens";

export const TheApp = () => {
  return (
    <View style={styles.container}>
      <SignUp />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#21252B",
  },
});
