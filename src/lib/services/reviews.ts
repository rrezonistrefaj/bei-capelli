import { ReviewsSectionData, ReviewItem } from '@/types/strapi'
import { fetchStrapiData, normalizeStrapiUrlWithFallback } from './strapi'

export async function getReviewsSectionData(): Promise<ReviewsSectionData> {
  const data = await fetchStrapiData<ReviewsSectionData>('/reviews-section', {
    populate: {
      reviews: {
        populate: 'customerAvatar'
      },
      carouselButtons: {
        populate: ['prevActiveIcon', 'prevInactiveIcon', 'nextActiveIcon', 'nextInactiveIcon']
      },
      button: {
        populate: 'icon'
      }
    }
  }, 'reviews section')

  if (data.carouselButtons) {
    const { prevActiveIcon, prevInactiveIcon, nextActiveIcon, nextInactiveIcon } = data.carouselButtons
    if (prevActiveIcon?.url) prevActiveIcon.url = normalizeStrapiUrlWithFallback(prevActiveIcon.url)
    if (prevInactiveIcon?.url) prevInactiveIcon.url = normalizeStrapiUrlWithFallback(prevInactiveIcon.url)
    if (nextActiveIcon?.url) nextActiveIcon.url = normalizeStrapiUrlWithFallback(nextActiveIcon.url)
    if (nextInactiveIcon?.url) nextInactiveIcon.url = normalizeStrapiUrlWithFallback(nextInactiveIcon.url)
  }

  if (data.button?.icon?.url) {
    data.button.icon.url = normalizeStrapiUrlWithFallback(data.button.icon.url)
  }

  if (Array.isArray(data.reviews)) {
    data.reviews = data.reviews
      .map((review: ReviewItem) => {
        if (review.customerAvatar?.url) {
          review.customerAvatar.url = normalizeStrapiUrlWithFallback(review.customerAvatar.url)
        }
        return review
      })
      .sort((a: ReviewItem, b: ReviewItem) => (a.order || 0) - (b.order || 0))
  }

  return data
}

