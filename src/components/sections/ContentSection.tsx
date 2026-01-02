"use client"

import { useState } from 'react';
import RichText from '@/components/ui/RichText';
import type { ContentSectionData, StrapiImage } from '@/types/strapi';

interface ImageCarouselProps {
  images: Array<{
    url: string;
    alternativeText?: string;
    caption?: string;
  }>;
  className?: string;
}

function ImageCarousel({ images, className = '' }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className={`w-full h-[400px] md:h-[500px] bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className={`w-full ${className}`}>
        <img
          src={images[0].url}
          alt={images[0].alternativeText || ''}
          className="w-full h-[400px] md:h-[500px] object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      <img
        src={images[currentIndex].url}
        alt={images[currentIndex].alternativeText || ''}
        className="w-full h-[400px] md:h-[500px] object-cover"
      />

      {images.length > 1 && (
        <>
          {/* Navigation dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            aria-label="Previous image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            aria-label="Next image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

interface OverlayCardProps {
  title?: string;
  content?: string;
  buttonLabel?: string;
  buttonUrl?: string;
  className?: string;
}

function OverlayCard({ title, content, buttonLabel, buttonUrl, className = '' }: OverlayCardProps) {
  return (
    <div className={`bg-black/80 text-white p-6 md:p-8 rounded-lg shadow-lg backdrop-blur-sm ${className}`}>
      {title ? <h3 className="text-2xl md:text-3xl font-semibold mb-3">{title}</h3> : null}
      {content ? (
        <RichText content={content} className="prose prose-invert max-w-none mb-4 break-words" />
      ) : null}
      {buttonLabel && buttonUrl ? (
        <a
          href={buttonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-white text-black rounded hover:bg-gray-100 transition-colors font-medium w-fit"
        >
          {buttonLabel}
        </a>
      ) : null}
    </div>
  );
}

export default function ContentSection({ data }: { data: ContentSectionData }) {
  // Handle multiple images from Strapi
  let images: Array<{ url: string; alternativeText?: string; caption?: string }> = [];

  // Helper to ensure absolute Strapi URLs on the client (in case API didn't normalize)
  const STRAPI_BASE = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!STRAPI_BASE) {
    throw new Error('NEXT_PUBLIC_STRAPI_URL environment variable is required');
  }
  const toAbsolute = (url?: string | null): string => {
    if (!url) return '';
    return url.startsWith('http') ? url : `${STRAPI_BASE}${url}`;
  };

  if (Array.isArray(data?.images)) {
    images = data.images
      .filter((img: StrapiImage): img is StrapiImage => !!(img && img.url))
      .map((img: StrapiImage) => ({
        url: img.url,
        alternativeText: img.alternativeText || undefined,
        caption: img.caption || undefined
      }));
  } else if (data?.images && typeof data.images === 'object' && 'data' in data.images && Array.isArray(data.images.data)) {
    // Handle Strapi's populate=* structure
    images = data.images.data
      .filter((img: StrapiImage): img is StrapiImage => !!(img && (img.url || img?.attributes?.url)))
      .map((img: StrapiImage) => ({
        url: img.url || img.attributes?.url || '',
        alternativeText: img.alternativeText || img.attributes?.alternativeText || undefined,
        caption: img.caption || img.attributes?.caption || undefined
      }));
  }

  // Ensure absolute URLs for carousel images
  images = images.map((img) => ({
    ...img,
    url: toAbsolute(img.url)
  }));
  

  // Check if we have a full-width image with overlay card
  const hasFullWidthImage = (() => {
    if (!data?.fullWidthImage) return false;
    if ('url' in data.fullWidthImage && data.fullWidthImage.url) return true;
    if ('data' in data.fullWidthImage) {
      return !!(data.fullWidthImage.data?.url || data.fullWidthImage.data?.attributes?.url);
    }
    return false;
  })();

  return (
    <>
      {/* Main content section - Text + Image layout */}
      <section className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 py-16 px-4 md:px-6">
        <div className="flex flex-col justify-center">
          {/* Multiple headings support */}
          {data?.headings && Array.isArray(data.headings) ? (
            <div className="mb-6">
              {data.headings.map((heading: string, index: number) => (
                <h2 
                  key={index} 
                  className={`text-4xl md:text-5xl font-bold text-black ${
                    index > 0 ? 'mt-4' : ''
                  }`}
                >
                  {heading}
                </h2>
              ))}
            </div>
          ) : data?.heading ? (
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">{data.heading}</h2>
          ) : null}

          {data?.richText ? (
            (() => {
              return (
                <RichText 
                  content={data.richText} 
                  className="text-lg text-black leading-relaxed"
                />
              );
            })()
          ) : null}

          {data?.buttonLabel && data?.buttonUrl ? (
            <a
              href={data.buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors w-fit"
            >
              {data.buttonLabel}
            </a>
          ) : null}
        </div>

        <ImageCarousel images={images} />
      </section>

      {/* Full-width image with overlay card */}
      {hasFullWidthImage && (
        <section className="relative w-full">
          <img
            src={(() => {
              const img = data.fullWidthImage;
              if (!img) return '';
              let url = '';
              if ('url' in img && img.url) {
                url = img.url;
              } else if ('data' in img) {
                url = img.data?.url || img.data?.attributes?.url || '';
              }
              const strapiBase = process.env.NEXT_PUBLIC_STRAPI_URL;
              if (!strapiBase) {
                console.error('NEXT_PUBLIC_STRAPI_URL is not configured');
                return url || '';
              }
              return url?.startsWith('http') ? url : `${strapiBase}${url}`;
            })()}
            alt={(() => {
              const img = data.fullWidthImage;
              if (!img) return '';
              if ('alternativeText' in img && img.alternativeText) return img.alternativeText;
              if ('data' in img && img.data?.attributes?.alternativeText) return img.data.attributes.alternativeText;
              return '';
            })()}
            className="w-full h-[420px] md:h-[520px] object-cover"
          />

          {/* Overlay Card aligned to content container (matches carousel width) */}
          <div className="absolute inset-0">
            <div className="max-w-6xl mx-auto h-full px-4 md:px-6 flex items-start justify-end">
              <OverlayCard
                title={data?.overlayTitle}
                content={data?.overlayContent}
                buttonLabel={data?.overlayButtonLabel}
                buttonUrl={data?.overlayButtonUrl}
                className="max-w-lg md:max-w-xl lg:max-w-2xl"
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
