import Layout from "../components/Layout";
import BlogPost from "../components/BlogPost";
import BlogPostGallery from "../components/BlogPostGallery";
import Head from "next/head";

export default function LaMainOuverte() {
  return (
    <Layout largeFormat>
      <Head>
        <meta
          name="og:image"
          content="https://devinnguyen.com/images/la-main-ouverte/spread3.jpg"
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="La Main Ouverte" />
      </Head>
      <BlogPost title="LA MAIN OUVERTE">
        <>
          <section>
            <ul>
              <li>Chandigarh, India</li>
            </ul>
            <ul>
              <li>36 pages perfect-bound book</li>
              <li>148 x 210 mm</li>
              <li>150 gsm gloss</li>
              <li>Edition of 25</li>
            </ul>
            <ul>
              <li>
                <em>Sold out.</em>
              </li>
            </ul>
          </section>
          <BlogPostGallery
            listOfImages={[
              {
                src: "/images/la-main-ouverte/lmo.jpg",
                pre: "/images/la-main-ouverte/pre/lmo.jpg",
                alt:
                  "Front and back cover of La Main Ouverte zine showing images from Chandigarh",
                width: 1216,
                height: 760,
              },
              {
                src: "/images/la-main-ouverte/spread1.jpg",
                pre: "/images/la-main-ouverte/pre/spread1.jpg",
                alt:
                  "Inside cover illustration and title page of zine: Chandigarh, India 2019",
                width: 1216,
                height: 760,
              },
              {
                src: "/images/la-main-ouverte/spread2.jpg",
                pre: "/images/la-main-ouverte/pre/spread2.jpg",
                alt:
                  "Image of introduction paragraph of The Open Hand and the history of Le Corbusier and Chandigarh",
                width: 1216,
                height: 760,
              },
              {
                src: "/images/la-main-ouverte/spread3.jpg",
                pre: "/images/la-main-ouverte/pre/spread3.jpg",
                alt:
                  "Double-page spread with images of Le Corbusier's architecture in Chandigarh",
                width: 1216,
                height: 760,
              },
              {
                src: "/images/la-main-ouverte/spread4.jpg",
                pre: "/images/la-main-ouverte/pre/spread4.jpg",
                alt:
                  "Double-page spread with images of Le Corbusier's architecture in Chandigarh",
                width: 1216,
                height: 760,
              },
              {
                src: "/images/la-main-ouverte/spread5.jpg",
                pre: "/images/la-main-ouverte/pre/spread5.jpg",
                alt:
                  "Double-page spread with images of Le Corbusier's architecture in Chandigarh",
                width: 1216,
                height: 760,
              },
              {
                src: "/images/la-main-ouverte/spread6.jpg",
                pre: "/images/la-main-ouverte/pre/spread6.jpg",
                alt:
                  "Double-page spread with images of Le Corbusier's architecture in Chandigarh",
                width: 1216,
                height: 760,
              },
              {
                src: "/images/la-main-ouverte/spread7.jpg",
                pre: "/images/la-main-ouverte/pre/spread7.jpg",
                alt:
                  "Double-page spread with images of Le Corbusier's architecture in Chandigarh",
                width: 1216,
                height: 760,
              },
              {
                src: "/images/la-main-ouverte/spread8.jpg",
                pre: "/images/la-main-ouverte/pre/spread8.jpg",
                alt:
                  "Double-page spread with images of Le Corbusier's architecture in Chandigarh",
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
