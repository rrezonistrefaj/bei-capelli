"use client"

import React from 'react'
import type { SimpleImageSectionData, StrapiImage } from '@/types/strapi'

type SimpleImageSectionProps = {
  data: SimpleImageSectionData
}

function getImageUrl(image: StrapiImage | { data?: { url?: string; attributes?: { url: string } } } | undefined): string {
  if (!image) return ''
  
  let raw = '';
  if ('url' in image && image.url) {
    raw = image.url;
  } else if ('data' in image) {
    raw = image.data?.url || image.data?.attributes?.url || '';
  }
  
  if (!raw) return ''
  const base = process.env.NEXT_PUBLIC_STRAPI_URL
  if (!base) {
    console.error('NEXT_PUBLIC_STRAPI_URL is not configured')
    return raw.startsWith('http') ? raw : ''
  }
  return raw.startsWith('http') ? raw : `${base}${raw}`
}

export default function SimpleImageSection({ data }: SimpleImageSectionProps) {
  const title: string | undefined = data?.title || data?.Title
  const imageSrc = getImageUrl(data?.image || data?.fullWidthImage)
  
  const alt: string = (() => {
    const img = data?.image || data?.fullWidthImage;
    if (!img) return '';
    if ('alternativeText' in img && img.alternativeText) return img.alternativeText;
    if ('data' in img && img.data?.attributes?.alternativeText) return img.data.attributes.alternativeText;
    return '';
  })() as string

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {title ? (
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">{title}</h2>
        ) : null}

        {imageSrc ? (
          <div className="w-full overflow-hidden rounded-lg">
            <img
              src={imageSrc}
              alt={alt}
              className="w-full h-[420px] md:h-[520px] object-cover"
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}


