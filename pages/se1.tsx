import Layout from "../components/Layout";
import BlogPost from "../components/BlogPost";
import LightTable from "../components/LightTable";
import BlogPostGallery from "../components/BlogPostGallery";

export default function Se1() {
  return (
    <Layout largeFormat>
      <BlogPost title="LIGHT TABLE">
        <>
          <section>
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
                <span>London, UK</span>
              </li>
            </ul>
          </section>
          <LightTable
            images={[
              {
                src: "/images/light-table/000051980002.jpg",
                pre: "/images/light-table/pre/000051980002.jpg",
                alt: "Photograph of urban scenes from London's SE1 and E1 neighborhoods",
                width: 400,
                height: 400,
              },
              {
                src: "/images/light-table/000051980007.jpg",
                pre: "/images/light-table/pre/000051980007.jpg",
                alt: "Photograph of urban scenes from London's SE1 and E1 neighborhoods",
                width: 400,
                height: 400,
              },
              {
                src: "/images/light-table/000055320003.jpg",
                pre: "/images/light-table/pre/000055320003.jpg",
                alt: "Photograph of urban scenes from London's SE1 and E1 neighborhoods",
                width: 400,
                height: 400,
              },
              {
                src: "/images/light-table/000055320005.jpg",
                pre: "/images/light-table/pre/000055320005.jpg",
                alt: "Photograph of urban scenes from London's SE1 and E1 neighborhoods",
                width: 400,
                height: 400,
              },
              {
                src: "/images/light-table/000055320007.jpg",
                pre: "/images/light-table/pre/000055320007.jpg",
                alt: "Photograph of urban scenes from London's SE1 and E1 neighborhoods",
                width: 400,
                height: 400,
              },
              {
                src: "/images/light-table/000055320009.jpg",
                pre: "/images/light-table/pre/000055320009.jpg",
                alt: "Photograph of urban scenes from London's SE1 and E1 neighborhoods",
                width: 400,
                height: 400,
              },
              {
                src: "/images/light-table/000073900001.jpg",
                pre: "/images/light-table/pre/000073900001.jpg",
                alt: "Photograph of urban scenes from London's SE1 and E1 neighborhoods",
                width: 400,
                height: 400,
              },
              {
                src: "/images/light-table/000073900004.jpg",
                pre: "/images/light-table/pre/000073900004.jpg",
                alt: "Photograph of urban scenes from London's SE1 and E1 neighborhoods",
                width: 400,
                height: 400,
              },
              {
                src: "/images/light-table/000095990003.jpg",
                pre: "/images/light-table/pre/000095990003.jpg",
                alt: "Photograph of urban scenes from London's SE1 and E1 neighborhoods",
                width: 400,
                height: 400,
              },
              {
                src: "/images/light-table/000095990004.jpg",
                pre: "/images/light-table/pre/000095990004.jpg",
                alt: "Photograph of urban scenes from London's SE1 and E1 neighborhoods",
                width: 400,
                height: 400,
              },
              {
                src: "/images/light-table/000096000012.jpg",
                pre: "/images/light-table/pre/000096000012.jpg",
                alt: "Photograph of urban scenes from London's SE1 and E1 neighborhoods",
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
