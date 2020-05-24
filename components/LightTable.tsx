import React from "react";
import LazyLoad from "react-lazyload";

import styles from "./LightTable.module.css";
import ProgressiveImage from "./ProgressiveImage";
import BlogPostGallery, { BlogPostGalleryImage } from "./BlogPostGallery";

export enum LightTableMode {
  LIGHT,
  DARK,
}

export interface LightTableProps {
  positiveImages: ReadonlyArray<BlogPostGalleryImage>;
  negativeImages: ReadonlyArray<BlogPostGalleryImage>;
}

export interface LightTableState {
  lightMode: LightTableMode;
}

class LightTable extends React.Component<LightTableProps, LightTableState> {
  state = {
    lightMode: LightTableMode.DARK,
  };

  render() {
    return (
      <div className={styles.lightTable}>
        <div className={styles.lightTableDevice}>
          <img className={styles.powerSymbol} src="/images/power.svg" />
          <div className={styles.lightTablePhotoScreen}>
            {this.state.lightMode === LightTableMode.DARK ? (
              <BlogPostGallery listOfImages={this.props.positiveImages} />
            ) : (
              <BlogPostGallery listOfImages={this.props.negativeImages} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default LightTable;
