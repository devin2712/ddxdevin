import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["de", "en", "es", "fr", "hi", "ko", "vi", "zh"],

  // Used when no locale matches
  defaultLocale: "en",
});
