import styles from "./BlogPostGallery.module.css";

export type BlogPostGalleryProps = {
  listOfImages: Array<String>;
};

export default function BlogPostGallery({
  listOfImages,
}: BlogPostGalleryProps) {
  return (
    <div className={styles.galleryImages}>
      {listOfImages.map((image) => (
        <img src={image as string} />
      ))}
    </div>
  );
}
