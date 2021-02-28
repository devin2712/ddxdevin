import Head from "next/head";
import Layout from "../components/Layout";
import LinkList from "../components/LinkList";

import styles from "./index.module.css";

export default function Home() {
  return (
    <>
      <Layout home>
        <Head>
          <title>Devin Nguyen.Home</title>
        </Head>
        <h1>DEVIN NGUYEN</h1>
        <section className={styles.mainContent}>
          <p>
            Software Engineer at{" "}
            <a
              href="https://www.cloudhealthtech.com/"
              className={styles.cloudhealth}
              target="_blank"
              rel="noreferrer"
            >
              CloudHealth
            </a>
            <span> (acquired by VMware!)</span>
          </p>
          <LinkList
            title="Code"
            links={[
              { url: "https://github.com/devin2712/covid-notify", title: "COVID-19 Vaccine Appointment Notification System [Source Code]" },
              { url: "https://github.com/devin2712/covid-notify", title: "COVID-19 Vaccine Appointment Notification System [Setup Guide]" },
            ]}
          />
          
          <LinkList
            title="Photography"
            links={[
              { url: "/la-main-ouverte", title: "La Main Ouverte" },
              { url: "/bauhauslers", title: "Bauhäuslers" },
              { url: "/se1", title: "(S)E1 [WIP]" },
            ]}
          />
          <LinkList
            title="Talks"
            links={[
              {
                url: "/bauhaus",
                title: "Bauhaus Architecture & CloudHealth UI",
              },
            ]}
          />
          <LinkList
            links={[
              {
                url: "//www.linkedin.com/in/devinnguyen/",
                title: "LinkedIn",
                isExternal: true,
              },
              {
                url: "//github.com/devin2712",
                title: "Github",
                isExternal: true,
              },
              {
                url: "//twitter.com/ddxdevin",
                title: "Twitter",
                isExternal: true,
              },
              {
                url: "//instagram.com/ddxdevin",
                title: "Instagram",
                isExternal: true,
              },
            ]}
          />
        </section>
      </Layout>
    </>
  );
}
