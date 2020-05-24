import Layout from "../components/Layout";
import BlogPost from "../components/BlogPost";
import BlogPostGallery from "../components/BlogPostGallery";

export default function LaMainOuverte() {
  return (
    <Layout>
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
              "/images/bauhaus/main.png",
              "/images/bauhaus/1.jpg",
              "/images/bauhaus/2.jpg",
              "/images/bauhaus/3.jpg",
              "/images/bauhaus/4.jpg",
              "/images/bauhaus/5.jpg",
              "/images/bauhaus/6.jpg",
              "/images/bauhaus/7.jpg",
              "/images/bauhaus/8.jpg",
            ]}
          />
        </>
      </BlogPost>
    </Layout>
  );
}
