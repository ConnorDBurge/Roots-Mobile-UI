import React from "react";

import { NativeBaseProvider, extendTheme } from "native-base";

export const ThemeProvider = ({ children }) => {
  const theme = extendTheme({
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      // Greys
      grey: {
        primary: "#21252B",
        midnight: "#181A1F",
        slate: "#9CA5B4",
      },
      // Reds
      red: {
        primary: "#FF7A59",
      },
      // Blues
      blue: {
        primary: "#0071DF",
      },
      // Greens
      green: {
        primary: "#03A87C",
      },
    },
  });

  return <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>;
};
