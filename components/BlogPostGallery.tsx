import Draggable from "react-draggable";
import Image from "next/image";
import React, { useRef } from "react";

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

// Custom draggable wrapper component that uses a ref
function DraggableImage({ image, renderImage }: { image: BlogPostGalleryImage; renderImage: (image: BlogPostGalleryImage) => React.JSX.Element }) {
  const nodeRef = useRef<HTMLDivElement>(null);
  
  return (
    <Draggable nodeRef={nodeRef} onStart={(e) => e.preventDefault()}>
      <div ref={nodeRef} className={styles.draggable}>
        {renderImage(image)}
      </div>
    </Draggable>
  );
}

export default function BlogPostGallery({
  listOfImages,
  type,
  draggable,
}: BlogPostGalleryProps) {
  const renderImage = (image: BlogPostGalleryImage) => {
    return (
      <Image
        src={image.src as string}
        alt={image.alt as string}
        width={image.width as number}
        height={image.height as number}
        placeholder={image.pre ? "blur" : "empty"}
        blurDataURL={image.pre as string ?? null}
        priority={image.largestContentfulPaint ?? false}
      />
    );
  };

  return (
    <div className={`${styles.galleryImages} ${galleryTypeClass(type)}`}>
      {listOfImages.map((image) => (
        <div className={styles.galleryImage} key={image.src as string}>
          {draggable && draggable === true ? (
            <DraggableImage image={image} renderImage={renderImage} />
          ) : (
            renderImage(image)
          )}
        </div>
      ))}
    </div>
  );
}
