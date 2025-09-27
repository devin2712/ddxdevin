import { PageLayout } from "@/components/layout/PageLayout";
import { useTranslations } from "next-intl";

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
                  <a
                    href="https://github.com/devin2712/myturn-monitor"
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
        return <p key={index}>{paragraph}</p>;
      })}
    </PageLayout>
  );
}