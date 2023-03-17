import { Button as _Button } from "native-base";
import React from "react";
import { StyleSheet, Text } from "react-native";

export const Button = ({ text, onPress, style }) => {
  return (
    <_Button style={style} onPress={onPress}>
      <Text
        style={{
          fontWeight: style?.fontWeight,
          color: style?.color,
          fontSize: style?.fontSize,
        }}
      >
        {text}
      </Text>
    </_Button>
  );
};

const styles = StyleSheet.create({});
