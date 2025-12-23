"use client"

import React from 'react'
import RichText from '@/components/ui/RichText'
import type { PolicySectionData, PolicyBlock } from '@/types/strapi'

export default function PolicySection({ data }: { data: PolicySectionData }) {
  const title: string | undefined = data?.title
  const blocks: PolicyBlock[] = Array.isArray(data?.blocks) ? data.blocks : []

  return (
    <section className="py-14 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {title ? (
          <h1 className="text-5xl font-light text-black mb-10">{title}</h1>
        ) : null}

        <div className="space-y-12">
          {blocks.map((block: PolicyBlock, idx: number) => {
            // Handle both body field and direct block content
            const content = block?.body || block;
            return (
              <div key={idx} className="text-gray-900">
                <RichText content={content} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}


