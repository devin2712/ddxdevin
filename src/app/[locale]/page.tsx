import { LinkList } from "@/components/ui/LinkList";
import { LinkListSection } from "@/types";
import styles from "./page.module.css";
import { Header } from "@/components/ui/Header";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { StyledLink } from "@/components/ui/StyledLink";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Clock } from "@/components/ui/Clock";
import { PageAnimations } from "@/components/ui/PageAnimations";
import { AnimatedList } from "@/components/ui/AnimatedList";
import { ReactNode, Children } from "react";

// Wrapper component to render raw translated strings within <span>s
const TranslatedStrings = ({ children }: { children: ReactNode }) => {
  return Children.map(children, (child) => {
    if (typeof child === 'string') {
      return <span className={styles.introText}>{child}</span>;
    }
    return child;
  });
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  
  const linkSections: LinkListSection[] = [
    {
      key: "writing",
      className: styles.fadeInUpSection,
      title: t("sections.writing"),
      links: [
        {
          key: "ca_wildfire_mcp",
          title: t("links.ca_wildfire_mcp"),
          content: "2025",
          config: {
            external: false,
            url: "/mcp-wildfire",
          },
        },
        {
          key: "bauhaus",
          title: t("links.bauhaus"),
          content: "2024",
          config: {
            external: false,
            url: "/bauhaus",
          },
        },
        {
          key: "covid_appointments",
          title: t("links.covid_appointments"),
          content: "2020",
          config: {
            external: false,
            url: "/covid-appointments",
          },
        },
        {
          key: "covid_myturn",
          title: t("links.covid_myturn"),
          content: "2020",
          config: {
            external: false,
            url: "/covid-myturn",
          },
        },
        {
          key: "concerts",
          title: t("links.concerts"),
          content: t("links.live"),
          config: {
            external: false,
            url: "/concerts",
          },
        },
      ],
    },
    {
      key: "photography",
      className: styles.fadeInUpSection,
      title: t("sections.photography"),
      links: [
        {
          key: "se1",
          title: t("links.se1"),
          content: "2020",
          config: {
            external: false,
            url: "/se1",
          },
        },
        {
          key: "bauhaus",
          title: t("links.bauhaus_photo"),
          content: "2019",
          config: {
            external: false,
            url: "/bauhauslers",
          },
        },
        {
          key: "la_main_ouverte",
          title: t("links.la_main_ouverte"),
          content: "2018",
          config: {
            external: false,
            url: "/la-main-ouverte",
          },
        },
      ],
    },
    {
      key: "connect",
      className: styles.fadeInUpSection,
      title: t("sections.connect"),
      links: [
        {
          key: "linkedin",
          title: t("links.linkedin"),
          content: "@devinnguyen",
          config: {
            external: true,
            url: "https://www.linkedin.com/in/devinnguyen/",
          },
        },
        {
          key: "github",
          title: t("links.github"),
          content: "@devin2712",
          config: {
            external: true,
            url: "https://github.com/devin2712",
          },
        },
        {
          key: "discogs",
          title: t("links.discogs"),
          content: "@devin2712",
          config: {
            external: true,
            url: "https://discogs.com/user/devin2712/collection",
          },
        },
      ],
    },
  ];

  return (
    <>
      <main id="main-content" className={styles.contentContainer}>
        <PageAnimations>
          <div className={styles.content}>
            <div className={`${styles.controlPanel} ${styles.fadeInSection}`}>
              <Clock label="NYC" />
              <ThemeToggle />
            </div>
            <div
              className={styles.fadeInUpSection}
              style={{ animationDelay: "0s" }}
            >
              <Header
                as="h1"
                title={<span className={styles.name}>{t("title")}</span>}
                description={
                  <span className={styles.title}>{t("description")}</span>
                }
              />
            </div>
            <section className={styles.intro}>
              <AnimatedList baseDelay={24} stagger={32} className={styles.fadeInUpSection}>
                <p>
                  <TranslatedStrings>
                    {t.rich("intro", {
                      tennr: (chunks) => (
                        <StyledLink
                          href="https://www.tennr.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${chunks} (opens in new tab)`}
                          showArrow={false}
                        >
                          {chunks}
                        </StyledLink>
                      ),
                    })}
                  </TranslatedStrings>
                </p>
                <p>
                  <TranslatedStrings>
                    {t.rich("previously", {
                      aidkit: (chunks) => (
                        <StyledLink
                          href="https://www.aidkit.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${chunks} (opens in new tab)`}
                          showArrow={false}
                        >
                          {chunks}
                        </StyledLink>
                      ),
                      hypr: (chunks) => (
                        <StyledLink
                          href="https://www.hypr.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${chunks} (opens in new tab)`}
                          showArrow={false}
                        >
                          {chunks}
                        </StyledLink>
                      ),
                    })}
                  </TranslatedStrings>
                </p>
                <p>
                  <TranslatedStrings>
                    {t.rich("before", {
                      cloudhealth: (chunks) => (
                        <StyledLink
                          href="https://www.cloudhealthtech.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${chunks} (opens in new tab)`}
                          showArrow={false}
                        >
                          {chunks}
                        </StyledLink>
                      ),
                      vmware: (chunks) => (
                        <StyledLink
                          href="https://www.vmware.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${chunks} (opens in new tab)`}
                          showArrow={false}
                        >
                          {chunks}
                        </StyledLink>
                      ),
                    })}
                  </TranslatedStrings>
                </p>
              </AnimatedList>
            </section>
            <LinkList sections={linkSections} />
          </div>
        </PageAnimations>
      </main>
    </>
  );
}
