import React from "react";
import { CSVRow } from "../utils/CSVreader";
import Highlight from "./Highlight";

import styles from "./ArtistDisplay.module.css";

interface ArtistDisplayProps {
  artist: CSVRow;
  query?: string;
}

export const ARTIST_KEY = "ARTIST NAME";

export const ArtistDisplay = React.memo(
  ({ artist, query }: ArtistDisplayProps) => {
    if (!artist[ARTIST_KEY]) return;

    return (
      <>
        <Highlight text={artist[ARTIST_KEY]} highlight={query} />
        {artist["SHOWS"] ? (
          <strong className={styles.showCount}>{`(${artist["SHOWS"]})`}</strong>
        ) : null}
      </>
    );
  }
);
