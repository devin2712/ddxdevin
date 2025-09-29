"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const clockComponent = React.useMemo(() => (
    <Clock label="NYC" labelAlign={isMobile ? "left" : "right"} />
  ), [isMobile]);

  const themeToggleComponent = React.useMemo(() => <ThemeToggle />, []);

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
          {isMobile && (
            <div className={styles.mobileControlPanel}>
              {clockComponent}
              {themeToggleComponent}
            </div>
          )}
        </aside>
        <main id="main-content" className={styles.content}>
          {!isMobile && (
            <div className={styles.controlPanel}>
              {clockComponent}
              {themeToggleComponent}
            </div>
          )}
          <div className={styles.header}>
            <Header {...header} />
          </div>
          <div className={styles.mainContent}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

PageLayout.displayName = "PageLayout";