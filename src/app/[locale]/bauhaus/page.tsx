import { PageLayout } from "@/components/layout/PageLayout";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { BauhausClientComponent } from "./BauhausClientComponent";

export async function generateMetadata(): Promise<Metadata> {
  return {
    openGraph: {
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
      images: ["https://devinnguyen.com/images/bauhaus/1.png"],
    },
  };
}

export default function BauhausPage() {
  const t = useTranslations("bauhaus");

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
