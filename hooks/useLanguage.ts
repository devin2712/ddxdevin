import { useState, useEffect } from "react";
import { Language } from "../context/InternationalizationContext";

const DDXDEVIN_LANGUAGE_KEY = "ddxdevin.languagePreference";
const DEFAULT_LANGUAGE = Language.en;

const getStoredLanguage = (): Language => {
  if (typeof window !== "undefined") {
    const savedLanguage = localStorage.getItem(
      DDXDEVIN_LANGUAGE_KEY
    ) as Language;

    return savedLanguage !== null ? savedLanguage : DEFAULT_LANGUAGE;
  }

  return DEFAULT_LANGUAGE;
};

// Use Local Storage to persist language preferences
export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    return getStoredLanguage();
  });

  useEffect(() => {
    localStorage.setItem(DDXDEVIN_LANGUAGE_KEY, language);
  }, [language]);

  return [language, setLanguage] as const;
};
