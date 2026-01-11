import { PageLayout } from "@/components/layout/PageLayout";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";

// This page is fully static
export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "(S)E1",
    alternates: {
      canonical: `https://devinnguyen.com/${locale}/se1`,
    },
    openGraph: {
      title: "(S)E1 by Devin Nguyen",
      description: "Commuting scenes in London from E1 to SE1",
      images: [
        {
          url: "https://devinnguyen.com/images/se1/000051980002.jpg",
          width: 800,
          height: 600,
          alt: "SE1 film photography",
        },
      ],
    },
    twitter: {
      title: "(S)E1 by Devin Nguyen",
      description: "Commuting scenes in London from E1 to SE1",
      creator: "@ddxdevin",
      card: "summary_large_image",
      images: ["https://devinnguyen.com/images/se1/000051980002.jpg"],
    },
  };
}

const images = [
  "000051980002.jpg",
  "000051980007.jpg",
  "000055320003.jpg",
  "000055320005.jpg",
  "000055320007.jpg",
  "000055320009.jpg",
  "000073900001.jpg",
  "000073900004.jpg",
  "000095990003.jpg",
  "000095990004.jpg",
  "000096000012.jpg",
];

export default async function Se1Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("se1");

  return (
    <PageLayout
      header={{
        title: t("title"),
        description: "2020",
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
        {images.map((image, index) => (
          <Image
            key={image}
            src={`/images/se1/${image}`}
            alt={t("imageAlt", { number: index + 1 })}
            width={800}
            height={600}
            style={{
              width: "100%",
              height: "auto",
            }}
            sizes="500px"
            quality={85}
            loading="eager"
            priority={index === 0}
            fetchPriority={index === 0 ? "high" : "low"}
          />
        ))}
      </div>
    </PageLayout>
  );
}
