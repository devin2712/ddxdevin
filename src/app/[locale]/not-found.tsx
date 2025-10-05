"use client";

import { Header } from "@/components/ui/Header";
import { useTranslations } from "next-intl";
import styles from "./page.module.css";
import { Button } from "@/components/ui/Button";
import { Arrow } from "@/components/ui/icons/Arrow";
import { useEffect } from "react";

export default function NotFound() {
  const t = useTranslations("notFound");

  useEffect(() => {
    // Apply theme on mount in case the layout's script didn't run
    const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return (
    <>
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>
      <main id="main-content" className={styles.contentContainer}>
        <div className={styles.content}>
        <section className={styles.intro}>
          <Header
            as="h1"
            title={<span className={styles.name}>{t("title")}</span>}
            description={<span className={styles.title}>{t("subtitle")}</span>}
          />
          <p>{t("message")}</p>
          <p className={styles.not_found_return_home}>
            <Button as="link" href="/">
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  textTransform: "uppercase",
                }}
              >
                <Arrow aria-hidden />
                {t("returnHome")}
              </span>
            </Button>
          </p>
        </section>
      </div>
    </main>
    </>
  );
}
