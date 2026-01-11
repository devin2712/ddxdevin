import { PageLayout } from "@/components/layout/PageLayout";
import { Heading } from "@/components/ui/Heading";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";

// Image configuration mapping
const IMAGE_CONFIG: Record<string, { src: string; width: number; height: number }> = {
  "main": { src: "/images/homekit-magnepan/main.jpeg", width: 500, height: 667 },
  "magnepan": { src: "/images/homekit-magnepan/magnepan.jpeg", width: 500, height: 375 },
  "panamax": { src: "/images/homekit-magnepan/panamax.jpeg", width: 500, height: 375 },
  "homekit1": { src: "/images/homekit-magnepan/homekit1.jpeg", width: 300, height: 600 },
  "homekit2": { src: "/images/homekit-magnepan/homekit2.jpeg", width: 300, height: 600 },
  "switchbot_pair": { src: "/images/homekit-magnepan/switchbot_pair.jpeg", width: 300, height: 400 },
  "schiit_rc": { src: "/images/homekit-magnepan/schiit_rc.jpeg", width: 200, height: 500 },
  "switchbot_quickscenes": { src: "/images/homekit-magnepan/switchbot_quickscenes.jpeg", width: 300, height: 350 },
  "switchbot_editscene": { src: "/images/homekit-magnepan/switchbot_editscene.jpeg", width: 300, height: 550 },
  "switchbot_siri": { src: "/images/homekit-magnepan/switchbot_siri.jpeg", width: 300, height: 360 },
  "heysiri": { src: "/images/homekit-magnepan/heysiri.gif", width: 300, height: 360 },
  "switchbot_select": { src: "/images/homekit-magnepan/switchbot_select.jpeg", width: 300, height: 500 },
  "homekit_allshortcuts": { src: "/images/homekit-magnepan/homekit_allshortcuts.jpeg", width: 400, height: 300 },
};

// This page is fully static
export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "HomeKit Automation for Magnepans",
    alternates: {
      canonical: `https://devinnguyen.com/${locale}/homekit-magnepan`,
    },
    openGraph: {
      title: "HomeKit Automation for Magnepans",
      description:
        "This is a walkthrough on how I set up my Magnepans so that both vinyl and streaming playback are controlled through Apple HomeKit and iOS shortcuts. ",
      images: [
        {
          url: "https://devinnguyen.com/icons/blue_arrow_512.png",
          width: 512,
          height: 512,
          alt: "Devin Nguyen - Software Engineer",
        },
      ],
    },
    twitter: {
      title: "HomeKit Automation for Magnepans",
      description:
        "This is a walkthrough on how I set up my Magnepans so that both vinyl and streaming playback are controlled through Apple HomeKit and iOS shortcuts. ",
      creator: "@ddxdevin",
      card: "summary",
      images: ["https://devinnguyen.com/icons/blue_arrow_512.png"],
    },
  };
}

