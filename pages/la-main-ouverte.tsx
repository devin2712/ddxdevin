import Layout from "../components/Layout";
import BlogPost from "../components/BlogPost";
import BlogPostGallery from "../components/BlogPostGallery";

export default function LaMainOuverte() {
  return (
    <Layout>
      <BlogPost title="LA MAIN OUVERTE">
        <>
          <summary>
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
          </summary>
          <BlogPostGallery
            listOfImages={[
              "/images/la-main-ouverte/lmo.jpg",
              "/images/la-main-ouverte/spread1.jpg",
              "/images/la-main-ouverte/spread2.jpg",
              "/images/la-main-ouverte/spread3.jpg",
              "/images/la-main-ouverte/spread4.jpg",
              "/images/la-main-ouverte/spread5.jpg",
              "/images/la-main-ouverte/spread6.jpg",
              "/images/la-main-ouverte/spread7.jpg",
              "/images/la-main-ouverte/spread8.jpg",
            ]}
          />
        </>
      </BlogPost>
    </Layout>
  );
}
