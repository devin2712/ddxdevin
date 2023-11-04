import React from "react";

export enum Language {
  en = "en",
  fr = "fr",
}

export type InternationalizationContextType = {
  currentLanguage: Language;
  updateLanguage: (_: Language) => void;
};

const InternationalizationContext = React.createContext<
  InternationalizationContextType
>({
  currentLanguage: Language.en,
  updateLanguage: (_: Language) => {},
});

export default InternationalizationContext;
