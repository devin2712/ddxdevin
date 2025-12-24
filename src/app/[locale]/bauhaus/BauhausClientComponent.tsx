"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { StyledLink } from "@/components/ui/StyledLink";
import { useEffect } from "react";
import styles from "./bauhausClientComponent.module.css";

export function BauhausClientComponent() {
  const t = useTranslations("bauhaus");

  const toggleOverlay = (
    e: React.FocusEvent | React.MouseEvent,
    show: boolean
  ) => {
    const overlay = e.currentTarget.querySelector(".overlay") as HTMLElement;
    if (overlay) overlay.style.opacity = show ? "1" : "0";
  };

  // Prefetch PDF on component mount to improve performance when opening the slide deck
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = "/docs/bauhaus.pdf";
    link.as = "fetch";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginTop: "1rem",
      }}
    >
      <a
        href="/docs/bauhaus.pdf"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("openPdfAriaLabel")}
        className={styles.link}
        onMouseEnter={(e) => toggleOverlay(e, true)}
        onMouseLeave={(e) => toggleOverlay(e, false)}
        onFocus={(e) => toggleOverlay(e, true)}
        onBlur={(e) => toggleOverlay(e, false)}
      >
        <Image
          src={`/images/bauhaus/1.png`}
          alt={t("titleSlideAlt")}
          width={800}
          height={600}
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 640px"
          quality={85}
          priority
          fetchPriority="high"
        />
        <div className={`${styles.overlay} overlay`} aria-hidden="true">
          <span
            style={{
              color: "white",
              fontSize: "1.25rem",
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {t("openPdfText")}
          </span>
        </div>
      </a>
      <p>
        <StyledLink href="/docs/bauhaus.pdf" target="_blank">
          {t("viewPresentationLink")}
        </StyledLink>
      </p>
    </div>
  );
}