"use client"
import React, { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Star, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "motion/react"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { ReviewsSectionData } from "@/types/strapi"
import { getReviewsSectionData } from "@/lib/api"
import { SectionLoadingState, SectionEmptyState } from "@/components/ui/loading-states"

interface ReviewsCarouselProps {
  reviewsData: ReviewsSectionData
}

export const ReviewsCarousel = React.memo(function ReviewsCarousel({ reviewsData }: ReviewsCarouselProps) {
  const reduceMotion = useReducedMotion()
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  })

  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)


  useEffect(() => {
    if (!emblaApi) return

    setCurrent(emblaApi.selectedScrollSnap())
    setCount(emblaApi.scrollSnapList().length)

    const onSelect = () => {
      setCurrent(emblaApi.selectedScrollSnap())
    }
    
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi])

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi])


  const formatDate = React.useCallback((dateString: string) => {
    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString('nl-NL', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })

    return formattedDate.replace(/\b\w/g, (char) => {

      return char.toUpperCase()
    })
  }, [])

  return (
    <div className="relative">
  {/* Carousel Container - align with 78.5rem site container and allow right overflow */}
  <div className="max-w-[78.5rem] mx-auto overflow-hidden sm:overflow-visible">
        {/* Embla viewport: allow visible overflow so slides can peek past the right edge */}
    <div className="overflow-hidden sm:overflow-visible" ref={emblaRef}>
      <div className="flex pl-0 gap-4 sm:gap-6">
            {reviewsData.reviews?.map((review) => (
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
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < review.rating ? 'fill-black text-black' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-black text-xl leading-5.5 mb-6 flex-grow">{review.reviewText}</p>

                  {/* Customer Info */}
                  <div className="flex items-center">
                    {review.customerAvatar?.url ? (
                      <Image
                        src={review.customerAvatar.url}
                        alt={review.customerName}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full mr-3 object-cover"
                      />
                    ) : null}
                    <div>
                      <h4 className="text-black font-normal text-xl">{review.customerName}</h4>
                      <p className="text-black text-base font-light">{formatDate(review.reviewDate)}</p>
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
                {reviewsData.button ? (
                  <Button
                    variant="outline"
                    className="border-black text-black hover:bg-black hover:text-white transition-colors bg-transparent rounded-none flex items-center text-xl font-light gap-2 !px-6 !py-6"
                  >
                    {reviewsData.button.icon?.url ? (
                      <Image
                        src={reviewsData.button.icon.url}
                        alt={reviewsData.button.icon.alternativeText || "Button icon"}
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                    ) : (
                      <Edit className="w-5 h-5" />
                    )}
                    {reviewsData.button.text}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="border-black text-black hover:bg-black hover:text-white transition-colors bg-transparent rounded-none flex items-center text-xl font-light gap-2 !px-6 !py-6"
                  >
                    <Edit className="w-5 h-5" />
                    Plaats een Review
                  </Button>
                )}

        {/* Navigation Arrows */}
        <div className="flex items-center gap-4">
          {/* Previous Button */}
          <button
            onClick={scrollPrev}
            disabled={current === 0}
            className="disabled:opacity-50 disabled:cursor-default cursor-pointer flex items-center justify-center transition-transform hover:scale-110 disabled:hover:scale-100"
            aria-label="Previous reviews"
          >
            {reviewsData.carouselButtons?.prevActiveIcon?.url && reviewsData.carouselButtons?.prevInactiveIcon?.url ? (
              <Image
                src={current === 0 ? reviewsData.carouselButtons.prevInactiveIcon.url : reviewsData.carouselButtons.prevActiveIcon.url}
                alt="Previous"
                width={48}
                height={48}
                className="w-12 h-12"
              />
            ) : (
              <ChevronLeft className="w-12 h-12 text-black" />
            )}
          </button>
          
          {/* Next Button */}
          <button
            onClick={scrollNext}
            disabled={current === count - 1}
            className="disabled:opacity-50 disabled:cursor-default cursor-pointer flex items-center justify-center transition-transform hover:scale-110 disabled:hover:scale-100"
            aria-label="Next reviews"
          >
            {reviewsData.carouselButtons?.nextActiveIcon?.url && reviewsData.carouselButtons?.nextInactiveIcon?.url ? (
              <Image
                src={current === count - 1 ? reviewsData.carouselButtons.nextInactiveIcon.url : reviewsData.carouselButtons.nextActiveIcon.url}
                alt="Next"
                width={48}
                height={48}
                className="w-12 h-12"
              />
            ) : (
              <ChevronRight className="w-12 h-12 text-black" />
            )}
          </button>
        </div>
  </motion.div>
    </div>
  )
})

interface ReviewsSectionProps {
  data?: ReviewsSectionData
}

const ReviewsSection = React.memo(function ReviewsSection({ data }: ReviewsSectionProps) {
  const [reviewsData, setReviewsData] = useState<ReviewsSectionData | null>(data || null)
  const [loading, setLoading] = useState(!data)
  const reduceMotion = useReducedMotion()


  const fetchData = React.useCallback(async () => {
    try {
      const fetchedData = await getReviewsSectionData()
      setReviewsData(fetchedData)
    } catch {
      setReviewsData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (data) {
      setReviewsData(data)
      setLoading(false)
      return
    }
    fetchData()
  }, [data, fetchData])

  if (loading) {
    return <SectionLoadingState title="Loading reviews..." />
  }

  if (!reviewsData) {
    return <SectionEmptyState message="No reviews available." />
  }

  return (
    /* Reviews Section */
    <section className="px-4 xl:px-0">
      {/* Section Header aligned with content container */}
      <div className="mb-6">
        <div className="max-w-[78.5rem] mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl text-black"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeOut" }}
          >
            {reviewsData.title || 'REVIEWS'}
          </motion.h2>
        </div>
      </div>

      {/* Reviews Carousel - extends to screen edge but limited visually to 1265px center with overflow visible on right */}
      <div className="">
        <ReviewsCarousel reviewsData={reviewsData} />
      </div>
    </section>
  )
})

export default ReviewsSection