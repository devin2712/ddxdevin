import { PageLayout } from "@/components/layout/PageLayout";
import { StyledLink } from "@/components/ui/StyledLink";
import { useTranslations } from "next-intl";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    openGraph: {
      title: "COVID Appointment Notifications",
      description:
        "Get COVID-19 Vaccine Notifications using Twilio Serverless Functions",
      images: [
        {
          url: "https://devinnguyen.com/images/covidappointments/banner.png",
          width: 500,
          height: 263,
          alt: "COVID appointments banner",
        },
      ],
    },
    twitter: {
      title: "COVID Appointment Notifications",
      description:
        "Get COVID-19 Vaccine Notifications using Twilio Serverless Functions",
      creator: "@ddxdevin",
      card: "summary_large_image",
      images: ["https://devinnguyen.com/images/covidappointments/banner.png"],
    },
  };
}

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
                  <StyledLink
                    href="https://github.com/devin2712/our-turn"
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
        if (paragraph.includes("<medium>")) {
          return (
            <p key={index}>
              {t.rich(`paragraphs.${index}`, {
                medium: (chunks) => (
                  <StyledLink
                    href="https://ddxdevin.medium.com/build-a-covid-19-vaccine-appointment-notification-system-with-a-twilio-serverless-function-23cf328c01f4"
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
        return <p key={index}>{paragraph}</p>;
      })}{" "}
    </PageLayout>
  );
}
