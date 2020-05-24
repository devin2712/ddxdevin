import React from "react";

import styles from "./LightTable.module.css";
import BlogPostGallery, { BlogPostGalleryImage } from "./BlogPostGallery";
import ThemeContext from "../context/ThemeContext";

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
          alt="Power symbol for light table. Use to turn light table on and off."
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
