import React from "react";

import styles from "./LightTable.module.css";
import BlogPostGallery, { BlogPostGalleryImage } from "./BlogPostGallery";
import ThemeContext from "../pages/ThemeContext";

export enum LightTableMode {
  LIGHT,
  DARK,
}

export interface LightTableProps {
  positiveImages: ReadonlyArray<BlogPostGalleryImage>;
  negativeImages: ReadonlyArray<BlogPostGalleryImage>;
}

export default function LightTable({
  positiveImages,
  negativeImages,
}: LightTableProps) {
  const { dark, toggle } = React.useContext(ThemeContext);

  return (
    <div className={styles.lightTable}>
      <div className={styles.lightTableDevice}>
        <img
          className={styles.powerSymbol}
          src="/images/power.svg"
          onClick={() => toggle()}
        />
        <div className={styles.lightTablePhotoScreen}>
          {dark ? (
            <BlogPostGallery listOfImages={positiveImages} />
          ) : (
            <BlogPostGallery listOfImages={negativeImages} />
          )}
        </div>
      </div>
    </div>
  );
}
