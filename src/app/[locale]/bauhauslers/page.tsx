import { PageLayout } from "@/components/layout/PageLayout";
import { useTranslations } from "next-intl";
import Image from "next/image";

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

export default function BauhauslersPage() {
  const t = useTranslations("bauhauslers");

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
            loading="lazy"
          />
        ))}
      </div>
    </PageLayout>
  );
}
