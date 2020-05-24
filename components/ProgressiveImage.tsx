import React from "react";

import styles from "./ProgressiveImage.module.css";

export interface ProgressiveImageProps {
  preview: String;
  image: String;
  alt: String;
}

export interface ProgressiveImageState {
  currentImage: String;
  loading: boolean;
}

class ProgressiveImage extends React.Component<
  ProgressiveImageProps,
  ProgressiveImageState
> {
  _isMounted = false;

  state = {
    currentImage: this.props.preview,
    loading: true,
  };

  componentDidMount() {
    this._isMounted = true;
    this.fetchImage(this.props.image);
  }

  fetchImage = (src) => {
    if (this._isMounted) {
      const image = new Image();
      image.onload = () => this.setState({ currentImage: src, loading: false });
      image.src = src;
    }
  };

  style = (loading) => {
    return {
      filter: `${loading ? "blur(15px)" : ""}`,
    };
  };

  render() {
    const { currentImage, loading } = this.state;
    const { alt } = this.props;
    return (
      <img
        className={styles.progressiveImage}
        style={this.style(loading)}
        src={currentImage as string}
        alt={alt as string}
      />
    );
  }
}

export default ProgressiveImage;
