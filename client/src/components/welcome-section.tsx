"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { WelcomeSectionData, WelcomeItem } from "@/types/strapi"
import { parseRichText } from "@/lib/utils"

interface WelcomeSectionProps {
  data: WelcomeSectionData
}

const WelcomeSection = ({ data }: WelcomeSectionProps) => {
  const reduceMotion = useReducedMotion()
  

  const sortedItems = data.welcomeItems?.sort((a, b) => a.order - b.order) || []
  
  return (
    <section className="pt-14 sm:pt-24 md:pt-32 lg:pt-48 xl:pt-[15.625rem] pb-[9.375rem]">
      <div className="max-w-[856px] mx-auto text-center px-6">
        <motion.h2
          className="text-4xl md:text-5xl font-light text-black mb-4 leading-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeOut" }}
        >
          {data.title.split(' ').map((word, index, array) => {
            if (index === array.length - 1) {
              return <span key={index} className="block">{word}</span>
            }
            return word + ' '
          })}
        </motion.h2>

        <motion.p
          className="text-xl font-light text-black mb-12 max-w-[680px] mx-auto leading-tight"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut", delay: reduceMotion ? 0 : 0.05 }}
        >
          {data.description}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-12">
          {sortedItems.map((item: WelcomeItem, idx: number) => (
            <motion.div
              key={item.id}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut", delay: reduceMotion ? 0 : Math.min(idx * 0.05, 0.25) }}
            >
              {item.icon && (
                <div className="mb-4">
                  <Image
                    src={item.icon.url}
                    alt={item.icon.alternativeText || item.title}
                    width={60}
                    height={60}
                    className="h-15 w-15"
                  />
                </div>
              )}
              <h3 className="font-medium text-4xl mb-2 text-black">{item.title}</h3>
              <div 
                className="text-xl font-light text-black"
                dangerouslySetInnerHTML={{ __html: parseRichText(item.description) }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WelcomeSection