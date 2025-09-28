import { PageLayout } from "@/components/layout/PageLayout";
import { StyledLink } from "@/components/ui/StyledLink";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    openGraph: {
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
      card: "summary",
      images: ["https://devinnguyen.com/icons/blue_arrow_512.png"],
    },
  };
}

export default function CovidMyturnPage() {
  const t = useTranslations("covidMyturn");

  return (
    <PageLayout
      header={{
        title: t("title"),
        description: "2020",
        as: "h1",
      }}
    >
      {t.raw("paragraphs").map((paragraph: string, index: number) => {
        if (paragraph.includes("<github>")) {
          return (
            <p key={index}>
              {t.rich(`paragraphs.${index}`, {
                github: (chunks) => (
                  <StyledLink
                    href="https://github.com/devin2712/myturn-monitor"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {chunks}
                  </StyledLink>
                ),
              })}
            </p>
          );
        }
        if (paragraph.includes("<notifier>")) {
          return (
            <p key={index}>
              {t.rich(`paragraphs.${index}`, {
                notifier: (chunks) => (
                  <StyledLink
                    href="/covid-appointments"
                  >
                    {chunks}
                  </StyledLink>
                ),
              })}
            </p>
          );
        }
        return <p key={index}>{paragraph}</p>;
      })}
    </PageLayout>
  );
}