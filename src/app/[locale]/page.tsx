import { LinkList } from "@/components/ui/LinkList";
import { LinkListSection } from "@/types";
import styles from "./page.module.css";
import { Header } from "@/components/ui/Header";
import { useTranslations } from "next-intl";
import { StyledLink } from "@/components/ui/StyledLink";

export default function Home() {
  const t = useTranslations("home");
  const linkSections: LinkListSection[] = [
    {
      key: "writing",
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
          key: "covid_myturn",
          title: t("links.covid_myturn"),
          content: "2020",
          config: {
            external: false,
            url: "/covid-myturn",
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
        <div className={styles.content}>
          <Header
            as="h1"
            title={<span className={styles.name}>{t("title")}</span>}
            description={
              <span className={styles.title}>{t("description")}</span>
            }
          />
          <section className={styles.intro}>
            <p>
              {t.rich("intro", {
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
              })}
            </p>
            <p>
              {t.rich("background", {
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
            </p>
          </section>
          <LinkList sections={linkSections} />
        </div>
      </main>
    </>
  );
}
