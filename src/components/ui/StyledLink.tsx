import React from "react";
import Link from "next/link";
import styles from "./StyledLink.module.css";

type StyledLinkProps = React.PropsWithChildren<{
  href: string;
  external?: boolean;
  showArrow?: boolean;
  locale?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  "aria-label"?: string;
}>;

export const StyledLink: React.FC<StyledLinkProps> = ({
  href,
  external,
  showArrow,
  children,
  locale,
  target,
  rel,
  onClick,
  className,
  "aria-label": ariaLabel,
  ...props
}) => {
  // Auto-detect external links if not explicitly set
  const isExternal = external ?? (href?.startsWith("http") || href?.startsWith("//"));

  // Determine if arrow should be shown (defaults to true for external links)
  const shouldShowArrow = showArrow ?? isExternal;

  // For external links, use <a> tag
  if (isExternal) {
    return (
      <a
        href={href}
        className={`${styles.link} ${className || ""}`}
        target={target || "_blank"}
        rel={rel || "noopener noreferrer"}
        onClick={onClick}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
        {shouldShowArrow && <span className={styles.externalIcon}>↗</span>}
      </a>
    );
  }

  // For internal links, use Next.js Link
  return (
    <Link
      href={href}
      className={`${styles.link} ${className || ""}`}
      target={target || "_self"}
      locale={locale}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </Link>
  );
};