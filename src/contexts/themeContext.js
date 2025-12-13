import React from "react";
import { lightColors } from "../resources/color";

export const ThemeContext = React.createContext({
  theme: lightColors,
  mode: "system",
  setMode: () => {},
  isDark: false,
});
