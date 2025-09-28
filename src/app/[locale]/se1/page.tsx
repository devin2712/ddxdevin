import { PageLayout } from "@/components/layout/PageLayout";
import { useTranslations } from "next-intl";
import Image from "next/image";

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

export default function Se1Page() {
  const t = useTranslations("se1");

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
            loading="lazy"
          />
        ))}
      </div>
    </PageLayout>
  );
}
