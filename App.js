import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { ThemeProvider } from "./src/contexts";
import { TheApp } from "./src";

export default function App() {
  return (
    <ThemeProvider>
      <View style={styles.container}>
        <TheApp />
        <StatusBar style="light" />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
