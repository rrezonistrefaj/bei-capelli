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
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { getResultsSectionData } from "@/lib/api"
import { ResultsSectionData, ResultCard } from "@/types/strapi"

interface ResultsSectionProps {
  data?: ResultsSectionData
}

export default function ResultsSection({ data }: ResultsSectionProps) {
  const [api, setApi] = React.useState<CarouselApi | null>(null)
  const [canPrev, setCanPrev] = React.useState(false)
  const [canNext, setCanNext] = React.useState(false)
  const [cards, setCards] = React.useState<Array<{
    title: string
    copy: string
    image: string
    buttonText: string
    buttonUrl: string
    buttonTarget: "_self" | "_blank"
  }>>([])
  const [isLoading, setIsLoading] = React.useState(!data)
  const [error, setError] = React.useState<string | null>(null)
  const reduceMotion = useReducedMotion()

  // Process Strapi data
  React.useEffect(() => {
    if (data?.ResultCard && Array.isArray(data.ResultCard)) {
      const processedCards = data.ResultCard
        .sort((a, b) => (a.Order || 0) - (b.Order || 0))
        .map((card: ResultCard) => ({
          title: card.Title,
          copy: card.Description,
          image: card.CardImage?.url || "/images/placeholder.png",
          buttonText: card.ButtonText || "Meer Informatie",
          buttonUrl: card.ButtonURL || "#",
          buttonTarget: "_self" as const, // Default to _self since ButtonTarget doesn't exist in current structure
        }))
      setCards(processedCards)
      setIsLoading(false)
    } else if (!data) {
      // If no data prop provided, fetch from Strapi
      const fetchData = async () => {
        try {
          const strapiData = await getResultsSectionData()
          if (strapiData?.ResultCard && Array.isArray(strapiData.ResultCard)) {
            const processedCards = strapiData.ResultCard
              .sort((a, b) => (a.Order || 0) - (b.Order || 0))
              .map((card: ResultCard) => ({
                title: card.Title,
                copy: card.Description,
                image: card.CardImage?.url || "/images/placeholder.png",
                buttonText: card.ButtonText || "Meer Informatie",
                buttonUrl: card.ButtonURL || "#",
                buttonTarget: "_self" as const, // Default to _self since ButtonTarget doesn't exist in current structure
              }))
            setCards(processedCards)
          } else {
            setError("No results data available")
          }
        } catch (error) {
          console.error("Error fetching results data:", error)
          setError("Failed to load results data")
        } finally {
          setIsLoading(false)
        }
      }
      fetchData()
    }
  }, [data])

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

  // Handle button click - always open in new page
  const handleButtonClick = (buttonUrl: string, buttonTarget: string) => {
    if (buttonUrl && buttonUrl !== "#") {
      // Always open in new tab/page
      window.open(buttonUrl, "_blank", "noopener,noreferrer")
    } else {
      // If URL is "#" or empty, just prevent default and show a message
      console.log("Button clicked but no URL configured")
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <section className="px-4 xl:px-0">
        <div className="max-w-[1265px] mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-600">Loading results...</div>
          </div>
        </div>
      </section>
    )
  }

  // Show error state
  if (error) {
    return (
      <section className="px-4 xl:px-0">
        <div className="max-w-[1265px] mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-red-600">{error}</div>
          </div>
        </div>
      </section>
    )
  }

  // Show empty state if no cards
  if (!cards || cards.length === 0) {
    return (
      <section className="px-4 xl:px-0">
        <div className="max-w-[1265px] mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-600">No results available</div>
          </div>
        </div>
      </section>
    )
  }

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
                        className={`border text-gray-800 text-xl font-light hover:bg-transparent rounded-none px-10.5 py-5.5 transition-colors ${
                          card.buttonUrl && card.buttonUrl !== "#" 
                            ? "border-gray-700 cursor-pointer hover:border-gray-900" 
                            : "border-gray-400 cursor-not-allowed opacity-60"
                        }`}
                        onClick={() => handleButtonClick(card.buttonUrl, card.buttonTarget)}
                        disabled={!card.buttonUrl || card.buttonUrl === "#"}
                        title={card.buttonUrl && card.buttonUrl !== "#" ? "Opens in new page" : "No link configured"}
                      >
                        {card.buttonText}
                        {card.buttonUrl && card.buttonUrl !== "#" && (
                          <span className="ml-2 text-sm">↗</span>
                        )}
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
                  className={`border text-gray-800 text-xl font-light hover:bg-transparent rounded-none px-10.5 py-5.5 transition-colors ${
                    card.buttonUrl && card.buttonUrl !== "#" 
                      ? "border-gray-700 cursor-pointer hover:border-gray-900" 
                      : "border-gray-400 cursor-not-allowed opacity-60"
                  }`}
                  onClick={() => handleButtonClick(card.buttonUrl, card.buttonTarget)}
                  disabled={!card.buttonUrl || card.buttonUrl === "#"}
                  title={card.buttonUrl && card.buttonUrl !== "#" ? "Opens in new page" : "No link configured"}
                >
                  {card.buttonText}
                  {card.buttonUrl && card.buttonUrl !== "#" && (
                    <span className="ml-2 text-sm">↗</span>
                  )}
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}