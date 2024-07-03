import { useState, useEffect } from "react";

const useBrowserLocale = () => {
  const [locale, setLocale] = useState("");

  useEffect(() => {
    const browserLocale = navigator?.language || navigator?.languages[0];
    setLocale(browserLocale || 'en-US');
  }, []);

  return locale;
};

export default useBrowserLocale;
