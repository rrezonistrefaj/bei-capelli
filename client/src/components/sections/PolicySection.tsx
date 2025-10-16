"use client"

import React from 'react'
import { parseRichText } from '@/lib/utils'

export default function PolicySection({ data }: { data: any }) {
  const title: string | undefined = data?.title
  const blocks: Array<any> = Array.isArray(data?.blocks) ? data.blocks : []

  return (
    <section className="py-14 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {title ? (
          <h1 className="text-5xl font-light text-black mb-10">{title}</h1>
        ) : null}

        <div className="space-y-12">
          {blocks.map((block: any, idx: number) => (
            <div key={idx} className="text-gray-900">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: parseRichText(block?.body || block) }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


