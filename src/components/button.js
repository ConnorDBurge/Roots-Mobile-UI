import * as Haptics from "expo-haptics";
import { Box, Button as _Button } from "native-base";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const Button = ({ text, onPress, style, icon }) => {
  return (
    <TouchableOpacity>
      {icon && <Box style={styles.icon}>{icon}</Box>}
      <_Button
        style={style}
        onTouchStart={() =>
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        }
        onPress={onPress}
      >
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
    </TouchableOpacity>
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
