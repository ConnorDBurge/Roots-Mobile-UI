import { Link as _Link } from "native-base";
import React from "react";

export const Link = ({ style, href, text }) => {
  return (
    <_Link href={href} _text={{ ...style }}>
      {text}
    </_Link>
  );
};
