import { BeforeAfterSectionData, BeforeAfterItem } from '@/types/strapi'
import { fetchStrapiData, normalizeStrapiUrlWithFallback } from './strapi'

export async function getBeforeAfterSectionData(): Promise<BeforeAfterSectionData> {
  // Type for raw Strapi data before transformation
  interface RawBeforeAfterItem {
    id: number | string
    category: string
    title: string
    description: string
    benefits?: string[]
    beforeAfterImage?: { url?: string }
    order?: number
    isActive?: boolean
  }

  interface RawBeforeAfterSectionData {
    id: number | string
    Title?: string
    filterOptions?: string[]
    enableZoom?: boolean
    beforeAfterItems?: RawBeforeAfterItem[]
    carouselButtons?: BeforeAfterSectionData['carouselButtons']
  }

  try {
    const data = await fetchStrapiData<Record<string, unknown>>('/before-after-section', {
      populate: {
        beforeAfterItems: {
          populate: 'beforeAfterImage'
        },
        carouselButtons: {
          populate: ['prevActiveIcon', 'prevInactiveIcon', 'nextActiveIcon', 'nextInactiveIcon']
        }
      }
    }, 'before-after section')

    const rawData = data as unknown as RawBeforeAfterSectionData

  if (rawData.carouselButtons) {
    const { prevActiveIcon, prevInactiveIcon, nextActiveIcon, nextInactiveIcon } = rawData.carouselButtons
    if (prevActiveIcon?.url) prevActiveIcon.url = normalizeStrapiUrlWithFallback(prevActiveIcon.url)
    if (prevInactiveIcon?.url) prevInactiveIcon.url = normalizeStrapiUrlWithFallback(prevInactiveIcon.url)
    if (nextActiveIcon?.url) nextActiveIcon.url = normalizeStrapiUrlWithFallback(nextActiveIcon.url)
    if (nextInactiveIcon?.url) nextInactiveIcon.url = normalizeStrapiUrlWithFallback(nextInactiveIcon.url)
  }

  const transformedData: BeforeAfterSectionData = {
    id: String(rawData.id),
    title: rawData.Title || 'VOOR & NA',
    beforeAfterItems: rawData.beforeAfterItems?.map((item: RawBeforeAfterItem) => ({
      id: String(item.id),
      category: item.category as BeforeAfterItem['category'],
      title: item.title,
      description: item.description,
      benefits: item.benefits || [],
      beforeAfterImage: normalizeStrapiUrlWithFallback(item.beforeAfterImage?.url, ''),
      order: item.order || 0,
      isActive: item.isActive ?? true
    })) || [],
    filterOptions: rawData.filterOptions || ["All", "Kleuringen", "Stylen", "Knippen"],
    enableZoom: rawData.enableZoom ?? false,
    carouselButtons: rawData.carouselButtons
  }

    return transformedData
  } catch (error) {
    console.error('Error fetching before-after section:', error)
    throw error
  }
}

