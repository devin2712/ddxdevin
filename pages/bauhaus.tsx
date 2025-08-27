import Head from "next/head";
import { useIntl } from "react-intl";

import Layout from "../components/Layout";
import BlogPost from "../components/BlogPost";
import BlogPostGallery from "../components/BlogPostGallery";

export default function Bauhaus() {
  const { formatMessage } = useIntl();

  return (
    <Layout largeFormat>
      <Head>
        <title>{formatMessage({ id: "ddxdevin.bauhaus.talk.title" })}</title>
        <meta name="description" content={formatMessage({ id: "ddxdevin.bauhaus.talk.description" })} />
        <meta
          name="og:image"
          content="https://devinnguyen.com/images/bauhaus/6.jpg"
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={formatMessage({ id: "ddxdevin.bauhaus.talk.title" })}
        />
        <meta property="og:description" content={formatMessage({ id: "ddxdevin.bauhaus.talk.description" })} />
      </Head>
      <BlogPost title={formatMessage({ id: "ddxdevin.bauhaus.title" })}>
        <>
          <p>
            <strong>
              {formatMessage({ id: "ddxdevin.bauhaus.talk.title" })}
            </strong>{" "}
            {formatMessage({ id: "ddxdevin.bauhaus.talk.description" })}
          </p>

          <BlogPostGallery
            listOfImages={[
              {
                src: "/images/bauhaus/main.png",
                pre: "/images/bauhaus/pre/main.jpg",
                alt: formatMessage({ id: "ddxdevin.bauhaus.images.alt.main" }),
                width: 1216,
                height: 788,
                largestContentfulPaint: true,
              },
              {
                src: "/images/bauhaus/1.jpg",
                pre: "/images/bauhaus/pre/1.jpg",
                alt: formatMessage({ id: "ddxdevin.bauhaus.images.alt.1" }),
                width: 1216,
                height: 684,
              },
              {
                src: "/images/bauhaus/2.jpg",
                pre: "/images/bauhaus/pre/2.jpg",
                alt: formatMessage({ id: "ddxdevin.bauhaus.images.alt.2" }),
                width: 1216,
                height: 684,
              },
              {
                src: "/images/bauhaus/3.jpg",
                pre: "/images/bauhaus/pre/3.jpg",
                alt: formatMessage({ id: "ddxdevin.bauhaus.images.alt.3" }),
                width: 1216,
                height: 684,
              },
              {
                src: "/images/bauhaus/4.jpg",
                pre: "/images/bauhaus/pre/4.jpg",
                alt: formatMessage({ id: "ddxdevin.bauhaus.images.alt.4" }),
                width: 1216,
                height: 684,
              },
              {
                src: "/images/bauhaus/5.jpg",
                pre: "/images/bauhaus/pre/5.jpg",
                alt: formatMessage({ id: "ddxdevin.bauhaus.images.alt.5" }),
                width: 1216,
                height: 684,
              },
              {
                src: "/images/bauhaus/6.jpg",
                pre: "/images/bauhaus/pre/6.jpg",
                alt: formatMessage({ id: "ddxdevin.bauhaus.images.alt.6" }),
                width: 1216,
                height: 684,
              },
              {
                src: "/images/bauhaus/7.jpg",
                pre: "/images/bauhaus/pre/7.jpg",
                alt: formatMessage({ id: "ddxdevin.bauhaus.images.alt.7" }),
                width: 1216,
                height: 684,
              },
              {
                src: "/images/bauhaus/8.jpg",
                pre: "/images/bauhaus/pre/8.jpg",
                alt: formatMessage({ id: "ddxdevin.bauhaus.images.alt.8" }),
                width: 1216,
                height: 684,
              },
              {
                src: "/images/bauhaus/9.jpg",
                pre: "/images/bauhaus/pre/9.jpg",
                alt: formatMessage({ id: "ddxdevin.bauhaus.images.alt.9" }),
                width: 1216,
                height: 684,
              },
              {
                src: "/images/bauhaus/10.jpg",
                pre: "/images/bauhaus/pre/10.jpg",
                alt: formatMessage({ id: "ddxdevin.bauhaus.images.alt.10" }),
                width: 1216,
                height: 684,
              },
            ]}
          />
        </>
      </BlogPost>
    </Layout>
  );
}
