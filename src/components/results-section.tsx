"use client"

import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const cards = [
  {
    title: "GELEGENHEIDS MAKE-UP",
    copy:
      "Op de mooiste dag van je leven, je trouwdag, moet alles kloppen, moet jij stralen en heerlijk kunnen genieten. Daar helpen onze haar stylisten jouw graag bij. Zelfs een proefkapsel behoort tot de mogelijkheden om zo optimaal voorbereid te zijn op de grote dag.",
    image: "/images/results-image-1.png",
  },
  {
    title: "GELEGENHEIDS MAKE-UP",
    copy:
      "Op de mooiste dag van je leven, je trouwdag, moet alles kloppen, moet jij stralen en heerlijk kunnen genieten. Daar helpen onze haar stylisten jouw graag bij. Zelfs een proefkapsel behoort tot de mogelijkheden om zo optimaal voorbereid te zijn op de grote dag.",
    image: "/images/results-image-2.png",
  },
]

export default function ResultsSection() {
  return (
    <section className="py-12" style={{ backgroundColor: "#DFD6C9" }}>
      <div className="max-w-[1265px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, idx) => (
            <article
              key={idx}
              className="border border-gray-700 bg-transparent"
              style={{ backgroundColor: "#DFD6C9" }}
            >
              <div className="w-full h-64 md:h-72 relative">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="p-8 border-t border-gray-700 ">
                <h3 className="text-2xl md:text-3xl text-gray-800 font-light tracking-wide mb-4">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-800 mb-6 whitespace-normal">
                  {card.copy}
                </p>

                <Button
                  variant="ghost"
                  size="sm"
                  className="border border-gray-700 text-gray-800 hover:bg-transparent rounded-none"
                >
                  Meer Informatie
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}