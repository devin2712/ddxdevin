import { PageLayout } from "@/components/layout/PageLayout";
import { StyledLink } from "@/components/ui/StyledLink";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";

// This page is fully static
export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  return {
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
        if (paragraph.includes("<casestudy>")) {
          const linkText = paragraph.replace(/<\/?casestudy>/g, "");
          return (
            <p key={index} style={{ marginLeft: "1rem" }}>
              <StyledLink
                href="https://www.aidkit.com/publication/los-angeles-regional-wildfire-relief-programs"
                target="_blank"
                rel="noreferrer"
              >
                {linkText}
              </StyledLink>
            </p>
          );
        }
        if (paragraph.includes("<award>")) {
          const linkText = paragraph.replace(/<\/?award>/g, "");
          return (
            <p key={index} style={{ marginLeft: "1rem" }}>
              <StyledLink
                href="https://www.aidkit.com/publication/aidkit-named-a-winner-in-the-2025-stevie-awards-for-technology-excellence"
                target="_blank"
                rel="noreferrer"
              >
                {linkText}
              </StyledLink>
            </p>
          );
        }
        if (paragraph.includes("<press>")) {
          const linkText = paragraph.replace(/<\/?press>/g, "");
          return (
            <p key={index} style={{ marginLeft: "1rem" }}>
              <StyledLink
                href="https://www.route-fifty.com/digital-government/2025/03/how-la-using-tech-get-wildfire-victims-financial-help/403622/"
                target="_blank"
                rel="noreferrer"
              >
                {linkText}
              </StyledLink>
            </p>
          );
        }
        if (paragraph.includes("<press2>")) {
          const linkText = paragraph.replace(/<\/?press2>/g, "");
          return (
            <p key={index} style={{ marginLeft: "1rem" }}>
              <StyledLink
                href="https://secretlosangeles.com/new-grant-in-la-county-to-help-small-businesses-impacted-by-wildfires/"
                target="_blank"
                rel="noreferrer"
              >
                {linkText}
              </StyledLink>
            </p>
          );
        }
        if (paragraph.includes("<press3>")) {
          const linkText = paragraph.replace(/<\/?press3>/g, "");
          return (
            <p key={index} style={{ marginLeft: "1rem" }}>
              <StyledLink
                href="https://smdp.com/business/la-county-launches-dollar250000-grant-program-for-malibu-topanga-businesses/"
                target="_blank"
                rel="noreferrer"
              >
                {linkText}
              </StyledLink>
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
    </PageLayout>
  );
}
