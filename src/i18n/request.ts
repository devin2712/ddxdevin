import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// Dynamic import function for loading only the requested locale
async function loadMessages(locale: string) {
  try {
    const messages = await import(`../../messages/${locale}.json`);
    return messages.default;
  } catch {
    // Fallback to default locale if the requested locale file doesn't exist
    console.warn(`Failed to load messages for locale "${locale}", falling back to default locale`);
    const fallbackMessages = await import(`../../messages/${routing.defaultLocale}.json`);
    return fallbackMessages.default;
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
  };
});
