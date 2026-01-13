import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import ConcertsClient from "./ConcertsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Concert Log",
    description:
      "A searchable archive of live concerts and music performances I've attended.",
    alternates: {
      canonical: `https://devinnguyen.com/${locale}/concerts`,
    },
    openGraph: {
      title: "Concert Log by Devin Nguyen",
      description:
        "A searchable archive of live concerts and music performances I've attended.",
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
      title: "Concert Log by Devin Nguyen",
      description:
        "A searchable archive of live concerts and music performances I've attended.",
      creator: "@ddxdevin",
      card: "summary",
      images: ["https://devinnguyen.com/icons/blue_arrow_512.png"],
    },
  };
}

export default async function ConcertsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ConcertsClient />;
}
