import Head from "next/head";
import { useIntl } from "react-intl";

import Layout from "../components/Layout";
import BlogPost from "../components/BlogPost";
import BlogPostGallery from "../components/BlogPostGallery";

export default function LaMainOuverte() {
  const { formatMessage } = useIntl();

  return (
    <Layout largeFormat>
      <Head>
        <title>{formatMessage({ id: "ddxdevin.lmo.title" })}</title>
        <meta
          name="og:image"
          content="https://devinnguyen.com/images/la-main-ouverte/spread3.jpg"
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={formatMessage({ id: "ddxdevin.lmo.title" })}
        />
      </Head>
      <BlogPost title={formatMessage({ id: "ddxdevin.lmo.title" })}>
        <>
          <section>
            <ul>
              <li>{formatMessage({ id: "ddxdevin.lmo.location" })}</li>
            </ul>
            <ul>
              <li>{formatMessage({ id: "ddxdevin.lmo.book" })}</li>
              <li>{formatMessage({ id: "ddxdevin.lmo.dimensions" })}</li>
              <li>{formatMessage({ id: "ddxdevin.lmo.paper" })}</li>
              <li>{formatMessage({ id: "ddxdevin.lmo.edition" })}</li>
            </ul>
            <ul>
              <li>
                <em>{formatMessage({ id: "ddxdevin.lmo.soldOut" })}</em>
              </li>
            </ul>
          </section>
          <BlogPostGallery
            listOfImages={[
              {
                src: "/images/la-main-ouverte/lmo.jpg",
                pre: "/images/la-main-ouverte/pre/lmo.jpg",
                alt: formatMessage({ id: "ddxdevin.lmo.images.alt.main" }),
                width: 1216,
                height: 760,
                largestContentfulPaint: true,
              },
              {
                src: "/images/la-main-ouverte/spread1.jpg",
                pre: "/images/la-main-ouverte/pre/spread1.jpg",
                alt: formatMessage({ id: "ddxdevin.lmo.images.alt.1" }),
                width: 1216,
                height: 760,
              },
              {
                src: "/images/la-main-ouverte/spread2.jpg",
                pre: "/images/la-main-ouverte/pre/spread2.jpg",
                alt: formatMessage({ id: "ddxdevin.lmo.images.alt.2" }),
                width: 1216,
                height: 760,
              },
              {
                src: "/images/la-main-ouverte/spread3.jpg",
                pre: "/images/la-main-ouverte/pre/spread3.jpg",
                alt: formatMessage({ id: "ddxdevin.lmo.images.alt.default" }),
                width: 1216,
                height: 760,
              },
              {
                src: "/images/la-main-ouverte/spread4.jpg",
                pre: "/images/la-main-ouverte/pre/spread4.jpg",
                alt: formatMessage({ id: "ddxdevin.lmo.images.alt.default" }),
                width: 1216,
                height: 760,
              },
              {
                src: "/images/la-main-ouverte/spread5.jpg",
                pre: "/images/la-main-ouverte/pre/spread5.jpg",
                alt: formatMessage({ id: "ddxdevin.lmo.images.alt.default" }),
                width: 1216,
                height: 760,
              },
              {
                src: "/images/la-main-ouverte/spread6.jpg",
                pre: "/images/la-main-ouverte/pre/spread6.jpg",
                alt: formatMessage({ id: "ddxdevin.lmo.images.alt.default" }),
                width: 1216,
                height: 760,
              },
              {
                src: "/images/la-main-ouverte/spread7.jpg",
                pre: "/images/la-main-ouverte/pre/spread7.jpg",
                alt: formatMessage({ id: "ddxdevin.lmo.images.alt.default" }),
                width: 1216,
                height: 760,
              },
              {
                src: "/images/la-main-ouverte/spread8.jpg",
                pre: "/images/la-main-ouverte/pre/spread8.jpg",
                alt: formatMessage({ id: "ddxdevin.lmo.images.alt.default" }),
                width: 1216,
                height: 760,
              },
            ]}
          />
        </>
      </BlogPost>
    </Layout>
  );
}
