import { PageLayout } from "@/components/layout/PageLayout";
import { StyledLink } from "@/components/ui/StyledLink";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";
import { LinkList } from "@/components/ui/LinkList";
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
    title: "MCP: Mapping LA Wildfires with AI",
    alternates: {
      canonical: `https://devinnguyen.com/${locale}/mcp-wildfire`,
    },
    openGraph: {
      title: "MCP: Mapping LA Wildfires with AI",
      description:
        "An MCP server for accessing CAL FIRE wildfire data to help with disaster relief programs",
      images: [
        {
          url: "https://devinnguyen.com/images/calfire/diagram.png",
          width: 500,
          height: 281,
          alt: "CalFire MCP wildfire data diagram",
        },
      ],
    },
    twitter: {
      title: "MCP: Mapping LA Wildfires with AI",
      creator: "@ddxdevin",
      description:
        "An MCP server for accessing CAL FIRE wildfire data to help with disaster relief programs",
      card: "summary_large_image",
      images: ["https://devinnguyen.com/images/calfire/diagram.png"],
    },
  };
}

export default async function McpWildfirePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("mcpWildfire");

  return (
    <PageLayout
      header={{
        title: t("title"),
        description: "2025",
        as: "h1",
      }}
    >
      <p>
        <Image
          src="/images/calfire/diagram.png"
          alt={t("image")}
          width={500}
          height={281}
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            width: "100%",
            height: "auto",
            maxWidth: "500px",
          }}
          priority
          fetchPriority="high"
        />
      </p>
      {t.raw("paragraphs").map((paragraph: string, index: number) => {
        if (paragraph.includes("<aidkit>")) {
          return (
            <p key={index}>
              {t.rich(`paragraphs.${index}`, {
                aidkit: (chunks) => (
                  <StyledLink
                    href="https://www.aidkit.com/"
                    target="_blank"
                    rel="noreferrer"
                    showArrow={false}
                  >
                    {chunks}
                  </StyledLink>
                ),
              })}
            </p>
          );
        }
        if (paragraph.includes("<repo>")) {
          const linkText = paragraph.replace(/<\/?repo>/g, "");
          return (
            <p key={index} style={{ marginLeft: "1rem" }}>
              <StyledLink
                href="https://github.com/devin2712/calfire-gis-mcp-server"
                target="_blank"
                rel="noreferrer"
              >
                {linkText}
              </StyledLink>
            </p>
          );
        }

        return <p key={index}>{paragraph}</p>;
      })}

      <div style={{ margin: "2rem 0" }}>
        <GitHubRepoDisplay
          username="devin2712"
          repoName="calfire-gis-mcp-server"
          url="https://github.com/devin2712/calfire-gis-mcp-server"
        />
      </div>

      <LinkList
        showIndex={false}
        sections={[
          {
            title: t("readMore"),
            links: [
              {
                key: "caseStudy",
                title: t("caseStudy"),
                content: "arrow",
                config: {
                  external: true,
                  url: "https://www.aidkit.com/case-study/los-angeles-regional-wildfire-relief-programs",
                },
              },
              {
                key: "award",
                title: t("award"),
                content: "arrow",
                config: {
                  external: true,
                  url: "https://www.aidkit.com/publication/aidkit-named-a-winner-in-the-2025-stevie-awards-for-technology-excellence",
                },
              },
              {
                key: "routeFifty",
                title: t("routeFifty"),
                content: "arrow",
                config: {
                  external: true,
                  url: "https://www.route-fifty.com/digital-government/2025/03/how-la-using-tech-get-wildfire-victims-financial-help/403622/",
                },
              },
              {
                key: "nbc",
                title: t("nbc"),
                content: "arrow",
                config: {
                  external: true,
                  url: "https://www.nbclosangeles.com/news/california-wildfires/la-county-business-wildfire-relief-funds/3627763/",
                },
              },
              {
                key: "latimes",
                title: t("latimes"),
                content: "arrow",
                config: {
                  external: true,
                  url: "https://www.latimes.com/california/story/2025-03-11/local-relief-grants-deadline-here",
                },
              },
              {
                key: "lacounty",
                title: t("lacounty"),
                content: "arrow",
                config: {
                  external: true,
                  url: "https://lacounty.gov/2025/02/26/los-angeles-county-wildfire-relief-funds-receive-a-multimillion-dollar-boost-from-fireaid/",
                },
              },
              {
                key: "santaMonicaDailyPress",
                title: t("santaMonicaDailyPress"),
                content: "arrow",
                config: {
                  external: true,
                  url: "https://smdp.com/business/la-county-launches-dollar250000-grant-program-for-malibu-topanga-businesses/",
                },
              },
              {
                key: "santaMonicaMirror",
                title: t("santaMonicaMirror"),
                content: "arrow",
                config: {
                  external: true,
                  url: "https://smmirror.com/2025/03/county-disburses-initial-2-7m-in-wildfire-relief-funds-to-small-businesses-and-workers/",
                },
              },
              {
                key: "secretLosAngeles",
                title: t("secretLosAngeles"),
                content: "arrow",
                config: {
                  external: true,
                  url: "https://secretlosangeles.com/new-grant-in-la-county-to-help-small-businesses-impacted-by-wildfires/",
                },
              },
            ],
            key: "",
          },
        ]}
      />
    </PageLayout>
  );
}
