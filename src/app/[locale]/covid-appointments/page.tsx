import { PageLayout } from "@/components/layout/PageLayout";
import { StyledLink } from "@/components/ui/StyledLink";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
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
    title: "COVID Appointment Notifications",
    alternates: {
      canonical: `https://devinnguyen.com/${locale}/covid-appointments`,
    },
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

export default async function CovidAppointmentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("covidAppointments");

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
          priority
          fetchPriority="high"
        />
      </p>
      {t.raw("paragraphs").map((paragraph: string, index: number) => (
        <p key={index}>{paragraph}</p>
      ))}
      <div
        style={{
          margin: "2rem 0",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <GitHubRepoDisplay
          username="devin2712"
          repoName="our-turn"
          url="https://github.com/devin2712/our-turn"
        />
        <StyledLink
          href="https://ddxdevin.medium.com/build-a-covid-19-vaccine-appointment-notification-system-with-a-twilio-serverless-function-23cf328c01f4"
          target="_blank"
          rel="noreferrer"
        >
          {t("setupGuide")}
        </StyledLink>
      </div>
    </PageLayout>
  );
}
