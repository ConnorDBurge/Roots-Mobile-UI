import { Text, View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

export const Header = ({ title, prompt, link, style }) => {
  return (
    <View style={[styles.container, { ...style }]}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.link}>
        {prompt && <Text style={styles.prompt}>{prompt}</Text>}
        {link && link}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    lineHeight: 25,
    fontSize: 23,
    fontWeight: "700",
  },
  prompt: {
    color: "#9CA5B4",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "right",
  },
  link: {
    flexDirection: "row",
    gap: 5,
  },
});
