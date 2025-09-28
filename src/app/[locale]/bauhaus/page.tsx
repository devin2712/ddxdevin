"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";

export default function BauhausPage() {
  const t = useTranslations("bauhaus");

  const toggleOverlay = (e: React.FocusEvent | React.MouseEvent, show: boolean) => {
    const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement;
    if (overlay) overlay.style.opacity = show ? '1' : '0';
  };

  // Prefetch PDF on component mount to improve performance when opening the slide deck
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = '/docs/bauhaus.pdf';
    link.as = 'document';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <PageLayout
      header={{
        title: t("title"),
        description: "2024",
        as: "h1",
      }}
    >
      {t.raw("paragraphs").map((paragraph: string, index: number) => (
        <p key={index}>{paragraph}</p>
      ))}
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
          style={{
            display: "block",
            maxWidth: "640px",
            position: "relative",
            overflow: "hidden",
          }}
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
            style={{
              cursor: "pointer",
              display: "block",
              maxWidth: "100%",
              height: "auto",
            }}
            sizes="(max-width: 768px) 100vw, 640px"
            quality={85}
            priority
          />
          <div
            className="overlay"
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              transition: "opacity 0.16s ease",
              pointerEvents: "none",
            }}
          >
            <span style={{
              color: "white",
              fontSize: "1.25rem",
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}>
              {t("openPdfText")}
            </span>
          </div>
        </a>
        <p>
          <a
            href="/docs/bauhaus.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("viewPresentationLink")}
          </a>
        </p>
      </div>
    </PageLayout>
  );
}
