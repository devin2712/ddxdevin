import React from "react";
import styles from "./Header.module.css";

export type HeaderProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>;

export const Header = React.forwardRef<HTMLDivElement, HeaderProps>(({
  title,
  description,
  as = "h1",
  className,
  ...props
}, ref) => {
  const Tag = as;

  return (
    <div
      ref={ref}
      className={`${styles.header} ${className ? className : ''}`}
      {...props}
    >
      <Tag>{title}</Tag>
      {description && <span>{description}</span>}
    </div>
  );
});

Header.displayName = "Header";