"use client"

import React, { useState, useEffect } from "react"
import type { CarouselApi } from "@/components/ui/carousel"
import { Calendar, RotateCcw } from "lucide-react"
import Image from "next/image"
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
    role: "(Senior Stylist)",
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
    role: "(Junior Stylist)",
    image: "/images/team-member-4.png",
    availability: "Monday, Wednesday, Friday",
    schedule: "Every other Thursday",
    highlighted: false,
  },
]

export default function TeamMembersSection() {
  const [selected, setSelected] = useState(0)
  const [api, setApi] = useState<CarouselApi | null>(null)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setSelected(api.selectedScrollSnap())
    // set initial
    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api])

  return (
    <section className="py-16 px-8" style={{ backgroundColor: "#DFD6C9" }}>
      <div className="max-w-[1265px] mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight">ONTMOET ONZE TOPSTYLISTEN</h2>
          <p className="text-black text-lg leading-relaxed max-w-4xl">
            De topstylisten van Bei Capelli Kapper Bennekom zorgen ervoor dat iedereen de aandacht krijgt die het
            verdient man, vrouw of kind en in iedere leeftijd, dat maakt ons niets uit! Wij luisteren aandachtig naar
            je wensen en onder het genot van onze heerlijke koffie geven wij het advies wat het beste bij je past.
          </p>
        </div>

        <Carousel
          className="relative pb-16"
          opts={{ loop: true, align: "start", slidesToScroll: 1 }}
          setApi={(embla) => setApi(embla)}
        >
          <CarouselContent className="-ml-4">
            {teamMembers.map((member, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4"
              >
                <div>
                  <div className="mb-4 h-96 w-full relative">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-black">{member.name}</h3>
                      <p className="text-black text-sm">{member.role}</p>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-black mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-black text-sm">
                          <span className="font-medium">Available:</span> {member.availability}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <RotateCcw className="w-4 h-4 text-black mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-black text-sm">{member.schedule}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Bottom-right controls (shadcn Carousel controls) */}
          <div className="absolute right-8 top-full translate-y-6 flex items-center gap-2">
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