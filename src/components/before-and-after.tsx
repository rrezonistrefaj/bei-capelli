"use client"

import React, { useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BeforeAfterItem {
  id: string
  category: string
  title: string
  description: string
  benefits: string[]
  beforeAfterImage: string
}

const beforeAfterData: BeforeAfterItem[] = [
  {
    id: "1",
    category: "Stylen",
    title: "Stylen",
    description:
      "See how our Glass Hair Treatment transforms unmanageable hair into a smooth, high-shine masterpiece. Ideal for any hair type needing a hydration boost and that Insta-g finish.",
    benefits: ["Long-lasting Shine", "Anti-Frizz Technology", "Deep Hydration Boost", "Heat Protection included"],
    beforeAfterImage: "/images/products-1.png",
  },
  {
    id: "2",
    category: "Kleuringen",
    title: "Kleuringen",
    description:
      "Transform your look with our professional coloring services. From subtle highlights to dramatic color changes, our expert colorists create stunning results.",
    benefits: [
      "Professional Color Matching",
      "Long-lasting Results",
      "Hair Health Protection",
      "Custom Color Consultation",
    ],
    beforeAfterImage: "/images/products-2.png",
  },
  {
    id: "3",
    category: "Knippen",
    title: "Knippen",
    description:
      "Experience precision cutting techniques that enhance your natural features and lifestyle. Our stylists create cuts that grow out beautifully.",
    benefits: [
      "Precision Cutting Techniques",
      "Face Shape Analysis",
      "Lifestyle-Friendly Styles",
      "Professional Styling Tips",
    ],
    beforeAfterImage: "/images/products-1.png",
  },
  {
    id: "4",
    category: "Stylen",
    title: "Volume Styling",
    description:
      "Add incredible volume and texture to fine or flat hair with our specialized styling techniques and premium products.",
    benefits: ["Volume Enhancement", "Texture Creation", "Long-lasting Hold", "Damage-Free Techniques"],
    beforeAfterImage: "/images/products-2.png",
  },
]

const filterOptions = ["All", "Kleuringen", "Stylen", "Knippen"]

export function BeforeAfterCarousel() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: false, // Allow overflow to show partial next slide
  })

  const filteredData =
    activeFilter === "All" ? beforeAfterData : beforeAfterData.filter((item) => item.category === activeFilter)

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  return (
    <div className="w-full">
      {/* Filter Buttons */}
      <div className="flex justify-center gap-6 mb-12">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 text-sm font-medium transition-colors ${
              activeFilter === filter ? "text-black border-b-2 border-black" : "text-gray-600 hover:text-black"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Carousel */}
      {/*
        Use a computed CSS width so the embla viewport starts at the constrained
        left edge (the max-w-[1256px] wrapper) but stretches toward the
        viewport right edge so the next slide peeks in.
        calc((100vw + 1256px) / 2) === 0.5 * 100vw + 628px — a simple expression
        that works when the constrained area is centered. Keep overflow-visible.
      */}
      <div
        className="overflow-visible"
        ref={emblaRef}
        style={{ width: "calc((100vw + 1256px) / 2)" }}
      >
        <div className="flex">
          {filteredData.map((item) => (
            <div key={item.id} className="flex-[0_0_85%] min-w-0 pr-8">
              {" "} {/* Changed from 100% to 85% width and added right padding */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Before/After Image */}
                <div className="relative">
                  <img
                    src={item.beforeAfterImage || "/placeholder.svg"}
                    alt={`Before and after ${item.title}`}
                    className="w-full h-[400px] object-cover"
                  />
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-black">{item.title}</h3>

                  <p className="text-black text-lg leading-relaxed">{item.description}</p>

                  <ul className="space-y-2">
                    {item.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-black">
                        <span className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  {/* Navigation Arrows */}
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={scrollPrev}
                      className="p-2 hover:bg-black/10 rounded-full transition-colors"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-6 h-6 text-black" />
                    </button>
                    <button
                      onClick={scrollNext}
                      className="p-2 hover:bg-black/10 rounded-full transition-colors"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-6 h-6 text-black" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function BeforeAndAfter() {
  return (
    <section className="py-16" style={{ backgroundColor: "#DFD6C9" }}>
      {/* Section Header with centered alignment */}
      <div className="max-w-7xl mx-auto px-8 mb-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-8 tracking-tight">VOOR & NA</h2>
        </div>
      </div>

      {/* Before & After Carousel - constrained left column (1256px) but allows overflow to the right */}
      <div className="max-w-[1256px] mx-auto pl-8 !overflow-visible">
        <BeforeAfterCarousel />
      </div>
    </section>
  )
}