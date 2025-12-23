import { ResultsSectionData, ResultCard } from '@/types/strapi'
import { fetchStrapiData, normalizeStrapiUrlWithFallback } from './strapi'

export async function getResultsSectionData(): Promise<ResultsSectionData> {
  const data = await fetchStrapiData<ResultsSectionData>('/results-section?populate=ResultCard.CardImage', {}, 'results section')

  if (Array.isArray(data.ResultCard)) {
    data.ResultCard = data.ResultCard.map((card: ResultCard) => {
      if (card.CardImage?.url) {
        card.CardImage.url = normalizeStrapiUrlWithFallback(card.CardImage.url)
      }
      return card
    })
  }

  return data
}

