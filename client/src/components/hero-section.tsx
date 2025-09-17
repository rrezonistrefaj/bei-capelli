"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import { HeroSectionData } from "@/types/strapi"

interface HeroSectionProps {
  heroData: HeroSectionData | null
}

export default function HeroSection({ heroData }: HeroSectionProps) {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
  } as const

  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as const

  return (
    <div className="min-h-screen relative">
      {/* Background Image (Next/Image) */}
      {heroData?.backgroundImage?.url && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroData.backgroundImage.url}
            alt={heroData.backgroundImage.alternativeText || ""}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      )}

      {/* Gradient Overlay for Header */}


      {/* Content Overlay: use flex column so inner content can use mt-auto to sit at bottom */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Hero Section */}
        <main className="flex flex-col flex-1 max-w-[1265px] mx-auto w-full px-4 xl:px-0 pb-[6.25rem] sm:pb-20 lg:pb-[6.25rem]">
          <motion.div
            className="max-w-3xl mt-auto"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            {/* Main Heading */}
            <motion.h1 variants={item} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-black leading-none">
              {heroData?.title?.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < heroData.title.split('\n').length - 1 && <br />}
                </span>
              ))}
            </motion.h1>
            <motion.hr variants={item} className="w-full border-t-1 border-black/90 mb-6 sm:mb-8" />
            {/* Description Text */}
            <motion.div variants={item} className="text-black text-lg sm:text-xl lg:text-2xl font-light mb-6 sm:mb-8">
              <p>
                {heroData?.description}
              </p>
            </motion.div>

            {/* CTA Button */}
              <motion.div variants={item}>
                <Button className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 px-2.5 py-6 text-xl rounded-none font-medium transition-colors duration-200">
                  {heroData?.buttonText}
                </Button>
              </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
