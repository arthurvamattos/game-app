import React, { createContext, useCallback, useContext } from "react";
import { DefaultTheme } from "styled-components";

import usePersistedState from "../utils/usePersistedState";

import light from "../styles/themes/light";
import dark from "../styles/themes/dark";

interface ThemeContextData {
  theme: DefaultTheme;
  toggleTheme: Function;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>("theme", light);

  const toggleTheme = useCallback(() => {
    setTheme(theme.title === "dark" ? light : dark);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}
