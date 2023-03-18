import { Button as _Button, Box } from "native-base";
import React from "react";
import { StyleSheet, Text } from "react-native";

export const Button = ({ text, onPress, style, icon }) => {
  return (
    <Box style={styles.button}>
      {icon && <Box style={styles.icon}>{icon}</Box>}
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
    </Box>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    zIndex: 10,
    top: 15,
    left: 15,
  },
});
