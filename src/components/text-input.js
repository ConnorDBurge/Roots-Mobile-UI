import {
  Box,
  FormControl,
  Input,
  WarningOutlineIcon,
  Text,
  Pressable,
  Icon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Controller } from "react-hook-form";
import { isEmpty } from "lodash";

export const TextInput = ({
  label,
  style,
  helperText,
  secure,
  name,
  control,
  rules = {},
}) => {
  const [show, setShow] = useState(false);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
    label: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 5,
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 4,
    },
    input: {
      width: "100%",
      height: 50,
      borderRadius: 2,
      color: "#FFFFFF",
    },
    required: {
      color: "#FF7A59",
      marginLeft: 2,
    },
    error: {
      color: "#FF7A59",
      borderColor: "#FF7A59",
    },
  });

  return (
    <Box style={[styles.container, { ...style }]}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <FormControl isInvalid={!isEmpty(error)} w="100%">
              <Box style={styles.label}>
                {label && (
                  <FormControl.Label>
                    <Text style={{ color: "#9CA5B4" }}>{label}</Text>
                    {rules?.required && <Text style={styles.required}>*</Text>}
                  </FormControl.Label>
                )}
                <FormControl.ErrorMessage
                  _text={styles.error}
                  rightIcon={
                    <WarningOutlineIcon size="xs" style={styles.error} />
                  }
                >
                  {error?.message || "Error"}
                </FormControl.ErrorMessage>
              </Box>
              <Input
                _invalid={styles.error}
                style={styles.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                borderRadius="2"
                focusOutlineColor="#FFFFFF"
                _focus={{
                  backgroundColor: "none",
                  caretHidden: true,
                }}
                borderColor="#5E656F"
                keyboardAppearance="dark"
                textContentType="oneTimeCode"
                type={secure ? (show ? "text" : "password") : undefined}
                InputRightElement={
                  secure ? (
                    <Pressable onPress={() => setShow(!show)}>
                      <Icon
                        as={
                          <MaterialIcons
                            name={show ? "visibility" : "visibility-off"}
                          />
                        }
                        size={5}
                        mr="4"
                        color={show ? "#9CA5B4" : "#FFFFFF"}
                      />
                    </Pressable>
                  ) : undefined
                }
              />
              <FormControl.HelperText>{helperText}</FormControl.HelperText>
            </FormControl>
          </TouchableWithoutFeedback>
        )}
      />
    </Box>
  );
};
