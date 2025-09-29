import { Metadata } from 'next';

const baseUrl = 'https://devinnguyen.com';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Devin Nguyen',
    template: '%s | Devin Nguyen',
  },
  description: 'Software Engineer',
  keywords: ['Software Engineer', 'Developer', 'Devin Nguyen', 'Portfolio'],
  authors: [{ name: 'Devin Nguyen' }],
  creator: 'Devin Nguyen',
  publisher: 'Devin Nguyen',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icons/blue_arrow.svg', type: 'image/svg+xml' },
      { url: '/icons/blue_arrow_16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/blue_arrow_32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/blue_arrow_64.png', sizes: '64x64', type: 'image/png' },
      { url: '/icons/blue_arrow_192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/blue_arrow_512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/icons/blue_arrow_32.png',
    apple: '/icons/blue_arrow_192.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Devin Nguyen',
    title: 'Devin Nguyen',
    description: 'Software Engineer',
    images: [
      {
        url: `${baseUrl}/icons/blue_arrow_512.png`,
        width: 512,
        height: 512,
        alt: 'Devin Nguyen - Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Devin Nguyen',
    description: 'Software Engineer',
    creator: '@ddxdevin',
    images: [`${baseUrl}/icons/blue_arrow_512.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '7tYLFWNl8gb1UKWxoXxg2W8nHQ23wfpMIsGwxGySFHo',
  },
};

export function generatePageMetadata(
  title: string,
  description: string,
  image?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }
): Metadata {
  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title: `${title} | Devin Nguyen`,
      description,
    },
    twitter: {
      title: `${title} | Devin Nguyen`,
      description,
    },
  };

  if (image) {
    metadata.openGraph = {
      ...metadata.openGraph,
      images: [
        {
          url: image.url,
          width: image.width || 1200,
          height: image.height || 630,
          alt: image.alt || title,
        },
      ],
    };
    metadata.twitter = {
      ...metadata.twitter,
      card: 'summary_large_image',
      images: [image.url],
    };
  }

  return metadata;
}