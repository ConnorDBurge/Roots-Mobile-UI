import { Spinner, Text, View } from "native-base";
import React from "react";

export const LoadingOverlay = ({ text, color }) => {
  return (
    <View
      style={{
        position: "absolute",
        zIndex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.45)",
        }}
      />
      <View
        style={{
          width: "45%",
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          aspectRatio: 1,
          backgroundColor: "#181A1F",
          borderRadius: 10,
          paddingVertical: 40,
        }}
      >
        <Spinner size={"lg"} color={color} />
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 23,
            lineHeight: 25,
            fontWeight: 700,
            marginTop: "auto",
          }}
        >
          {text}
        </Text>
      </View>
    </View>
  );
};
