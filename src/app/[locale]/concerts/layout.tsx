import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  openGraph: {
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
    images: ["https://devinnguyen.com/icons/blue_arrow_512.png"],
  },
};

type Props = {
  children: ReactNode;
};

export default function ConcertsLayout({ children }: Props) {
  return children;
}