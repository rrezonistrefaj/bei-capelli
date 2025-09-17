"use client"
import React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Star, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const reviews = [
  {
    id: 1,
    rating: 5,
    text: "Ik was hier voor het eerst, super professioneel geholpen door de kapster, welkom gevoel en een hele leuke en vrolijke kapster. Ben heel blij met het resultaat. Mijn haar is mooi geknipt en weer heel blij met mijn kleur. Dus als je op zoekt bent naar een goede kapsalon, zeker een aanrader😊Service: Hair styling",
    customerName: "Maren Van Hal",
    date: "11 Mei 2024",
    avatar: "/images/review-image-1.png",
    service: "Hair styling",
  },
  {
    id: 2,
    rating: 5,
    text: "Ik kom zelf uit Renkum en heb in deze omgeving al meerder kapsalons bezocht en uitgeprobeerd maar nu ik bij Bei Capelli kom voel ik mij hier thuis. Het team wat hier werkt is zeer professioneel en geven je ook advies waar je wat aan hebt. Smeren je niets aan. Daarnaast werken ze met mooie producten die echt doen wat ze zeggen. Had ik deze maar eerder ontdekt.",
    customerName: "Maren Van Hal",
    date: "11 Mei 2024",
    avatar: "/images/review-image-2.png",
    service: "Hair styling",
  },
  {
    id: 3,
    rating: 5,
    text: "Ik was hier voor het eerst, super professioneel geholpen door de kapster, welkom gevoel en een hele leuke en vrolijke kapster. Ben heel blij met het resultaat. Mijn haar is mooi geknipt en weer heel blij met mijn kleur. Dus als je op zoekt bent naar een goede kapsalon, zeker een aanrader😊Service: Hair styling",
    customerName: "Maren Van Hal",
    date: "11 Mei 2024",
    avatar: "/images/review-image-3.png",
    service: "Hair styling",
  },
  {
    id: 4,
    rating: 5,
    text: "Ik was hier voor het eerst, super professioneel geholpen door de kapster, welkom gevoel en een hele leuke en vrolijke kapster. Ben heel blij met het resultaat. Mijn haar is mooi geknipt en weer heel blij met mijn kleur. Dus als je op zoekt bent naar een goede kapsalon, zeker een aanrader😊Service: Hair styling",
    customerName: "Maren Van Hal",
    date: "11 Mei 2024",
    avatar: "/images/review-image-2.png",
    service: "Hair styling",
  },
  {
    id: 5,
    rating: 5,
    text: "Geweldige ervaring bij Bei Capelli! Het team is zeer kundig en luistert goed naar wat je wilt. Mijn haar ziet er fantastisch uit en ik voel me helemaal opnieuw. Zeker een aanrader voor iedereen die op zoek is naar kwaliteit en service.",
    customerName: "Maren Van Hal",
    date: "11 Mei 2024",
    avatar: "/images/review-image-1.png",
    service: "Hair coloring",
  },
]

export function ReviewsCarousel() {
  const reduceMotion = useReducedMotion()
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  })

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  return (
    <div className="relative">
  {/* Carousel Container - align with 78.5rem site container and allow right overflow */}
  <div className="max-w-[78.5rem] mx-auto overflow-hidden sm:overflow-visible">
        {/* Embla viewport: allow visible overflow so slides can peek past the right edge */}
    <div className="overflow-hidden sm:overflow-visible" ref={emblaRef}>
      <div className="flex pl-0 gap-4 sm:gap-6">
            {reviews.map((review) => (
        <div key={review.id} className="flex-[0_0_100%] sm:flex-[0_0_404px]">
                <motion.div
                  className="border border-gray-400 px-10 pt-6.5 pb-8.5 h-full min-h-[450px] flex flex-col bg-transparent"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
                >
                  {/* Star Rating */}
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-black text-black" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-black text-xl leading-5.5 mb-6 flex-grow">{review.text}</p>

                  {/* Customer Info */}
                  <div className="flex items-center">
                    <Image
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.customerName}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full mr-3 object-cover"
                    />
                    <div>
                      <h4 className="text-black font-normal text-xl">{review.customerName}</h4>
                      <p className="text-black text-base font-light">{review.date}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

  {/* Bottom Section with Button and Navigation - aligned with 78.5rem container */}
  <motion.div
    className="max-w-[78.5rem] mx-auto flex items-center justify-between mt-8 overflow-visible"
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
  >
        {/* Place Review Button */}
        <Button
          variant="outline"
          className="border-black text-black hover:bg-black hover:text-white transition-colors bg-transparent rounded-none flex items-center text-xl font-light gap-2 !px-6 !py-6"
        >
          <Edit className="w-5 h-5" />
          Plaats een Review
        </Button>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollPrev}
            className="text-black hover:bg-black/10 rounded-none p-2"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollNext}
            className="text-black hover:bg-black/10 rounded-none p-2"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </Button>
        </div>
  </motion.div>
    </div>
  )
}

export default function ReviewsSection() {
  const reduceMotion = useReducedMotion()
  return (
    /* Reviews Section */
    <section className=" px-4 xl:px-0">
      {/* Section Header aligned with content container */}
      <div className="mb-6">
        <div className="max-w-[78.5rem] mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl text-black "
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeOut" }}
          >
            REVIEWS
          </motion.h2>
        </div>
      </div>

      {/* Reviews Carousel - extends to screen edge but limited visually to 1265px center with overflow visible on right */}
      <div className="">
        <ReviewsCarousel />
      </div>
    </section>
  )
}