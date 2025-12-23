import { strapiClient } from './strapi'
import { HeroSectionData } from '@/types/strapi'
import { extractStrapiData, normalizeStrapiUrlWithFallback } from './strapi'

// Type for raw Strapi home page data
interface RawHomePageData {
  title: string
  description: string
  buttonText: string
  backgroundImage?: {
    url?: string
    alternativeText?: string | null
  }
}

export async function getHomePageContent(): Promise<HeroSectionData> {
  const response = await strapiClient.get<RawHomePageData>('/home-page?populate=backgroundImage')
  const data = extractStrapiData<RawHomePageData>(response)
  if (data.backgroundImage?.url) {
    data.backgroundImage.url = normalizeStrapiUrlWithFallback(data.backgroundImage.url)
  }

  return {
    title: data.title,
    description: data.description,
    buttonText: data.buttonText,
    backgroundImage: data.backgroundImage as HeroSectionData['backgroundImage']
  }
}

