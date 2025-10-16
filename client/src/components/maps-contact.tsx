
"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ContactSectionData, ContactCard } from '@/types/strapi'

interface MapsContactProps {
  data?: ContactSectionData
}

const MapsContact: React.FC<MapsContactProps> = ({ data }) => {
  const reduceMotion = useReducedMotion()
  

  if (!data) {
    return (
      <div className="px-4 xl:px-0 relative">
        <div className="relative max-w-[1256px] mx-auto">
          <div className="w-full h-[420px] md:h-[500px] border border-black flex items-center justify-center">
            <p className="text-xl font-light text-black">Loading contact section...</p>
          </div>
        </div>
      </div>
    )
  }
  

  const sortedCards = data.contactCards?.sort((a, b) => a.order - b.order) || []

  return (
  <div className=" px-4 xl:px-0 relative">
      <div className="relative max-w-[1256px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, ease: 'easeOut' }}
      >
      <iframe
        src={data.mapEmbedUrl}
        width="100%"
        height="500"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-[420px] md:h-[500px] border border-black"
      />
      </motion.div>

      <div className="relative mt-6 md:mt-0 md:absolute md:-bottom-40 md:left-4 md:right-4 flex flex-col sm:flex-row items-stretch md:justify-center gap-4 ">
        {sortedCards.map((card: ContactCard, index: number) => (
          <motion.div
            key={card.id}
            className="border border-black p-5 text-center w-full md:flex-1 md:max-w-[220px] bg-[#E0D7C9]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: 'easeOut', delay: reduceMotion ? 0 : index * 0.06 }}
          >
            <div className="flex justify-center mb-2">
              {card.icon && (
                <Image
                  src={card.icon.url}
                  alt={card.icon.alternativeText || card.title}
                  width={52}
                  height={52}
                  className="w-13 h-13"
                />
              )}
            </div>
            <h3 className="text-xl font-normal text-black mb-3.5">{card.title}</h3>
            <div className="flex flex-col justify-center min-h-[60px]">
              <div className="text-black text-base font-light text-center">
                {card.content.map((line: string, lineIndex: number) => (
                  <p key={lineIndex} className="text-center">{line}</p>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </div>
  )
}

export default MapsContact