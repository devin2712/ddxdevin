import Layout from "../components/Layout";
import BlogPost from "../components/BlogPost";
import LightTable from "../components/LightTable";
import BlogPostGallery from "../components/BlogPostGallery";

export default function Se1() {
  return (
    <Layout>
      <BlogPost title="LIGHT TABLE">
        <>
          <summary>
            <ul>
              <li>
                <em>
                  works in progress, stuff under consideration, book forthcoming
                </em>
              </li>
            </ul>
            <ul>
              <li>
                <span>
                  book art direction by{" "}
                  <a
                    href="httspan://jasonkim.xyz/"
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
                <span>London, UK</span>
              </li>
            </ul>
          </summary>
          <LightTable
            positiveImages={[
              {
                src: "/images/light-table/000051980002.jpg",
                pre: "/images/light-table/pre/000051980002.jpg",
                alt: "Light Table Picture",
                height: 200,
              },
              {
                src: "/images/light-table/000051980007.jpg",
                pre: "/images/light-table/pre/000051980007.jpg",
                alt: "Light Table Picture",
                height: 200,
              },
              {
                src: "/images/light-table/000055320003.jpg",
                pre: "/images/light-table/pre/000055320003.jpg",
                alt: "Light Table Picture",
                height: 200,
              },
              {
                src: "/images/light-table/000055320005.jpg",
                pre: "/images/light-table/pre/000055320005.jpg",
                alt: "Light Table Picture",
                height: 200,
              },
              {
                src: "/images/light-table/000055320007.jpg",
                pre: "/images/light-table/pre/000055320007.jpg",
                alt: "Light Table Picture",
                height: 200,
              },
              {
                src: "/images/light-table/000055320009.jpg",
                pre: "/images/light-table/pre/000055320009.jpg",
                alt: "Light Table Picture",
                height: 200,
              },
              {
                src: "/images/light-table/000073900001.jpg",
                pre: "/images/light-table/pre/000073900001.jpg",
                alt: "Light Table Picture",
                height: 200,
              },
              {
                src: "/images/light-table/000073900004.jpg",
                pre: "/images/light-table/pre/000073900004.jpg",
                alt: "Light Table Picture",
                height: 200,
              },
              {
                src: "/images/light-table/000095990003.jpg",
                pre: "/images/light-table/pre/000095990003.jpg",
                alt: "Light Table Picture",
                height: 200,
              },
              {
                src: "/images/light-table/000095990004.jpg",
                pre: "/images/light-table/pre/000095990004.jpg",
                alt: "Light Table Picture",
                height: 200,
              },
              {
                src: "/images/light-table/000096000012.jpg",
                pre: "/images/light-table/pre/000096000012.jpg",
                alt: "Light Table Picture",
                height: 200,
              },
            ]}
            negativeImages={[
              {
                src: "/images/light-table/negatives/000051980002.jpg",
                pre: "/images/light-table/pre/000051980002.jpg",
                alt: "Light Table Picture",
                height: 200,
              },
              {
                src: "/images/light-table/negatives/000051980007.jpg",
                pre: "/images/light-table/pre/000051980007.jpg",
                alt: "Light Table Picture",
                height: 200,
              },
              {
                src: "/images/light-table/negatives/000055320003.jpg",
                pre: "/images/light-table/pre/000055320003.jpg",
                alt: "Light Table Picture",
                height: 200,
              },
              {
                src: "/images/light-table/negatives/000055320005.jpg",
                pre: "/images/light-table/pre/000055320005.jpg",
                alt: "Light Table Picture",
                height: 200,
              },
              {
                src: "/images/light-table/negatives/000055320007.jpg",
                pre: "/images/light-table/pre/000055320007.jpg",
                alt: "Light Table Picture",
                height: 200,
              },
              {
                src: "/images/light-table/negatives/000055320009.jpg",
                pre: "/images/light-table/pre/000055320009.jpg",
                alt: "Light Table Picture",
                height: 200,
              },
              {
                src: "/images/light-table/negatives/000073900001.jpg",
                pre: "/images/light-table/pre/000073900001.jpg",
                alt: "Light Table Picture",
                height: 200,
              },
              {
                src: "/images/light-table/negatives/000073900004.jpg",
                pre: "/images/light-table/pre/000073900004.jpg",
                alt: "Light Table Picture",
                height: 200,
              },
              {
                src: "/images/light-table/negatives/000095990003.jpg",
                pre: "/images/light-table/pre/000095990003.jpg",
                alt: "Light Table Picture",
                height: 200,
              },
              {
                src: "/images/light-table/negatives/000095990004.jpg",
                pre: "/images/light-table/pre/000095990004.jpg",
                alt: "Light Table Picture",
                height: 200,
              },
              {
                src: "/images/light-table/negatives/000096000012.jpg",
                pre: "/images/light-table/pre/000096000012.jpg",
                alt: "Light Table Picture",
                height: 200,
              },
            ]}
          />
        </>
      </BlogPost>
    </Layout>
  );
}