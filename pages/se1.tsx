import Head from "next/head";
import Layout from "../components/Layout";
import BlogPost from "../components/BlogPost";
import LightTable from "../components/LightTable";
import BlogPostGallery from "../components/BlogPostGallery";
import { useIntl } from "react-intl";

export default function Se1() {
  const { formatMessage } = useIntl();

  return (
    <Layout largeFormat>
      <Head>
        <title>{formatMessage({ id: "ddxdevin.se1.title" })}</title>
        <meta name="description" content={formatMessage({ id: "ddxdevin.se1.description" })} />
        <meta property="og:title" content={formatMessage({ id: "ddxdevin.se1.title" })} />
        <meta property="og:description" content={formatMessage({ id: "ddxdevin.se1.description" })} />
        <meta property="og:type" content="article" />
        <meta name="og:image" content="https://devinnguyen.com/images/light-table/000051980002.jpg" />
      </Head>
      <BlogPost title={formatMessage({ id: "ddxdevin.se1.title" })}>
        <>
          <section>
            <ul>
              <li>
                <em>{formatMessage({ id: "ddxdevin.se1.description" })}</em>
              </li>
            </ul>
            <ul>
              <li>
                <span>
                  {formatMessage({ id: "ddxdevin.se1.author" })}{" "}
                  <a
                    href="http://jasonkim.xyz/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    @kim.json
                  </a>
                </span>
              </li>
            </ul>
            <ul>
              <li>
                <span>{formatMessage({ id: "ddxdevin.se1.location" })}</span>
              </li>
            </ul>
          </section>
          <LightTable
            images={[
              {
                src: "/images/light-table/000051980002.jpg",
                pre: "/images/light-table/pre/000051980002.jpg",
                alt: formatMessage({ id: "ddxdevin.se1.images.alt.default" }),
                width: 400,
                height: 400,
              },
              {
                src: "/images/light-table/000051980007.jpg",
                pre: "/images/light-table/pre/000051980007.jpg",
                alt: formatMessage({ id: "ddxdevin.se1.images.alt.default" }),
                width: 400,
                height: 400,
              },
              {
                src: "/images/light-table/000055320003.jpg",
                pre: "/images/light-table/pre/000055320003.jpg",
                alt: formatMessage({ id: "ddxdevin.se1.images.alt.default" }),
                width: 400,
                height: 400,
              },
              {
                src: "/images/light-table/000055320005.jpg",
                pre: "/images/light-table/pre/000055320005.jpg",
                alt: formatMessage({ id: "ddxdevin.se1.images.alt.default" }),
                width: 400,
                height: 400,
              },
              {
                src: "/images/light-table/000055320007.jpg",
                pre: "/images/light-table/pre/000055320007.jpg",
                alt: formatMessage({ id: "ddxdevin.se1.images.alt.default" }),
                width: 400,
                height: 400,
              },
              {
                src: "/images/light-table/000055320009.jpg",
                pre: "/images/light-table/pre/000055320009.jpg",
                alt: formatMessage({ id: "ddxdevin.se1.images.alt.default" }),
                width: 400,
                height: 400,
              },
              {
                src: "/images/light-table/000073900001.jpg",
                pre: "/images/light-table/pre/000073900001.jpg",
                alt: formatMessage({ id: "ddxdevin.se1.images.alt.default" }),
                width: 400,
                height: 400,
              },
              {
                src: "/images/light-table/000073900004.jpg",
                pre: "/images/light-table/pre/000073900004.jpg",
                alt: formatMessage({ id: "ddxdevin.se1.images.alt.default" }),
                width: 400,
                height: 400,
              },
              {
                src: "/images/light-table/000095990003.jpg",
                pre: "/images/light-table/pre/000095990003.jpg",
                alt: formatMessage({ id: "ddxdevin.se1.images.alt.default" }),
                width: 400,
                height: 400,
              },
              {
                src: "/images/light-table/000095990004.jpg",
                pre: "/images/light-table/pre/000095990004.jpg",
                alt: formatMessage({ id: "ddxdevin.se1.images.alt.default" }),
                width: 400,
                height: 400,
              },
              {
                src: "/images/light-table/000096000012.jpg",
                pre: "/images/light-table/pre/000096000012.jpg",
                alt: formatMessage({ id: "ddxdevin.se1.images.alt.default" }),
                width: 400,
                height: 400,
              },
            ]}
          />
        </>
      </BlogPost>
    </Layout>
  );
}
