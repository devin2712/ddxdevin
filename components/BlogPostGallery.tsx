import styles from "./BlogPostGallery.module.css";
import ProgressiveImage from "./ProgressiveImage";

export interface BlogPostGalleryImage {
  src: String;
  pre: String;
  alt: String;
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
          <ProgressiveImage
            preview={image.pre}
            image={image.src}
            alt={image.alt}
          />
        </div>
      ))}
    </div>
  );
}
