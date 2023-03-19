import { Link as _Link } from "native-base";
import * as Haptics from "expo-haptics";
import React from "react";

export const Link = ({ style, onPress, text }) => {
  return (
    <_Link
      onPress={onPress}
      onTouchStart={() =>
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      }
      _text={{ ...style }}
    >
      {text}
    </_Link>
  );
};
