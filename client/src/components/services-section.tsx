"use client"

import React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, useReducedMotion } from "framer-motion"

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

function ServicesCarousel({ title }: { title?: string }) {
  const reduceMotion = useReducedMotion()
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: false,
  })

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  return (
    <div className="relative">
      <div className="max-w-[79.0625rem] px-4 xl:px-0 mx-auto overflow-visible">
        {title && (
          <motion.h2
            className="text-4xl md:text-5xl font-normal text-black mb-10.5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeOut" }}
          >
            {title}
          </motion.h2>
        )}

  <div className="overflow-hidden md:overflow-visible w-full  md:w-[calc((100vw+1265px)/2)]" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-0">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="flex-none w-full md:w-[min(86vw,513px)] md:mr-6 border border-black/40 p-8 md:p-[1.5625rem] flex flex-col"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
            >
              <div className="min-h-[3.5rem] md:min-h-[5.5rem] mb-8">
                <h3 className="text-2xl md:text-4xl font-light text-black whitespace-pre-line leading-tight">{service.title}</h3>
              </div>

              <div className="space-y-12.5">
                {service.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <div className="grid grid-cols-[1fr_auto] items-center gap-x-6 mb-4">
                      <h4 className="text-lg sm:text-xl font-normal text-black">{section.category}</h4>
                      <span className="text:lg sm:text-xl font-normal text-black">Prijs</span>
                    </div>

                    <div>
                      {section.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className={`grid grid-cols-[1fr_auto] items-center gap-x-6 pt-3.5 ${
                            itemIndex !== section.items.length - 1 ? "pb-3.5 border-b border-black/10" : "pb-0"
                          }`}
                        >
                          <span className="text-black text-lg sm:text-xl font-light">{item.service}</span>
                          <span className="text-black text-lg sm:text-xl font-light">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
          </div>
        </div>

        <motion.div
          className="flex justify-end gap-4 mt-8 pr-8"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
        >
          <Button variant="ghost" size="icon" onClick={scrollPrev} className="text-black hover:bg-black/10 rounded-none">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" onClick={scrollNext} className="text-black hover:bg-black/10 rounded-none">
            <ChevronRight className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

export default function ServicesSection() {
  return (
    <section>
      <div className=" w-full">
        <ServicesCarousel title="BEHANDELING" />
      </div>
    </section>
  )
}
