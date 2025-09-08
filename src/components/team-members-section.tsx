"use client"

import React, { useState, useEffect } from "react"
import type { CarouselApi } from "@/components/ui/carousel"
import { Calendar, RotateCcw } from "lucide-react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

const teamMembers = [
  {
    name: "SANDRA",
    role: "(Owner)",
    image: "/images/team-member-1.png",
    availability: "Tuesday, Thursday, Saturday",
    schedule: "Every other Wednesday",
    highlighted: false,
  },
  {
    name: "LIZZY",
    role: "(Stylist)",
    image: "/images/team-member-2.png",
    availability: "Tuesday, Thursday, Saturday",
    schedule: "Every other Wednesday",
    highlighted: false,
  },
  {
    name: "CYNTHIA",
    role: "(Stylist)",
    image: "/images/team-member-3.png",
    availability: "Tuesday, Thursday, Saturday",
    schedule: "Every other Wednesday",
    highlighted: false,
  },
  {
    name: "JOYCE",
    role: "(Stylist)",
    image: "/images/team-member-4.png",
    availability: "Tuesday, Thursday, Saturday",
    schedule: "Every other Wednesday",
    highlighted: false,
  },
  {
    name: "MARIA",
    role: "(Stylist)",
    image: "/images/team-member-1.png",
    availability: "Monday, Wednesday, Friday",
    schedule: "Every other Tuesday",
    highlighted: false,
  },
  {
    name: "ANNA",
    role: "(Stylist)",
    image: "/images/team-member-2.png",
    availability: "Wednesday, Friday, Sunday",
    schedule: "Every other Monday",
    highlighted: false,
  },
  {
    name: "SOPHIE",
    role: "(Colorist)",
    image: "/images/team-member-3.png",
    availability: "Tuesday, Thursday, Saturday",
    schedule: "Every other Friday",
    highlighted: false,
  },
  {
    name: "EMMA",
    role: "(Stylist)",
    image: "/images/team-member-4.png",
    availability: "Monday, Wednesday, Friday",
    schedule: "Every other Thursday",
    highlighted: false,
  },
]

export default function TeamMembersSection() {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const reduceMotion = useReducedMotion()

  // Animation variants
  const headerContainer = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: reduceMotion ? 0 : 0.06,
      },
    },
  } as const

  const headerItem = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.5, ease: "easeOut" },
    },
  } as const

  const card = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.5, ease: "easeOut" },
    },
  } as const

  // Track selection internally without unused state to satisfy eslint
  useEffect(() => {
    if (!api) return
    const onSelect = () => {
      // Selection side-effects can be added later if needed
      void api.selectedScrollSnap()
    }
    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api])

  return (
    <section className="py-14 sm:py-24 md:py-32 lg:py-48 xl:py-[15.625rem] px-4 xl:px-0">
      <div className="max-w-[79.062rem] mx-auto">
        <motion.div
          className="mb-12"
          variants={headerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2 variants={headerItem} className="text-4xl lg:text-[2.875rem] text-black mb-4 lg:mb-0">
            ONTMOET ONZE TOPSTYLISTEN
          </motion.h2>
          <motion.p
            variants={headerItem}
            className="text-black text-base lg:text-xl font-light leading-tight max-w-[70.375rem]"
          >
            De topstylisten van Bei Capelli Kapper Bennekom zorgen ervoor dat iedereen de aandacht krijgt die het verdient man, vrouw of kind en in iedere leeftijd, dat maakt ons niets uit. Wij luisteren aandachtig naar je wensen en onder het genot van onze heerlijke koffie geven wij het advies wat het beste bij je past. Ook willen wij je graag kennis laten maken met de producten waar wij mee werken en die zeer hoog aangeschreven staan. Nieuwsgierig? Loop eens binnen, wij zijn u graag van dienst!
          </motion.p>
        </motion.div>

        <Carousel
          className="relative pb-11"
          opts={{ loop: true, align: "start", slidesToScroll: 1 }}
          setApi={(embla) => setApi(embla)}
        >
          <CarouselContent className="-ml-4">
            {teamMembers.map((member, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <motion.div
                  variants={card}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <div className="mb-5.5 h-[28.3125rem] w-full relative">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-3xl text-black leading-5">{member.name}</h3>
                      <p className="text-black text-xl font-extralight leading-tight">{member.role}</p>
                    </div>

                    <div className="max-w-[12.625rem] mx-auto space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 flex-none flex items-start justify-center pt-1">
                          <Calendar className="w-5.5 h-5.5 text-black" />
                        </div>
                        <div className="flex-1">
                          <p className="text-black text-lg">
                            <span className="font-semibold">Available:</span> {member.availability}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 flex-none flex items-start justify-center pt-1">
                          <RotateCcw className="w-5.5 h-5.5 text-black" />
                        </div>
                        <div className="flex-1">
                          <p className="text-black text-base font-extralight">{member.schedule}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Controls: centered on mobile, bottom-right from sm+ */}
          <div className="absolute top-full translate-y-6 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-12 flex items-center gap-2">
            <CarouselPrevious
              className="!rounded-none w-10 h-10 border border-black/20 bg-transparent text-black/60 hover:bg-black hover:text-white"
            />
            <CarouselNext
              className="!rounded-none w-10 h-10 border border-black/20 bg-transparent text-black/60 hover:bg-black hover:text-white"
            />
          </div>
        </Carousel>
      </div>
    </section>
  )
}