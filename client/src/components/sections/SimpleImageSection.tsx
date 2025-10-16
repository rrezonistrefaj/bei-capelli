"use client"

import React from 'react'

type SimpleImageSectionProps = {
  data: any
}

function getImageUrl(image: any): string {
  if (!image) return ''
  const raw = image.url || image?.data?.url || image?.data?.attributes?.url
  if (!raw) return ''
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
  return raw.startsWith('http') ? raw : `${base}${raw}`
}

export default function SimpleImageSection({ data }: SimpleImageSectionProps) {
  const title: string | undefined = data?.title || data?.Title
  const imageSrc = getImageUrl(data?.image || data?.fullWidthImage)
  const alt =
    data?.image?.alternativeText ||
    data?.image?.data?.attributes?.alternativeText ||
    data?.fullWidthImage?.alternativeText ||
    data?.fullWidthImage?.data?.attributes?.alternativeText ||
    ''

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


