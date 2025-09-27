import { PageLayout } from "@/components/layout/PageLayout";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function CovidAppointmentsPage() {
  const t = useTranslations("covidAppointments");

  return (
    <PageLayout
      header={{
        title: t("title"),
        description: "2020",
        as: "h1",
      }}
    >
      <p>
        <Image
          src="/images/covidappointments/banner.png"
          alt={t("image")}
          width={500}
          height={263}
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
        if (paragraph.includes("<github>")) {
          return (
            <p key={index}>
              {t.rich(`paragraphs.${index}`, {
                github: (chunks) => (
                  <a
                    href="https://github.com/devin2712/our-turn"
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
      })}{" "}
    </PageLayout>
  );
}
