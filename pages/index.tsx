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
            >
              CloudHealth
            </a>
            <span> (acquired by VMware!)</span>
          </p>
          <LinkList
            title="Photography"
            links={[
              { url: "#", title: "La Main Ouverte" },
              { url: "#1", title: "Bauhäuslers" },
              { url: "#2", title: "(S)E1 [WIP]" },
            ]}
          />
          <LinkList
            title="Talks"
            links={[
              { url: "#3", title: "Bauhaus Architecture & CloudHealth UI" },
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
