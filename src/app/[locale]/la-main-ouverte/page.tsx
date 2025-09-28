import { PageLayout } from "@/components/layout/PageLayout";
import { PullQuote } from "@/components/ui/PullQuote";
import { useTranslations } from "next-intl";
import Image from "next/image";

const images = [
  "AAIMG_7378.jpg",
  "ABGYVX8552.jpg",
  "ACDRXY4310.jpg",
  "ADRRHJ8675.jpg",
  "AEBFJD7280.jpg",
  "AFQZBN6811.jpg",
  "AHYQ2243.jpg",
  "AMVB1665.jpg",
  "BAMTMM0492.jpg",
  "BPTU7208.jpg",
  "BVRL5531.jpg",
  "CCHUFL4257.jpg",
  "CLNK6324.jpg",
  "ICIV3646.jpg",
  "IMG_7540.jpg",
  "IMG_7547.jpg",
  "IMG_7675.jpg",
  "MISF4506.jpg",
  "QXLK8734.jpg",
  "RAJP5753.jpg",
  "TYKK3425.jpg",
  "XJVD4428.jpg",
];

export default function LaMainOuvertePage() {
  const t = useTranslations("laMainOuverte");

  return (
    <PageLayout
      header={{
        title: t("title"),
        description: "2018",
        as: "h1",
      }}
    >
      <p style={{marginTop: '1rem'}}>
        <Image
          src="/icons/mainouverte.svg"
          alt={t("icon")}
          width={48}
          height={48}
          style={{
            background: "#FFF",
            borderRadius: "4px",
            padding: "4px",
            display: "inline-block",
            verticalAlign: "middle",
            height: "3em",
            width: "auto",
          }}
        />
      </p>
      {t.raw("paragraphs").map((paragraph: string, index: number) => (
        <p key={index}>{paragraph}</p>
      ))}
      <PullQuote quote={t("pullquote")} attribution={t("attribution")} />
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
            src={`/images/lamainouverte/${image}`}
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