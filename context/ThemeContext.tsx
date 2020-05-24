import React, { useState, useEffect } from "react";

const ThemeContext = React.createContext({
  dark: false,
  toggle: () => {},
});

export interface ThemeProviderProps {
  children: React.ReactNode;
}

// Disable for safari due to safari security limitations
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function isLocalStorageAvailable() {
  var storage;
  try {
    storage = window["localStorage"];
    var x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [dark, setDark] = useState(true);
  const [storageAvailable, setStorageAvailable] = useState(false);

  useEffect(() => {
    setStorageAvailable(isLocalStorageAvailable());

    if (storageAvailable) {
      const lastTheme = window.localStorage.getItem("darkTheme");

      if (lastTheme === "true") {
        setDark(true);
        applyTheme("dark");
      } else {
        setDark(false);
        applyTheme("light");
      }
    } else {
      // initialize with dark mode
      applyTheme("dark");
    }
  }, []);

  const applyTheme = (theme) => {
    const root = document.getElementsByTagName("html")[0];
    root.className = theme;
  };

  const toggle = () => {
    setDark(!dark);
    applyTheme(dark ? "light" : "dark");
    if (storageAvailable) {
      window.localStorage.setItem("darkTheme", String(!dark));
    }
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
