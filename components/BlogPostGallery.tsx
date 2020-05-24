import LazyLoad from "react-lazyload";

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
  listOfImages: Array<BlogPostGalleryImage>;
  type?: GalleryType;
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
}: BlogPostGalleryProps) {
  return (
    <div className={`${styles.galleryImages} ${galleryTypeClass(type)}`}>
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
