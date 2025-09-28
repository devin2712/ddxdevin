import { Header } from "@/components/ui/Header";
import { useTranslations } from "next-intl";
import styles from "./page.module.css";
import { Button } from "@/components/ui/Button";
import { Arrow } from "@/components/ui/Arrow";

export default function NotFound() {
  const t = useTranslations("notFound");

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
                <Arrow aria-hidden="true" />
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
