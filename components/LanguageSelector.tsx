import React, { useContext } from "react";
import { useIntl } from "react-intl";
import styles from "./LanguageSelector.module.css";

import InternationalizationContext, {
  Language,
} from "../context/InternationalizationContext";

export const LanguageSelector = () => {
  const { formatMessage } = useIntl();
  const { currentLanguage, updateLanguage } = useContext(
    InternationalizationContext
  );

  return (
    <>
      <hr className={styles.hr} />
      <ul className={styles.languages}>
        {Object.keys(Language).map((languageOption) => (
          <li
            key={languageOption}
            className={
              currentLanguage == languageOption ? styles.active : undefined
            }
          >
            <button
              aria-label={formatMessage(
                {
                  id: "ddxdevin.languages.change",
                },
                {
                  language: formatMessage({
                    id: `ddxdevin.languages.${languageOption}`,
                  }),
                }
              )}
              className={styles.languageOption}
              onClick={() => updateLanguage(languageOption as Language)}
            >
              {formatMessage({ id: `ddxdevin.languages.${languageOption}` })}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
