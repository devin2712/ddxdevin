import React from "react";
import styles from "./PullQuote.module.css";

export type PullQuoteProps = {
  quote: string;
  attribution?: string;
};

export const PullQuote: React.FC<PullQuoteProps> = ({ quote, attribution }) => {
  return (
    <blockquote className={styles.pullQuote}>
      <p className={styles.quote}>{quote}</p>
      {attribution && (
        <cite className={styles.attribution}>— {attribution}</cite>
      )}
    </blockquote>
  );
};

PullQuote.displayName = "PullQuote";