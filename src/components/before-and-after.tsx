"use client"

import React, { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react"
import { Button } from "./ui/button"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"

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
  // Mobile-first smooth scrolling similar to other carousels
  loop: false,
  align: "start",
  slidesToScroll: 1,
  containScroll: "trimSnaps",
  })

  const [zoomSrc, setZoomSrc] = useState<string | null>(null)
  const [zoomAlt, setZoomAlt] = useState<string>("")
  const [zoomSize, setZoomSize] = useState<{ w: number; h: number } | null>(null)
  const reduceMotion = useReducedMotion()

  const openZoom = (src: string, alt: string) => {
    setZoomSrc(src)
    setZoomAlt(alt)
  }

  const closeZoom = () => {
    setZoomSrc(null)
    setZoomAlt("")
  setZoomSize(null)
  }

  useEffect(() => {
    if (!zoomSrc) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeZoom()
    }
    document.addEventListener("keydown", onKey)
    const { body } = document
    const prev = body.style.overflow
    body.style.overflow = "hidden"

    const img = new window.Image()
    img.src = zoomSrc
    img.onload = () => {
      const nw = img.naturalWidth || 1
      const nh = img.naturalHeight || 1
      const maxW = Math.min(window.innerWidth * 0.95, window.innerWidth - 32)
      const maxH = Math.min(window.innerHeight * 0.9, window.innerHeight - 32)
      const scale = Math.min(maxW / nw, maxH / nh)
      const w = Math.floor(nw * scale)
      const h = Math.floor(nh * scale)
      setZoomSize({ w, h })
    }
    return () => {
      document.removeEventListener("keydown", onKey)
      body.style.overflow = prev
    }
  }, [zoomSrc])

  const filteredData =
    activeFilter === "All" ? beforeAfterData : beforeAfterData.filter((item) => item.category === activeFilter)

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  return (
    <div className="w-full">
      <motion.div
        className="flex justify-center mb-12"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
      >
        <div className="inline-flex items-center gap-0.5 px-4 py-2 bg-transparent">
          {filterOptions.map((filter) => (
            <Button
              key={filter}
              type="button"
              variant="ghost"
              size="sm"
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className={`focus-visible:ring-2 focus-visible:ring-black/20 rounded-none px-3 py-1 text-xl font-medium transition-colors cursor-pointer ${
                activeFilter === filter
                  ? "bg-[#E6E4E1] text-black shadow-sm hover:bg-[#E6E4E1] hover:text-black"
                  : "text-black/70 hover:bg-[#E6E4E1] hover:text-black"
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>
  </motion.div>

      <div
        className="overflow-hidden md:overflow-visible w-full md:w-[calc((100vw+1256px)/2)]"
        ref={emblaRef}
      >
        <div className="flex gap-4 md:gap-0">
          {filteredData.map((item) => (
            <motion.div
              key={item.id}
              className="flex-[0_0_100%] md:flex-[0_0_85%] min-w-0 pr-0 md:pr-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-center">
                <div className="relative w-full aspect-square md:w-[512px] md:h-[512px] group">
                  <Image
                    src={item.beforeAfterImage || "/placeholder.svg"}
                    alt={`Before and after ${item.title}`}
                    fill
                    className="object-cover select-none"
                  />
                  <Button
                    type="button"
                    aria-label="Zoom image"
                    onClick={() => openZoom(item.beforeAfterImage || "/placeholder.svg", `Before and after ${item.title}`)}
                    variant="ghost"
                    size="icon"
                    className="hidden md:inline-flex absolute top-2 right-2 bg-transparent hover:bg-transparent text-black cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-black"
                  >
                    <ZoomIn className="h-5 w-5" />
                  </Button>
                </div>

                <div className="max-w-[480px]">
                  <motion.h3
                    className="text-4xl font-normal text-black mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p
                    className="text-black text-xl font-light leading-tight mb-10"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut", delay: reduceMotion ? 0 : 0.05 }}
                  >
                    {item.description}
                  </motion.p>

                  <ul  className="mb-6">
                    {item.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center text-black font-light text-xl leading-tight"
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut", delay: reduceMotion ? 0 : index * 0.05 }}
                      >
                        <span className="w-1.5 h-1.5   bg-black rounded-full mr-3 flex-shrink-0"></span>
                        {benefit}
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    className="flex gap-4 pt-4"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                  >
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
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Zoom Overlay */}
      {zoomSrc && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-[1px] flex items-center justify-center p-4"
          onClick={closeZoom}
          role="dialog"
          aria-modal
          aria-label="Zoomed image"
        >
          <div
            className="relative"
            style={{
              width: zoomSize?.w ? `${zoomSize.w}px` : "min(95vw, 1200px)",
              height: zoomSize?.h ? `${zoomSize.h}px` : "min(90vh, 800px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={zoomSrc} alt={zoomAlt} fill className="object-contain" priority />
            <Button
              type="button"
              aria-label="Close"
              onClick={closeZoom}
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-transparent hover:bg-transparent text-black cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function BeforeAndAfter() {
  return (
    <section className="pt-14 sm:pt-24 md:pt-32 lg:pt-48  xl:pt-[15.625rem]">
      {/* Section Header with centered alignment */}
      <motion.div
        className="max-w-7xl mx-auto px-8 mb-12"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="text-center">
          <h2 className="text-4xl md:text-[2.875rem]  text-black">VOOR & NA</h2>
        </div>
      </motion.div>

      {/* Before & After Carousel - constrained left column (1256px) but allows overflow to the right */}
      <div className="max-w-[1256px] mx-auto px-4 md:px-0 md:pl-8 !overflow-visible">
        <BeforeAfterCarousel />
      </div>
    </section>
  )
}