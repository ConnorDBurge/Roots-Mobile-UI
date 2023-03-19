import React from "react";
import * as Haptics from "expo-haptics";
import { StyleSheet } from "react-native";
import { Box, Text } from "native-base";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Controller } from "react-hook-form";
import { isEmpty } from "lodash";

export const Checkbox = ({ control, style, name, label, rules }) => {
  return (
    <Box style={[styles.container, { ...style }]}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Box
            style={styles.checkbox}
            onTouchStart={() =>
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            }
          >
            <BouncyCheckbox
              size={20}
              fillColor={style?.fillColor}
              iconStyle={{
                borderRadius: 2,
              }}
              innerIconStyle={{
                borderRadius: 2,
                borderColor: isEmpty(error)
                  ? value
                    ? style?.fillColor
                    : style?.borderColor
                  : "#FF7A59",
              }}
              onPress={onChange}
            />
            {label && label}
            {rules?.required && <Text style={styles.required}>•</Text>}
          </Box>
        )}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {},
  checkbox: {
    flexDirection: "row",
  },
  required: {
    color: "#FF7A59",
    marginLeft: 2,
  },
});
