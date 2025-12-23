import { Service, ServicesSectionData } from '@/types/strapi'
import { strapiClient } from './strapi'
import { fetchStrapiData, extractStrapiData, normalizeStrapiUrlWithFallback } from './strapi'

export async function getServicesSectionData(): Promise<ServicesSectionData> {
  const data = await fetchStrapiData<ServicesSectionData>('/services-section', {
    populate: {
      services: {
        populate: {
          ServiceSection: {
            populate: 'ServiceItem'
          }
        }
      },
      carouselButtons: {
        populate: ['prevActiveIcon', 'prevInactiveIcon', 'nextActiveIcon', 'nextInactiveIcon']
      }
    }
  }, 'services section')

  if (data.carouselButtons) {
    const { prevActiveIcon, prevInactiveIcon, nextActiveIcon, nextInactiveIcon } = data.carouselButtons
    if (prevActiveIcon?.url) prevActiveIcon.url = normalizeStrapiUrlWithFallback(prevActiveIcon.url)
    if (prevInactiveIcon?.url) prevInactiveIcon.url = normalizeStrapiUrlWithFallback(prevInactiveIcon.url)
    if (nextActiveIcon?.url) nextActiveIcon.url = normalizeStrapiUrlWithFallback(nextActiveIcon.url)
    if (nextInactiveIcon?.url) nextInactiveIcon.url = normalizeStrapiUrlWithFallback(nextInactiveIcon.url)
  }

  return data
}

export async function getServicesData(): Promise<Service[]> {
  const response = await strapiClient.get<Service[]>('/services?populate=ServiceSection.ServiceItem')
  return extractStrapiData<Service[]>(response)
}

