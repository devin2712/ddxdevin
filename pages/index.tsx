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
        <section>
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
              { url: "#", title: "Bauhäuslers" },
              { url: "#", title: "(S)E1 [WIP]" },
            ]}
          />
          <LinkList
            title="Talks"
            links={[
              { url: "#", title: "Bauhaus Architecture & CloudHealth UI" },
            ]}
          />
          <LinkList
            links={[
              {
                url: "https://www.linkedin.com/in/devinnguyen/",
                title: "LinkedIn",
              },
              {
                url: "https://github.com/devin2712",
                title: "Github",
              },
              {
                url: "https://twitter.com/ddxdevin",
                title: "Twitter",
              },
              {
                url: "http://instagram.com/ddxdevin",
                title: "Instagram",
              },
            ]}
          />
        </section>
      </Layout>
    </>
  );
}
