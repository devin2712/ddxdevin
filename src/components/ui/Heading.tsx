import React from "react";
import styles from "./Heading.module.css";

type HeadingLevel = "h2" | "h3" | "h4";

export type HeadingProps = {
  level: HeadingLevel;
  children: React.ReactNode;
  className?: string;
};

export const Heading = ({ level, children, className }: HeadingProps) => {
  const Tag = level;
  return (
    <Tag
      className={`${styles.heading} ${styles[level]} ${className ?? ""}`}
    >
      {children}
    </Tag>
  );
};
