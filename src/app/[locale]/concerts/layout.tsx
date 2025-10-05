import type { Metadata } from "next";
import { ReactNode } from "react";
import { QueryProvider } from "@/components/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Concert Log - Devin Nguyen",
  description: "Set list of concerts attended.",
  openGraph: {
    title: "Concert Log - Devin Nguyen",
    description: "Set list of concerts attended.",
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
    title: "Concert Log - Devin Nguyen",
    description: "Set list of concerts attended.",
    images: ["https://devinnguyen.com/icons/blue_arrow_512.png"],
  },
};

type Props = {
  children: ReactNode;
};

export default function ConcertsLayout({ children }: Props) {
  return <QueryProvider>{children}</QueryProvider>;
}