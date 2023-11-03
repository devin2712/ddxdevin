import Layout from "../components/Layout";
import BlogPost from "../components/BlogPost";
import BlogPostGallery from "../components/BlogPostGallery";
import Head from "next/head";

export default function Bauhaus() {
  return (
    <Layout largeFormat>
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
            conventionally Internationalist style, I gave an overview of the
            Bauhaus school's history and the associated movement to propose a
            framework for understanding current UI trends and applying lessons
            from Bauhaus to build our new design system.
          </p>

          <BlogPostGallery
            listOfImages={[
              {
                src: "/images/bauhaus/main.png",
                pre: "/images/bauhaus/pre/main.jpg",
                alt:
                  "Screenshot of browser window with Google Slides main title slide: 100 Summer, Bauhaus Architecture and CloudHealth UI",
                width: 1216,
                height: 788,
              },
              {
                src: "/images/bauhaus/1.jpg",
                pre: "/images/bauhaus/pre/1.jpg",
                alt: "Slide Preview: What is Architecture?",
                width: 1216,
                height: 684,
              },
              {
                src: "/images/bauhaus/2.jpg",
                pre: "/images/bauhaus/pre/2.jpg",
                alt:
                  "Slide Preview: American Modernism. Illustration of American Flag.",
                width: 1216,
                height: 684,
              },
              {
                src: "/images/bauhaus/3.jpg",
                pre: "/images/bauhaus/pre/3.jpg",
                alt:
                  "Slide Preview: Bauhaus introduction as school that existed between the two world wars. Illustration of date ranges of both world wars and how Bauhaus sits in the middle of the two time periods.",
                width: 1216,
                height: 684,
              },
              {
                src: "/images/bauhaus/4.jpg",
                pre: "/images/bauhaus/pre/4.jpg",
                alt:
                  "Slide Preview: Array of photographs of modernist skyscraper office buildings illustrating the uniformity of the corporate American skyline.",
                width: 1216,
                height: 684,
              },
              {
                src: "/images/bauhaus/5.jpg",
                pre: "/images/bauhaus/pre/5.jpg",
                alt:
                  "Slide Preview: Array of text blocks describing key elements of modernist architecture: mass production housing in post-war environments, prefabricated components used everywhere, provide cues for interaction, clarify intentions, a new language, and ensuring familiarity without loss of character.",
                width: 1216,
                height: 684,
              },
              {
                src: "/images/bauhaus/6.jpg",
                pre: "/images/bauhaus/pre/6.jpg",
                alt:
                  "Slide Preview: Provide Cues for Interaction. Picture of news clipping of article with header: Apple employees can't stop walking into the beautiful glass doors at new Apple Park Campus with photograph of floor-to-ceiling glass walls",
                width: 1216,
                height: 684,
              },
              {
                src: "/images/bauhaus/7.jpg",
                pre: "/images/bauhaus/pre/7.jpg",
                alt:
                  "Slide Preview: Illustrations of examples of the international style noting 'Reduce structures to their most basic structural elements' and on Wireframes & Prototyping, 'Without applying visual clutter, can your content carry itself alone?'",
                width: 1216,
                height: 684,
              },
              {
                src: "/images/bauhaus/8.jpg",
                pre: "/images/bauhaus/pre/8.jpg",
                alt:
                  "Slide Preview: Illustration of international style graphics with many diagonal lines of various widths crossing each other on the slide canvas. Considerations for Building Our UI: interaction, function, context, space, clarity, etc.",
                width: 1216,
                height: 684,
              },
              {
                src: "/images/bauhaus/9.jpg",
                pre: "/images/bauhaus/pre/9.jpg",
                alt:
                  "Slide Preview: Array of screenshots of corporate landing pages showing uniformity in artistic direction with exaggerated human figures and blue skin",
                width: 1216,
                height: 684,
              },
              {
                src: "/images/bauhaus/10.jpg",
                pre: "/images/bauhaus/pre/10.jpg",
                alt:
                  "Slide Preview: Array of screenshots of post-modernist art direction showing abstract graphic illustrations and exaggerated typefaces",
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
