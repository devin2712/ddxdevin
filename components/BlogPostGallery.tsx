import Draggable from "react-draggable";

import styles from "./BlogPostGallery.module.css";
import ProgressiveImage from "./ProgressiveImage";

export enum GalleryType {
  GRID,
  POST,
}

export interface BlogPostGalleryImage {
  src: String;
  pre: String;
  alt: String;
  height?: Number;
}

export interface BlogPostGalleryProps {
  listOfImages: ReadonlyArray<BlogPostGalleryImage>;
  type?: GalleryType;
  draggable?: boolean;
}

function galleryTypeClass(type: GalleryType | undefined) {
  const typeClasses = {
    undefined: "",
    [GalleryType.GRID]: styles.grid,
    [GalleryType.POST]: styles.post,
  };

  return typeClasses[type];
}

export default function BlogPostGallery({
  listOfImages,
  type,
  draggable,
}: BlogPostGalleryProps) {
  const renderImage = (image) => {
    return (
      <ProgressiveImage preview={image.pre} image={image.src} alt={image.alt} />
    );
  };

  return (
    <div className={`${styles.galleryImages} ${galleryTypeClass(type)}`}>
      {listOfImages.map((image) => (
        <div className={styles.galleryImage} key={image.src as string}>
          {draggable && draggable === true ? (
            <Draggable onStart={(e) => e.preventDefault()}>
              <div className={styles.draggable}>{renderImage(image)}</div>
            </Draggable>
          ) : (
            renderImage(image)
          )}
        </div>
      ))}
    </div>
  );
}
