import Head from "next/head";
import { useIntl } from "react-intl";

import Layout from "../components/Layout";
import LinkList from "../components/LinkList";

import styles from "./index.module.css";

export default function Home() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Layout home>
        <Head>
          <title>{formatMessage({ id: "ddxdevin.home.title" })}</title>
        </Head>
        <h1>DEVIN NGUYEN</h1>
        <div className={styles.mainContent}>
          <div>
            <span className={styles.company}>
              <span className={styles.icon} aria-hidden="true">
                &#x2198;
              </span>
              {formatMessage({ id: "ddxdevin.work.role.principal" })}{" "}
              <a
                href="https://www.aidkit.com/"
                className={styles.companyLink}
                target="_blank"
                rel="noreferrer"
              >
                AidKit
              </a>
            </span>
            <span className={styles.company}>
              <span className={styles.icon} aria-hidden="true">
                &#x2198;
              </span>
              {formatMessage({ id: "ddxdevin.work.role.previous" })}:{" "}
              {formatMessage({ id: "ddxdevin.work.role.principal" })}{" "}
              <a
                href="https://www.hypr.com/"
                className={styles.companyLink}
                target="_blank"
                rel="noreferrer"
              >
                HYPR
              </a>
            </span>
            <span className={styles.company}>
              <span className={styles.icon} aria-hidden="true">
                &#x2198;
              </span>
              <span>
                {formatMessage({ id: "ddxdevin.work.role.previous" })}:{" "}
                {formatMessage({ id: "ddxdevin.work.role.software" })}{" "}
                <a
                  href="https://www.cloudhealthtech.com/"
                  className={styles.companyLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  CloudHealth
                </a>
                <span>
                  {" "}
                  {formatMessage({ id: "ddxdevin.work.role.cht.acquired" })}
                </span>
              </span>
            </span>
          </div>
          <LinkList
            title={formatMessage({ id: "ddxdevin.code.title" })}
            links={[
              {
                url: "https://github.com/devin2712/calfire-gis-mcp-server",
                title: formatMessage({ id: "ddxdevin.code.gis.title" }),
                isExternal: true,
                externalLinkLabel: formatMessage({
                  id: "ddxdevin.code.tags.github",
                }),
              },
              {
                url: "https://github.com/devin2712/myturn-monitor",
                title: formatMessage({ id: "ddxdevin.code.myturn.title" }),
                isExternal: true,
                externalLinkLabel: formatMessage({
                  id: "ddxdevin.code.tags.github",
                }),
              },
              {
                url: "https://github.com/devin2712/covid-notify",
                title: formatMessage({ id: "ddxdevin.code.notify.title" }),
                isExternal: true,
                externalLinkLabel: formatMessage({
                  id: "ddxdevin.code.tags.github",
                }),
              },
              {
                url:
                  "https://ddxdevin.medium.com/build-a-covid-19-vaccine-appointment-notification-system-with-a-twilio-serverless-function-23cf328c01f4",
                title: formatMessage({ id: "ddxdevin.code.notify.title" }),
                isExternal: true,
                externalLinkLabel: formatMessage({
                  id: "ddxdevin.code.tags.medium",
                }),
              },
            ]}
          />

          <LinkList
            title={formatMessage({ id: "ddxdevin.photography.title" })}
            links={[
              {
                url: "/la-main-ouverte",
                title: formatMessage({
                  id: "ddxdevin.photography.laMainOuverte",
                }),
              },
              {
                url: "/bauhauslers",
                title: formatMessage({
                  id: "ddxdevin.photography.bauhauslers",
                }),
              },
              {
                url: "/se1",
                title: formatMessage({ id: "ddxdevin.photography.se1" }),
              },
            ]}
          />
          <LinkList
            title={formatMessage({ id: "ddxdevin.talks.title" })}
            links={[
              {
                url: "/bauhaus",
                title: formatMessage({ id: "ddxdevin.talks.bauhaus.title" }),
              },
            ]}
          />
          <LinkList
            title={formatMessage({ id: "ddxdevin.links.title" })}
            links={[
              {
                url: "//www.linkedin.com/in/devinnguyen/",
                title: formatMessage({ id: "ddxdevin.links.linkedin" }),
                isExternal: true,
              },
              {
                url: "//github.com/devin2712",
                title: formatMessage({ id: "ddxdevin.links.github" }),
                isExternal: true,
              },
              {
                url: "//twitter.com/ddxdevin",
                title: formatMessage({ id: "ddxdevin.links.twitter" }),
                isExternal: true,
              },
              {
                url: "//instagram.com/ddxdevin",
                title: formatMessage({ id: "ddxdevin.links.instagram" }),
                isExternal: true,
              },
              {
                url: "//discogs.com/user/devin2712/collection",
                title: formatMessage({ id: "ddxdevin.links.discogs" }),
                isExternal: true,
              },
              {
                url: "/concerts",
                title: formatMessage({ id: "ddxdevin.links.concerts" }),
                isExternal: false,
              },
            ]}
          />
        </div>
      </Layout>
    </>
  );
}
