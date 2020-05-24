import Layout from "../components/Layout";
import BlogPost from "../components/BlogPost";
import BlogPostGallery, { GalleryType } from "../components/BlogPostGallery";

export default function Bauhauslers() {
  return (
    <Layout>
      <BlogPost title="BAUHÄUSLERS">
        <>
          <summary>
            <p>
              <em>Bauhäusler</em> — a student of the bauhaus
            </p>
            <p>
              <em>Mieslinge</em> — disparaging term for students copying the
              master, Mies van der Rohe; from "Mies" and German "misslingen"
              [failure]
            </p>
          </summary>
          <BlogPostGallery
            type={GalleryType.GRID}
            listOfImages={[
              {
                src: "/images/bauhauslers/1.jpg",
                pre: "/images/bauhauslers/pre/1.jpg",
                alt: "BAUHÄUSLERS",
                height: 200,
              },
              {
                src: "/images/bauhauslers/2.jpg",
                pre: "/images/bauhauslers/pre/2.jpg",
                alt: "BAUHÄUSLERS",
                height: 200,
              },
              {
                src: "/images/bauhauslers/3.jpg",
                pre: "/images/bauhauslers/pre/3.jpg",
                alt: "BAUHÄUSLERS",
                height: 200,
              },
              {
                src: "/images/bauhauslers/4.jpg",
                pre: "/images/bauhauslers/pre/4.jpg",
                alt: "BAUHÄUSLERS",
                height: 200,
              },
              {
                src: "/images/bauhauslers/5.jpg",
                pre: "/images/bauhauslers/pre/5.jpg",
                alt: "BAUHÄUSLERS",
                height: 200,
              },
              {
                src: "/images/bauhauslers/6.jpg",
                pre: "/images/bauhauslers/pre/6.jpg",
                alt: "BAUHÄUSLERS",
                height: 200,
              },
              {
                src: "/images/bauhauslers/7.jpg",
                pre: "/images/bauhauslers/pre/7.jpg",
                alt: "BAUHÄUSLERS",
                height: 200,
              },
              {
                src: "/images/bauhauslers/8.jpg",
                pre: "/images/bauhauslers/pre/8.jpg",
                alt: "BAUHÄUSLERS",
                height: 200,
              },
              {
                src: "/images/bauhauslers/9.jpg",
                pre: "/images/bauhauslers/pre/9.jpg",
                alt: "BAUHÄUSLERS",
                height: 200,
              },
              {
                src: "/images/bauhauslers/10.jpg",
                pre: "/images/bauhauslers/pre/10.jpg",
                alt: "BAUHÄUSLERS",
                height: 200,
              },
              {
                src: "/images/bauhauslers/11.jpg",
                pre: "/images/bauhauslers/pre/11.jpg",
                alt: "BAUHÄUSLERS",
                height: 200,
              },
              {
                src: "/images/bauhauslers/12.jpg",
                pre: "/images/bauhauslers/pre/12.jpg",
                alt: "BAUHÄUSLERS",
                height: 200,
              },
              {
                src: "/images/bauhauslers/13.jpg",
                pre: "/images/bauhauslers/pre/13.jpg",
                alt: "BAUHÄUSLERS",
                height: 200,
              },
              {
                src: "/images/bauhauslers/14.jpg",
                pre: "/images/bauhauslers/pre/14.jpg",
                alt: "BAUHÄUSLERS",
                height: 200,
              },
              {
                src: "/images/bauhauslers/15.jpg",
                pre: "/images/bauhauslers/pre/15.jpg",
                alt: "BAUHÄUSLERS",
                height: 200,
              },
              {
                src: "/images/bauhauslers/16.jpg",
                pre: "/images/bauhauslers/pre/16.jpg",
                alt: "BAUHÄUSLERS",
                height: 200,
              },
            ]}
          />
        </>
      </BlogPost>
    </Layout>
  );
}
