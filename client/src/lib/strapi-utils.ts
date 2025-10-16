
import { strapiClient } from './strapi'
import { STRAPI_CONFIG, ERROR_MESSAGES } from './constants'
import { logger } from './logger'

export interface StrapiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiEntity {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export function normalizeStrapiUrl(url?: string | null): string | null {
  if (!url) return null
  return url.startsWith('http') ? url : `${STRAPI_CONFIG.BASE_URL}${url}`
}

export function normalizeStrapiUrlWithFallback(url?: string | null, fallback?: string): string {
  const normalized = normalizeStrapiUrl(url)
  return normalized || fallback || url || ''
}

export function extractStrapiData<T>(response: any): T {
  return (response.data?.data || response.data) as T
}

export function validateStrapiResponse(response: any, contentType: string): void {
  if (!response) {
    throw new Error(ERROR_MESSAGES.EMPTY_RESPONSE(contentType))
  }

  const data = extractStrapiData(response)
  if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
    throw new Error(ERROR_MESSAGES.EMPTY_RESPONSE(contentType))
  }
}

export function normalizeCarouselButtons(data: any): void {
  if (!data.carouselButtons) return

  const { carouselButtons } = data
  const normalizeUrl = (url?: string | null) => normalizeStrapiUrl(url)

  if (carouselButtons.prevActiveIcon?.url) {
    carouselButtons.prevActiveIcon.url = normalizeUrl(carouselButtons.prevActiveIcon.url) as string
  }
  if (carouselButtons.prevInactiveIcon?.url) {
    carouselButtons.prevInactiveIcon.url = normalizeUrl(carouselButtons.prevInactiveIcon.url) as string
  }
  if (carouselButtons.nextActiveIcon?.url) {
    carouselButtons.nextActiveIcon.url = normalizeUrl(carouselButtons.nextActiveIcon.url) as string
  }
  if (carouselButtons.nextInactiveIcon?.url) {
    carouselButtons.nextInactiveIcon.url = normalizeUrl(carouselButtons.nextInactiveIcon.url) as string
  }
}

export function normalizeMediaUrls<T extends Record<string, any>>(data: T): T {
  const normalized = { ...data }
  const mediaFields = [
    'backgroundImage', 'logoImage', 'icon', 'image', 'avatar',
    'CardImage', 'TeamMemberImage', 'ProductImage', 'ProductLogo',
    'ButtonIcon', 'CalendarIcon', 'ScheduleIcon', 'customerAvatar'
  ]

  mediaFields.forEach(field => {
    if (normalized[field]?.url) {
      normalized[field].url = normalizeStrapiUrl(normalized[field].url)
    }
  })

  return normalized
}

export async function fetchStrapiData<T extends Record<string, any>>(
  endpoint: string,
  params?: Record<string, any>,
  contentType?: string
): Promise<T> {
  try {
    logger.logApiRequest(endpoint)

    const response = await strapiClient.get(endpoint, { params })

    logger.logApiResponse(endpoint, response.status, response.data)

    const data = extractStrapiData<T>(response)
    validateStrapiResponse({ data }, contentType || endpoint)

    return normalizeMediaUrls(data) as T
  } catch (error) {
    logger.logSectionError(contentType || endpoint, error)
    throw error
  }
}

export async function fetchSectionWithItems<TSection extends Record<string, any>, TItems extends Record<string, any>>(
  sectionEndpoint: string,
  itemsEndpoint: string,
  populateField: string,
  contentType: string
): Promise<TSection & { [key: string]: TItems[] }> {
  try {
    const [sectionResponse, itemsResponse] = await Promise.all([
      strapiClient.get(`/${sectionEndpoint}`),
      strapiClient.get(`/${itemsEndpoint}`, {
        params: {
          populate: populateField,
          sort: 'order:asc'
        }
      })
    ])

    logger.logApiResponse(sectionEndpoint, sectionResponse.status)
    logger.logApiResponse(itemsEndpoint, itemsResponse.status)

    const sectionData = extractStrapiData<TSection>(sectionResponse)
    const itemsData = extractStrapiData<TItems[]>(itemsResponse)

    validateStrapiResponse({ data: sectionData }, contentType)
    validateStrapiResponse({ data: itemsData }, `${contentType} items`)
    const normalizedItems = Array.isArray(itemsData)
      ? itemsData.map(item => normalizeMediaUrls(item))
      : []

    return {
      ...sectionData,
      [itemsEndpoint.replace('-', '')]: normalizedItems
    } as TSection & { [key: string]: TItems[] }
  } catch (error) {
    logger.logSectionError(contentType, error)
    throw error
  }
}

export class StrapiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string
  ) {
    super(message)
    this.name = 'StrapiError'
  }
}

export function handleStrapiError(error: any, section: string): never {
  if (error.response) {
    const { status } = error.response
    throw new StrapiError(
      ERROR_MESSAGES.FETCH_ERROR(section),
      status,
      error.config?.url
    )
  } else if (error.request) {
    throw new StrapiError(
      `Network error while fetching ${section} data`,
      undefined,
      error.config?.url
    )
  } else {
    throw new StrapiError(
      ERROR_MESSAGES.FETCH_ERROR(section),
      undefined,
      undefined
    )
  }
}
