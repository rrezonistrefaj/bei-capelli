import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://beicapelli.com";
const siteName = "Bei Capelli";
const defaultDescription = "Hair Saloon - Professional hair styling and beauty services.";

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  locale?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export function generateMetadata({
  title,
  description = defaultDescription,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  locale = "en",
  noindex = false,
  nofollow = false,
}: GenerateMetadataOptions = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const ogImage = image || `${siteUrl}/og-image.jpg`;
  const canonicalUrl = `${siteUrl}${locale !== "en" ? `/${locale}` : ""}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: [
      "hair salon",
      "hair styling",
      "beauty services",
      "haircut",
      "hair coloring",
      "hair treatment",
    ],
    authors: authors ? authors.map((name) => ({ name })) : undefined,
    creator: siteName,
    publisher: siteName,
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type,
      locale: locale === "en" ? "en_US" : "nl_NL",
      url: canonicalUrl,
      siteName,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || siteName,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    metadataBase: new URL(siteUrl),
  };

  return metadata;
}

export function generateArticleMetadata({
  title,
  description,
  image,
  publishedTime,
  modifiedTime,
  authors,
  locale = "en",
}: {
  title: string;
  description: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  locale?: string;
}): Metadata {
  return generateMetadata({
    title,
    description,
    image,
    type: "article",
    publishedTime,
    modifiedTime,
    authors,
    locale,
  });
}