export default async function HomeKitMagnepan({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("homekitMagnepan");

  const renderParagraph = (paragraph: string, index: number) => {
    // Handle h4 headers (#### ) - check first as it's most specific
    if (paragraph.startsWith("#### ")) {
      const text = paragraph.slice(5);
      return (
        <Heading key={index} level="h4">
          {text}
        </Heading>
      );
    }

    // Handle h3 headers (### )
    if (paragraph.startsWith("### ")) {
      const text = paragraph.slice(4);
      return (
        <Heading key={index} level="h3">
          {text}
        </Heading>
      );
    }

    // Handle h2 headers (## )
    if (paragraph.startsWith("## ")) {
      const text = paragraph.slice(3);
      return (
        <Heading key={index} level="h2">
          {text}
        </Heading>
      );
    }

    // Handle bullet points (- )
    if (paragraph.startsWith("- ")) {
      const text = paragraph.slice(2);
      return (
        <div key={index} className={styles.bulletItem}>
          <span className={styles.bulletMarker}>•</span>
          <span>{text}</span>
        </div>
      );
    }

    // Handle arrow list items (→ )
    if (paragraph.startsWith("→ ")) {
      const text = paragraph.slice(2);
      return (
        <div key={index} className={styles.arrowItem}>
          <span className={styles.arrowMarker}>→</span>
          <span>{text}</span>
        </div>
      );
    }

    // Handle horizontal rule (---)
    if (paragraph === "---") {
      return (
        <hr
          key={index}
          style={{
            margin: "2rem 0",
            border: "none",
            borderTop: "1px solid #C8C8C8",
          }}
        />
      );
    }

    // Handle two images side by side (![img1|img2])
    const twoImgMatch = paragraph.match(/^!\[(\w+)\|(\w+)\]$/);
    if (twoImgMatch) {
      const [, imgId1, imgId2] = twoImgMatch;
      const config1 = IMAGE_CONFIG[imgId1];
      const config2 = IMAGE_CONFIG[imgId2];
      if (!config1 || !config2) return null;

      return (
        <div key={index} className={styles.twoImages}>
          <div className={styles.twoImagesItem}>
            <Image
              src={config1.src}
              alt={t(`images.${imgId1}`)}
              width={config1.width}
              height={config1.height}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className={styles.twoImagesItem}>
            <Image
              src={config2.src}
              alt={t(`images.${imgId2}`)}
              width={config2.width}
              height={config2.height}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      );
    }

    // Handle images (![main], ![homekit1], etc.)
    const imgMatch = paragraph.match(/^!\[(\w+)\]$/);
    if (imgMatch) {
      const imgId = imgMatch[1];
      const config = IMAGE_CONFIG[imgId];
      if (!config) return null;
      return (
        <p key={index} style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <Image
            src={config.src}
            alt={t(`images.${imgId}`)}
            width={config.width}
            height={config.height}
            style={{
              width: "100%",
              height: "auto",
              maxWidth: `${config.width}px`,
            }}
          />
        </p>
      );
    }

    // Handle video (![video:record])
    const videoMatch = paragraph.match(/^!\[video:(\w+)\]$/);
    if (videoMatch) {
      const videoId = videoMatch[1];
      return (
        <p key={index} style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <video
            src={`/images/homekit-magnepan/${videoId}.mov`}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "500px",
            }}
          />
        </p>
      );
    }

    // Handle Discogs link (plain text, no arrow)
    if (paragraph.includes("<discogs>")) {
      return (
        <p key={index}>
          {t.rich(`paragraphs.${index}`, {
            discogs: (chunks) => (
              <a
                href="https://www.discogs.com/user/ddx.json/collection"
                target="_blank"
                rel="noreferrer"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      );
    }

    // Default paragraph
    return <p key={index}>{paragraph}</p>;
  };

  // Process paragraphs to handle column blocks
  const renderContent = () => {
    const paragraphs = t.raw("paragraphs") as string[];
    const result: React.ReactNode[] = [];
    let i = 0;

    while (i < paragraphs.length) {
      const paragraph = paragraphs[i];

      // Check for column block start [cols:imageId]
      const colsMatch = paragraph.match(/^\[cols:(\w+)\]$/);
      if (colsMatch) {
        const imageId = colsMatch[1];
        const config = IMAGE_CONFIG[imageId];
        const columnContent: React.ReactNode[] = [];
        i++; // Move past the [cols:...] marker

        // Collect content until [/cols]
        while (i < paragraphs.length && paragraphs[i] !== "[/cols]") {
          columnContent.push(renderParagraph(paragraphs[i], i));
          i++;
        }
        i++; // Move past the [/cols] marker

        // Render the two-column layout
        result.push(
          <div key={`cols-${i}`} className={styles.twoCol}>
            <div className={styles.twoColLeft}>
              {config && (
                <Image
                  src={config.src}
                  alt={t(`images.${imageId}`)}
                  width={config.width}
                  height={config.height}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: `${config.width}px`,
                  }}
                />
              )}
            </div>
            <div className={styles.twoColRight}>{columnContent}</div>
          </div>
        );
      } else {
        result.push(renderParagraph(paragraph, i));
        i++;
      }
    }

    return result;
  };

  return (
    <PageLayout
      header={{
        title: t("title"),
        description: "2026",
        as: "h1",
      }}
    >
      {renderContent()}
    </PageLayout>
  );
}
