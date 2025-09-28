import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Arrow } from "@/components/ui/Arrow";
import { Header, HeaderProps } from "@/components/ui/Header";
import styles from "./PageLayout.module.css";

type PageLayoutProps = {
  header: Omit<HeaderProps, "className">;
  children: React.ReactNode;
  size?: "regular" | "xlarge";
}

export const PageLayout: React.FC<PageLayoutProps> = ({ header, children, size = "regular" }) => {
  const t = useTranslations("common");

  return (
    <div className={styles.container}>
      <a href="#main-content" className={styles.skipLink}>
        {t("skipToContent")}
      </a>
      <div className={`${styles.layout} ${size === "xlarge" ? styles.layoutXlarge : ""}`}>
        <aside className={styles.sidebar}>
          <Button as="link" href="/">
            <span className={styles.buttonContent}>
              <Arrow aria-hidden />
              {t("index")}
            </span>
          </Button>
        </aside>
        <main id="main-content" className={styles.content}>
          <div className={styles.header}>
            <Header {...header} />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

PageLayout.displayName = "PageLayout";