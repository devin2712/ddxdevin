import styles from "./BlogPostGallery.module.css";
import ProgressiveImage from "./ProgressiveImage";

export interface BlogPostGalleryProps {
  listOfImages: Array<String>;
}

export default function BlogPostGallery({
  listOfImages,
}: BlogPostGalleryProps) {
  return (
    <div className={styles.galleryImages}>
      {listOfImages.map((image) => (
        <img key={image as string} src={image as string} />
      ))}
    </div>
  );
}
