import { PageLayout } from "@/components/layout/PageLayout";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function McpWildfirePage() {
  const t = useTranslations("mcpWildfire");

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
        />
      </p>
      {t.raw("paragraphs").map((paragraph: string, index: number) => {
        if (paragraph.includes("<aidkit>")) {
          return (
            <p key={index}>
              {t.rich(`paragraphs.${index}`, {
                aidkit: (chunks) => (
                  <a
                    href="https://www.aidkit.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
          );
        }
        if (paragraph.includes("<casestudy>")) {
          const linkText = paragraph.replace(/<\/?casestudy>/g, "");
          return (
            <p key={index}>
              <a
                href="https://www.aidkit.com/publication/los-angeles-regional-wildfire-relief-programs"
                target="_blank"
                rel="noreferrer"
              >
                {linkText}
              </a>
            </p>
          );
        }
        if (paragraph.includes("<award>")) {
          const linkText = paragraph.replace(/<\/?award>/g, "");
          return (
            <p key={index}>
              <a
                href="https://www.aidkit.com/publication/aidkit-named-a-winner-in-the-2025-stevie-awards-for-technology-excellence"
                target="_blank"
                rel="noreferrer"
              >
                {linkText}
              </a>
            </p>
          );
        }
        if (paragraph.includes("<repo>")) {
          const linkText = paragraph.replace(/<\/?repo>/g, "");
          return (
            <p key={index}>
              <a
                href="https://github.com/devin2712/calfire-gis-mcp-server"
                target="_blank"
                rel="noreferrer"
              >
                {linkText}
              </a>
            </p>
          );
        }

        return <p key={index}>{paragraph}</p>;
      })}
    </PageLayout>
  );
}