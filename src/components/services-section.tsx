"use client"

import React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    title: "WASSEN, KNIPPEN\n& DROGEN",
    sections: [
      {
        category: "Knippen & Stylen",
        items: [
          { service: "Knippen kinderen (t/m 12 jaar)", price: "€ 27,50" },
          { service: "Knippen kinderen (t/m 12 jaar)", price: "€ 27,50" },
          { service: "Knippen kinderen (t/m 12 jaar)", price: "€ 27,50" },
        ],
      },
      {
        category: "Wassen, Knippen & Stylen",
        items: [
          { service: "Wassen, knippen, drogen (heren)", price: "€ 27,50" },
          { service: "Wassen, knippen, drogen (dames)", price: "€ 27,50" },
          { service: "Wassen, knippen, föhnen (half lang haar)", price: "€ 27,50" },
          { service: "Wassen, knippen, föhnen (lang haar)", price: "€ 27,50" },
        ],
      },
    ],
  },
  {
    title: "STYLING",
    sections: [
      {
        category: "Knippen & Stylen",
        items: [
          { service: "Knippen kinderen (t/m 12 jaar)", price: "€ 27,50" },
          { service: "Knippen kinderen (t/m 12 jaar)", price: "€ 27,50" },
          { service: "Knippen kinderen (t/m 12 jaar)", price: "€ 27,50" },
        ],
      },
      {
        category: "Wassen, Knippen & Stylen",
        items: [
          { service: "Wassen, knippen, drogen (heren)", price: "€ 27,50" },
          { service: "Wassen, knippen, drogen (dames)", price: "€ 27,50" },
          { service: "Wassen, knippen, föhnen (half lang haar)", price: "€ 27,50" },
          { service: "Wassen, knippen, föhnen (lang haar)", price: "€ 27,50" },
        ],
      },
    ],
  },
  {
    title: "KLEURINGEN",
    sections: [
      {
        category: "Knippen & Stylen",
        items: [
          { service: "Knippen kinderen (t/m 12 jaar)", price: "€ 27,50" },
          { service: "Knippen kinderen (t/m 12 jaar)", price: "€ 27,50" },
          { service: "Knippen kinderen (t/m 12 jaar)", price: "€ 27,50" },
        ],
      },
      {
        category: "Wassen, Knippen & Stylen",
        items: [
          { service: "Wassen, knippen, drogen (heren)", price: "€ 27,50" },
          { service: "Wassen, knippen, drogen (dames)", price: "€ 27,50" },
          { service: "Wassen, knippen, föhnen (half lang haar)", price: "€ 27,50" },
          { service: "Wassen, knippen, föhnen (lang haar)", price: "€ 27,50" },
        ],
      },
    ],
  },
]

function ServicesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: false,
  })

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex-none w-96 border border-gray-400 p-8"
              style={{ backgroundColor: "#DFD6C9" }}
            >
              <h3 className="text-xl font-medium text-black mb-8 whitespace-pre-line leading-tight">{service.title}</h3>

              {service.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-black font-medium">{section.category}</h4>
                    <span className="text-black font-medium">Prijs</span>
                  </div>

                  <div className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between items-center">
                        <span className="text-black text-sm">{item.service}</span>
                        <span className="text-black text-sm font-medium">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
    </div>
    </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="ghost" size="icon" onClick={scrollPrev} className="text-black hover:bg-black/10 rounded-none">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" onClick={scrollNext} className="text-black hover:bg-black/10 rounded-none">
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function ServicesSection() {
  return (
    <section className="py-16" style={{ backgroundColor: "#DFD6C9" }}>
      {/* Section Header with left padding only */}
      <div className="px-8 mb-12">
        <div className="max-w-[1265px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight">BEHANDELING</h2>
        </div>
      </div>

      {/* Services Carousel - extends to screen edge */}
      <div className="pl-8">
        <ServicesCarousel />
      </div>
    </section>
  )
}
