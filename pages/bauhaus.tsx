import Layout from "../components/Layout";
import BlogPost from "../components/BlogPost";
import BlogPostGallery from "../components/BlogPostGallery";
import Head from "next/head";

export default function Bauhaus() {
  return (
    <Layout>
      <Head>
        <meta
          name="og:image"
          content="https://devinnguyen.com/images/bauhaus/6.jpg"
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="Bauhaus Architecture & CloudHealth UI"
        />
      </Head>
      <BlogPost title="BAUHAUS">
        <>
          <p>
            <strong>Bauhaus Architecture &amp; CloudHealth UI</strong> was a
            talk I gave when the CloudHealth team first moved into its new
            office at 100 Summer Street in Boston. Inspired by the building's
            conventionally Internationlist style, I gave an overview of the
            Bauhaus school's history and the associated movement to propose a
            framework for understanding current UI trends and applying lessons
            from Bauhaus to build our new design system.
          </p>

          <BlogPostGallery
            listOfImages={[
              {
                src: "/images/bauhaus/main.png",
                pre: "/images/bauhaus/pre/main.jpg",
                alt: "Bauhaus Talk Slide",
                height: 540,
              },
              {
                src: "/images/bauhaus/1.jpg",
                pre: "/images/bauhaus/pre/1.jpg",
                alt: "Bauhaus Talk Slide",
                height: 540,
              },
              {
                src: "/images/bauhaus/2.jpg",
                pre: "/images/bauhaus/pre/2.jpg",
                alt: "Bauhaus Talk Slide",
                height: 540,
              },
              {
                src: "/images/bauhaus/3.jpg",
                pre: "/images/bauhaus/pre/3.jpg",
                alt: "Bauhaus Talk Slide",
                height: 540,
              },
              {
                src: "/images/bauhaus/4.jpg",
                pre: "/images/bauhaus/pre/4.jpg",
                alt: "Bauhaus Talk Slide",
                height: 540,
              },
              {
                src: "/images/bauhaus/5.jpg",
                pre: "/images/bauhaus/pre/5.jpg",
                alt: "Bauhaus Talk Slide",
                height: 540,
              },
              {
                src: "/images/bauhaus/6.jpg",
                pre: "/images/bauhaus/pre/6.jpg",
                alt: "Bauhaus Talk Slide",
                height: 540,
              },
              {
                src: "/images/bauhaus/7.jpg",
                pre: "/images/bauhaus/pre/7.jpg",
                alt: "Bauhaus Talk Slide",
                height: 540,
              },
              {
                src: "/images/bauhaus/8.jpg",
                pre: "/images/bauhaus/pre/8.jpg",
                alt: "Bauhaus Talk Slide",
                height: 540,
              },
            ]}
          />
        </>
      </BlogPost>
    </Layout>
  );
}
