import React from "react";
import { StyleSheet, Text } from "react-native";

export const Button = ({ text, onPress, style }) => {
  return (
    <Button style={styles.button} onPress={onPress}>
      <Text
        style={{
          fontWeight: style?.fontWeight,
          color: style?.color,
          fontSize: style?.fontSize,
        }}
      >
        {text}
      </Text>
    </Button>
  );
};

const styles = StyleSheet.create({});
