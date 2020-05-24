import styles from "./BlogPostGallery.module.css";
import ProgressiveImage from "./ProgressiveImage";

import LazyLoad from "react-lazyload";

export interface BlogPostGalleryImage {
  src: String;
  pre: String;
  alt: String;
  height?: Number;
}

export interface BlogPostGalleryProps {
  listOfImages: Array<BlogPostGalleryImage>;
}

export default function BlogPostGallery({
  listOfImages,
}: BlogPostGalleryProps) {
  return (
    <div className={styles.galleryImages}>
      {listOfImages.map((image) => (
        <div key={image.src as string}>
          <LazyLoad height={image.height || 500}>
            <ProgressiveImage
              preview={image.pre}
              image={image.src}
              alt={image.alt}
            />
          </LazyLoad>
        </div>
      ))}
    </div>
  );
}
