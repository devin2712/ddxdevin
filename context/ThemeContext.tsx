import React, { useState, useEffect } from "react";

const ThemeContext = React.createContext({
  dark: false,
  toggle: () => {},
});

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const lastTheme = window.localStorage.getItem("darkTheme");

    if (lastTheme === "true") {
      setDark(true);
      applyTheme("dark");
    } else {
      setDark(false);
      applyTheme("light");
    }
  });

  const applyTheme = (theme) => {
    const root = document.getElementsByTagName("html")[0];
    root.className = theme;
  };

  const toggle = () => {
    setDark(!dark);
    window.localStorage.setItem("darkTheme", String(!dark));
  };

  return (
    <ThemeContext.Provider
      value={{
        dark,
        toggle,
      }}
    >
      {children ? children : null}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
