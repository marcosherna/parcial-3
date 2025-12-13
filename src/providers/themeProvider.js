import React from "react";
import { darkColors, lightColors } from "../resources/color";
import { ThemeContext } from "../contexts/themeContext";

export const ThemeProvider = ({ children }) => {
  const [mode, setModeState] = React.useState("light");
  const [theme, setTheme] = React.useState(lightColors);
  const [isDark, setIsDark] = React.useState(false);

  const applyTheme = async (newMode) => {
    setModeState(newMode);
    const mode = newMode === "dark";

    setIsDark(mode);
    setTheme(mode ? darkColors : lightColors);
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, isDark, setMode: applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
