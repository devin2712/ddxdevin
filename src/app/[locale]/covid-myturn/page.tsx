import { PageLayout } from "@/components/layout/PageLayout";
import { StyledLink } from "@/components/ui/StyledLink";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { GitHubRepoDisplay } from "@/components/ui/GitHubRepoDisplay";

// This page is fully static
export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    alternates: {
      canonical: `https://devinnguyen.com/${locale}/covid-myturn`,
    },
    openGraph: {
      title: "COVID MyTurn CA Monitor",
      description:
        "Collect and aggregate vaccine availability data from the CA state vaccination system (MyTurn)",
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
      title: "COVID MyTurn CA Monitor",
      description:
        "Collect and aggregate vaccine availability data from the CA state vaccination system (MyTurn)",
      creator: "@ddxdevin",
      card: "summary",
      images: ["https://devinnguyen.com/icons/blue_arrow_512.png"],
    },
  };
}

export default async function CovidMyturnPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("covidMyturn");

  return (
    <PageLayout
      header={{
        title: t("title"),
        description: "2020",
        as: "h1",
      }}
    >
      {t.raw("paragraphs").map((paragraph: string, index: number) => {
        if (paragraph.includes("<notifier>")) {
          return (
            <p key={index}>
              {t.rich(`paragraphs.${index}`, {
                notifier: (chunks) => (
                  <StyledLink href="/covid-appointments">{chunks}</StyledLink>
                ),
              })}
            </p>
          );
        }
        return <p key={index}>{paragraph}</p>;
      })}

      <div style={{ margin: "2rem 0" }}>
        <GitHubRepoDisplay
          username="devin2712"
          repoName="myturn-monitor"
          url="https://github.com/devin2712/myturn-monitor"
        />
      </div>
    </PageLayout>
  );
}
