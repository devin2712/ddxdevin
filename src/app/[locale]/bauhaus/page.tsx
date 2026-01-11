import { PageLayout } from "@/components/layout/PageLayout";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { BauhausClientComponent } from "./BauhausClientComponent";

// This page is fully static
export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Lessons from the Bauhaus",
    alternates: {
      canonical: `https://devinnguyen.com/${locale}/bauhaus`,
    },
    openGraph: {
      title: "Lessons from the Bauhaus by Devin Nguyen",
      description:
        "A presentation exploring Bauhaus design principles and their lasting influence on modern design.",
      images: [
        {
          url: "https://devinnguyen.com/images/bauhaus/1.png",
          width: 800,
          height: 600,
          alt: "Bauhaus presentation title slide",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@ddxdevin",
      title: "Lessons from the Bauhaus by Devin Nguyen",
      description:
        "A presentation exploring Bauhaus design principles and their lasting influence on modern design.",
      images: ["https://devinnguyen.com/images/bauhaus/1.png"],
    },
  };
}

export default async function BauhausPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("bauhaus");

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
      <BauhausClientComponent />
    </PageLayout>
  );
}
