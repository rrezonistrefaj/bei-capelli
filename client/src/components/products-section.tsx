"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { ProductSectionData } from "@/types/strapi"

interface ProductsSectionProps {
  data: ProductSectionData
}

export default function ProductsSection({ data }: ProductsSectionProps) {
  const reduceMotion = useReducedMotion()
  

  const parseDescription = (description: ProductSectionData['Description']) => {
    return description
      .filter(block => block.type === 'paragraph' && block.children.some(child => child.text.trim() !== ''))
      .map(block => 
        block.children
          .map(child => child.text)
          .join('')
          .trim()
      )
      .filter(text => text !== '')
  }
  
  const descriptionParagraphs = parseDescription(data.Description)
  return (
    <section className=" px-4 xl:px-0">
      <div className="max-w-[1256px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left text column */}
          <div className="lg:col-span-6">
            <motion.h2
              className="text-4xl md:text-5xl  text-black "
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeOut" }}
            >
              {data.Title}
            </motion.h2>

            <div className="mt-6 text-xl text-neutral-800 space-y-7 leading-tight max-w-[618px]">
              {descriptionParagraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ 
                    duration: reduceMotion ? 0 : 0.5, 
                    ease: "easeOut", 
                    delay: reduceMotion ? 0 : 0.05 * index 
                  }}
                >
                  {paragraph}
                </motion.p>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut", delay: reduceMotion ? 0 : 0.15 }}
              >
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="border border-gray-700 text-gray-800 text-xl font-light rounded-none px-4 py-5.5 cursor-pointer"
                  onClick={() => window.open(data.ButtonURL, '_blank')}
                >
                  <Image
                    src={data.ButtonIcon.url}
                    alt={data.ButtonIcon.alternativeText || "Button icon"}
                    width={20}
                    height={20}
                    className="w-5 h-5 "
                  />
                  {data.ButtonText}
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Right image column - product visuals stacked and centered */}
          <div className="lg:col-span-6 relative">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
              >
                <Image
                  src={data.ProductLogo.url}
                  alt={data.ProductLogo.alternativeText || "Oolaboo logo"}
                  width={data.ProductLogo.width || 220}
                  height={data.ProductLogo.height || 80}
                  className="w-[220px] mb-6 h-auto object-contain"
                  priority
                />
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeOut", delay: reduceMotion ? 0 : 0.05 }}
              >
                <Image
                  src={data.ProductImage.url}
                  alt={data.ProductImage.alternativeText || "Oolaboo products"}
                  width={data.ProductImage.width || 600}
                  height={data.ProductImage.height || 600}
                  className="w-[420px] md:w-[520px] lg:w-[600px] h-auto object-contain"
                />
                {/* subtle shadow under products to mimic design */}
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-6 h-12 bg-gradient-to-t from-black/10 to-transparent blur-xl opacity-80 rounded-full mx-auto w-[70%]" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}