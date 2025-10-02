import { PageLayout } from "@/components/layout/PageLayout";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";

// This page is fully static
export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  return {
    openGraph: {
      title: "Bauhäuslers by Devin Nguyen",
      description:
        "A journey tracing the Bauhaus movement's historic path from Weimar to Dessau to Berlin during the centennial celebration.",
      images: [
        {
          url: "https://devinnguyen.com/images/bauhauslers/1.jpg",
          width: 800,
          height: 600,
          alt: "Bauhauslers photography",
        },
      ],
    },
    twitter: {
      title: "Bauhäuslers by Devin Nguyen",
      description:
        "A journey tracing the Bauhaus movement's historic path from Weimar to Dessau to Berlin during the centennial celebration.",
      creator: "@ddxdevin",
      card: "summary_large_image",
      images: ["https://devinnguyen.com/images/bauhauslers/1.jpg"],
    },
  };
}

const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
];

export default async function BauhauslersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("bauhauslers");

  return (
    <PageLayout
      header={{
        title: t("title"),
        description: "2019",
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
            src={`/images/bauhauslers/${image}`}
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
