import Draggable from "react-draggable";
import Image from "next/image";

import styles from "./BlogPostGallery.module.css";

export enum GalleryType {
  GRID,
  POST,
}

export interface BlogPostGalleryImage {
  src: String;
  pre?: String;
  alt: String;
  height: Number;
  width: Number;
  largestContentfulPaint?: boolean;
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
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        placeholder={image.pre ? "blur" : "empty"}
        blurDataURL={image.pre ?? null}
        priority={image.largestContentfulPaint ?? false}
      />
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
