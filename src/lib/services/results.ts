import { ResultsSectionData, ResultCard } from '@/types/strapi'
import { fetchStrapiData, normalizeStrapiUrlWithFallback } from './strapi'

export async function getResultsSectionData(): Promise<ResultsSectionData> {
  try {
    const data = await fetchStrapiData<Record<string, unknown>>('/results-section', {
      populate: {
        ResultCard: {
          populate: 'CardImage'
        }
      }
    }, 'results section') as ResultsSectionData

    // Handle both ResultCard (capital) and resultCard (lowercase) from Strapi
    // Strapi field names can be case-sensitive depending on configuration
    const resultCards = (data.ResultCard || (data as Record<string, unknown>).resultCard || []) as ResultCard[]

    if (Array.isArray(resultCards) && resultCards.length > 0) {
      const normalizedCards = resultCards.map((card: ResultCard) => {
        if (card.CardImage?.url) {
          card.CardImage.url = normalizeStrapiUrlWithFallback(card.CardImage.url)
        }
        return card
      })
      return {
        ...data,
        ResultCard: normalizedCards
      } as ResultsSectionData
    }

    // Return data even if no cards (component will handle empty state)
    return {
      ...data,
      ResultCard: []
    } as ResultsSectionData
  } catch (error) {
    console.error('Error fetching results section:', error)
    throw error
  }
}

