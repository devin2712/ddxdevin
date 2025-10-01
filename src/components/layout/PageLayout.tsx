"use client";

import React, { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Arrow } from "@/components/ui/icons/Arrow";
import { Header, HeaderProps } from "@/components/ui/Header";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import styles from "./PageLayout.module.css";
import { Clock } from "../ui/Clock";

type PageLayoutProps = {
  header: Omit<HeaderProps, "className">;
  children: React.ReactNode;
  size?: "regular" | "xlarge";
}

export const PageLayout: React.FC<PageLayoutProps> = ({ header, children, size = "regular" }) => {
  const t = useTranslations("common");
  const skipLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Prevent skip link from being focused on page load/navigation
    const skipLink = skipLinkRef.current;
    if (skipLink) {
      skipLink.tabIndex = -1;
      // Restore normal tab behavior after a short delay
      const timer = setTimeout(() => {
        skipLink.tabIndex = 0;
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className={styles.container}>
      <a href="#main-content" className={styles.skipLink} ref={skipLinkRef}>
        {t("skipToContent")}
      </a>
      <div
        className={`${styles.layout} ${
          size === "xlarge" ? styles.layoutXlarge : ""
        }`}
      >
        <aside className={styles.sidebar}>
          <Button as="link" href="/">
            <span className={styles.buttonContent}>
              <Arrow aria-hidden />
              {t("index")}
            </span>
          </Button>
        </aside>
        <div className={styles.topRegion}>
          <div className={styles.controlPanel}>
            <Clock label="NYC" />
            <ThemeToggle />
          </div>
          <div className={styles.header}>
            <Header {...header} />
          </div>
        </div>
        <main id="main-content" className={styles.content}>
          <div className={styles.mainContent}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

PageLayout.displayName = "PageLayout";
