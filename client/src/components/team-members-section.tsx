"use client"

import React, { useState, useEffect } from "react"
import type { CarouselApi } from "@/components/ui/carousel"
import { Calendar, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import { TeamMemberData } from "@/types/strapi"
import { parseRichText } from "@/lib/utils"
import { createHeaderVariants, createItemVariants, createCardVariants, VIEWPORT_SETTINGS } from "@/lib/animations"

interface TeamMembersSectionProps {
  teamData: TeamMemberData
}

export default function TeamMembersSection({ teamData }: TeamMembersSectionProps) {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const reduceMotion = useReducedMotion()


  const headerContainer = createHeaderVariants(reduceMotion)
  const headerItem = createItemVariants(reduceMotion)
  const card = createCardVariants(reduceMotion)


  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())
    setCount(api.scrollSnapList().length)

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }
    
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
          viewport={VIEWPORT_SETTINGS}
        >
          <motion.h2 variants={headerItem} className="text-4xl lg:text-[2.875rem] text-black mb-4 lg:mb-0">
            {teamData.Title}
          </motion.h2>
          <motion.p
            variants={headerItem}
            className="text-black text-base lg:text-xl font-light leading-tight max-w-[70.375rem]"
          >
            {teamData.Description}
          </motion.p>
        </motion.div>

        <Carousel
          className="relative pb-11"
          opts={{ loop: true, align: "start", slidesToScroll: 1 }}
          setApi={(embla) => setApi(embla)}
        >
          <CarouselContent className="-ml-4">
            {teamData.TeamMember
              .sort((a, b) => a.Order - b.Order)
              .map((member) => (
              <CarouselItem
                key={member.id}
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <motion.div
                  variants={card}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_SETTINGS}
                >
                  <div className="mb-5.5 h-[28.3125rem] w-full relative">
                    {member.TeamMemberImage?.url && (
                      <Image
                        src={member.TeamMemberImage.url}
                        alt={member.Name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-3xl text-black leading-5">{member.Name.toUpperCase()}</h3>
                      <p className="text-black text-xl font-extralight leading-tight">({member.Role})</p>
                    </div>

                    <div className="max-w-[12.625rem] mx-auto space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 flex-none flex items-start justify-center pt-1">
                          {teamData.CalendarIcon?.url ? (
                            <Image src={teamData.CalendarIcon.url} alt="Calendar" width={22} height={22} className="w-5.5 h-5.5" />
                          ) : (
                            <Calendar className="w-5.5 h-5.5 text-black" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div 
                            className="text-black text-lg"
                            dangerouslySetInnerHTML={{ __html: parseRichText(member.Availability) }}
                          />
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 flex-none flex items-start justify-center pt-1">
                          {teamData.ScheduleIcon?.url ? (
                            <Image src={teamData.ScheduleIcon.url} alt="Schedule" width={22} height={22} className="w-5.5 h-5.5" />
                          ) : (
                            <RotateCcw className="w-5.5 h-5.5 text-black" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-black text-base font-extralight">{member.Schedule}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom Controls with Strapi Icons */}
          <div className="absolute top-full translate-y-6 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-12 flex items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => api?.scrollPrev()}
              disabled={current === 0}
              className="disabled:opacity-50 disabled:cursor-default cursor-pointer flex items-center justify-center transition-transform hover:scale-110 disabled:hover:scale-100"
            >
              {teamData.carouselButtons?.prevActiveIcon?.url && teamData.carouselButtons?.prevInactiveIcon?.url ? (
                <Image
                  src={current === 0 ? teamData.carouselButtons.prevInactiveIcon.url : teamData.carouselButtons.prevActiveIcon.url}
                  alt="Previous"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              ) : (
                <ChevronLeft className="w-12 h-12" />
              )}
            </button>
            
            {/* Next Button */}
            <button
              onClick={() => api?.scrollNext()}
              disabled={current === count - 1}
              className="disabled:opacity-50 disabled:cursor-default cursor-pointer flex items-center justify-center transition-transform hover:scale-110 disabled:hover:scale-100"
            >
              {teamData.carouselButtons?.nextActiveIcon?.url && teamData.carouselButtons?.nextInactiveIcon?.url ? (
                <Image
                  src={current === count - 1 ? teamData.carouselButtons.nextInactiveIcon.url : teamData.carouselButtons.nextActiveIcon.url}
                  alt="Next"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              ) : (
                <ChevronRight className="w-12 h-12" />
              )}
            </button>
          </div>
        </Carousel>
      </div>
    </section>
  )
}