"use client"
import React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Star, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"

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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  })

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  return (
    <div className="relative">
      {/* Carousel Container - constrained by max width but allow visible overflow */}
      <div className="max-w-[1265px] mx-auto overflow-visible">
        {/* Embla viewport: allow visible overflow so slides can peek past the right edge */}
        <div className="overflow-visible" ref={emblaRef}>
          <div className="flex pl-0">
            {reviews.map((review) => (
              <div key={review.id} className="flex-[0_0_404px] mr-6">
                <div className="border border-gray-400 p-6 h-[450px] flex flex-col bg-transparent">
                  {/* Star Rating */}
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-black text-black" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-black text-sm leading-relaxed mb-6 flex-grow">{review.text}</p>

                  {/* Customer Info */}
                  <div className="flex items-center">
                    <img
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.customerName}
                      className="w-12 h-12 rounded-full mr-3 object-cover"
                    />
                    <div>
                      <h4 className="text-black font-medium text-sm">{review.customerName}</h4>
                      <p className="text-black text-xs">{review.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section with Button and Navigation - placed relative to page, aligned with max-width container */}
      <div className="max-w-[1265px] mx-auto flex items-center justify-between mt-8 pr-8 overflow-visible">
        {/* Place Review Button */}
        <Button
          variant="outline"
          className="border-black text-black hover:bg-black hover:text-white transition-colors bg-transparent rounded-none flex items-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Plaats enn Review
        </Button>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-4">
          <button
            onClick={scrollPrev}
            className="p-2 hover:bg-black/10 transition-colors"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>
          <button onClick={scrollNext} className="p-2 hover:bg-black/10 transition-colors" aria-label="Next reviews">
            <ChevronRight className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ReviewsSection() {
  return (
    /* Reviews Section */
    <section className="py-16" style={{ backgroundColor: "#DFD6C9" }}>
      {/* Section Header with left padding only */}
      <div className="px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight">REVIEWS</h2>
        </div>
      </div>

      {/* Reviews Carousel - extends to screen edge but limited visually to 1265px center with overflow visible on right */}
      <div className="pl-8">
        <ReviewsCarousel />
      </div>
    </section>
  )
}