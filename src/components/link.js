import { Link as _Link } from "native-base";
import React from "react";

export const Link = ({ style, onPress, text }) => {
  return (
    <_Link onPress={onPress} _text={{ ...style }}>
      {text}
    </_Link>
  );
};
