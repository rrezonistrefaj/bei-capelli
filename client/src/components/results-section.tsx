"use client"

import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

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
  const [api, setApi] = React.useState<CarouselApi | null>(null)
  const [canPrev, setCanPrev] = React.useState(false)
  const [canNext, setCanNext] = React.useState(false)
  const reduceMotion = useReducedMotion()

  React.useEffect(() => {
    if (!api) return
    const onSelect = () => {
      setCanPrev(api.canScrollPrev())
      setCanNext(api.canScrollNext())
    }
    onSelect()
    api.on("reInit", onSelect)
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  return (
    <section className=" px-4 xl:px-0">
      <div className="max-w-[1265px] mx-auto">
        {/* Mobile: Carousel */}
        <div className="block md:hidden">
          <Carousel className="" setApi={setApi}>
            <CarouselContent>
              {cards.map((card, idx) => (
                <CarouselItem key={idx}>
                  <motion.article
                    className="border border-gray-700 bg-transparent"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
                  >
                    <div className="w-full h-64 relative">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="px-[1.5625rem] pt-13.5 pb-[2.6875rem]">
                      <h3 className="text-2xl text-gray-800 font-light mb-2.5">
                        {card.title}
                      </h3>
                      <p className="text-xl text-gray-800 mb-13.5 font-light max-w-[484px]">
                        {card.copy}
                      </p>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="border border-gray-700 text-gray-800 text-xl font-light hover:bg-transparent rounded-none px-10.5 py-5.5"
                      >
                        Meer Informatie
                      </Button>
                    </div>
                  </motion.article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {/* Bottom navigation buttons */}
          <motion.div
            className="mt-4 flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
          >
            <Button
              variant="outline"
              size="icon"
              className="rounded-full size-8"
              onClick={() => api?.scrollPrev()}
              disabled={!canPrev}
              aria-label="Previous slide"
            >
              <ArrowLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full size-8"
              onClick={() => api?.scrollNext()}
              disabled={!canNext}
              aria-label="Next slide"
            >
              <ArrowRight />
            </Button>
          </motion.div>
        </div>

        {/* Desktop: Grid (no carousel) */}
        <div className="hidden md:grid grid-cols-2 gap-8">
          {cards.map((card, idx) => (
            <motion.article
              key={idx}
              className="border border-gray-700 bg-transparent"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
            >
              <div className="w-full h-72 relative">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 1265px) 50vw, 632px"
                  className="object-cover"
                />
              </div>

              <div className="px-[1.5625rem] pt-13.5 pb-[2.6875rem]">
                <h3 className="text-3xl text-gray-800 font-light mb-2.5">
                  {card.title}
                </h3>
                <p className="text-xl text-gray-800 mb-13.5 font-light max-w-[484px]">
                  {card.copy}
                </p>

                <Button
                  variant="ghost"
                  size="sm"
                  className="border border-gray-700 text-gray-800 text-xl font-light hover:bg-transparent rounded-none px-10.5 py-5.5"
                >
                  Meer Informatie
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}