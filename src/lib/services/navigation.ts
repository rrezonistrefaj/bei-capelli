import { strapiClient } from './strapi'
import { NavigationData } from '@/types/strapi'
import { extractStrapiData, normalizeStrapiUrlWithFallback } from './strapi'

export async function getNavigationData(): Promise<NavigationData> {
  const response = await strapiClient.get<NavigationData>('/navigation?populate=*')
  const data = extractStrapiData<NavigationData>(response)

  if (data.logoImage?.url) {
    data.logoImage.url = normalizeStrapiUrlWithFallback(data.logoImage.url)
  }

  return data
}

