import { STRAPI_CONFIG, ERROR_MESSAGES } from '../constants'
import type { StrapiResponse } from '@/types/strapi'
export type { StrapiResponse }

// Environment variable validation
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN
const DEFAULT_REVALIDATE_SECONDS = 60

if (!STRAPI_URL && process.env.NODE_ENV === 'production') {
  throw new Error('NEXT_PUBLIC_STRAPI_URL environment variable is required in production')
}

// Populate parameter can be string, array of strings, or nested object
export type StrapiPopulateParam = 
  | string 
  | string[] 
  | { [key: string]: boolean | StrapiPopulateParam }

// Query parameters for Strapi API
export interface StrapiQueryParams {
  populate?: StrapiPopulateParam
  filters?: Record<string, unknown>
  sort?: string | string[]
  [key: string]: unknown
}

// Build URL with query parameters (handles Strapi's nested format)
function buildStrapiUrl(endpoint: string, params?: StrapiQueryParams): URL {
  const baseUrl = `${STRAPI_URL}/api${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
  const url = new URL(baseUrl)
  
  if (!params) return url
  
  // Handle populate (can be string, array, or nested object)
  if (params.populate) {
    buildPopulateParams(params.populate, url)
  }
  
  // Handle filters (nested object format: filters[field][operator]=value)
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          if (typeof nestedValue === 'object' && nestedValue !== null && !Array.isArray(nestedValue)) {
            Object.entries(nestedValue).forEach(([deepKey, deepValue]) => {
              url.searchParams.append(`filters[${key}][${nestedKey}][${deepKey}]`, String(deepValue))
            })
          } else {
            url.searchParams.append(`filters[${key}][${nestedKey}]`, String(nestedValue))
          }
        })
      } else {
        url.searchParams.append(`filters[${key}]`, String(value))
      }
    })
  }
  
  // Handle sort
  if (params.sort) {
    if (Array.isArray(params.sort)) {
      params.sort.forEach((s: string) => url.searchParams.append('sort', s))
    } else {
      url.searchParams.append('sort', String(params.sort))
    }
  }
  
  // Handle other simple params
  Object.entries(params).forEach(([key, value]) => {
    if (key !== 'populate' && key !== 'filters' && key !== 'sort') {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(item => url.searchParams.append(key, String(item)))
        } else {
          url.searchParams.append(key, String(value))
        }
      }
    }
  })
  
  return url
}

// Helper to build populate query params for Strapi nested components
function buildPopulateParams(populate: StrapiPopulateParam, url: URL, prefix: string = 'populate'): void {
  if (typeof populate === 'string') {
    url.searchParams.append(prefix, populate)
    return
  }
  
  if (Array.isArray(populate)) {
    // For arrays at root level, join with comma
    // For nested arrays, add each item separately
    if (prefix === 'populate') {
      url.searchParams.append(prefix, populate.join(','))
    } else {
      // For nested arrays, Strapi expects each item as a separate parameter
      populate.forEach((item, index) => {
        url.searchParams.append(`${prefix}[${index}]`, String(item))
      })
    }
    return
  }
  
  if (typeof populate === 'object' && populate !== null) {
    for (const [key, value] of Object.entries(populate)) {
      if (value === true) {
        url.searchParams.append(`${prefix}[${key}]`, 'true')
      } else if (typeof value === 'object' && value !== null) {
        if ('populate' in value) {
          // Handle nested populate
          if (typeof value.populate === 'string') {
            url.searchParams.append(`${prefix}[${key}][populate]`, value.populate)
          } else if (Array.isArray(value.populate)) {
            // For nested populate arrays, add each item with index
            value.populate.forEach((item: string, index: number) => {
              url.searchParams.append(`${prefix}[${key}][populate][${index}]`, String(item))
            })
          } else if (typeof value.populate === 'object' && value.populate !== null) {
            buildPopulateParams(value.populate, url, `${prefix}[${key}][populate]`)
          }
        } else {
          buildPopulateParams(value, url, `${prefix}[${key}]`)
        }
      }
    }
  }
}

// Get fetch options with headers and caching
function getFetchOptions(revalidate?: number): RequestInit & { next?: { revalidate: number } } {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`
  }

  const resolvedRevalidate = typeof revalidate === 'number' ? revalidate : DEFAULT_REVALIDATE_SECONDS

  if (resolvedRevalidate === 0) {
    return {
      headers,
      cache: 'no-store',
    }
  }

  return {
    headers,
    next: { revalidate: resolvedRevalidate },
  }
}

// Strapi client that mimics axios API but uses fetch
export const strapiClient = {
  async get<T = unknown>(endpoint: string, options?: { params?: StrapiQueryParams }): Promise<{ data: StrapiResponse<T>; status: number }> {
    const url = buildStrapiUrl(endpoint, options?.params)
    const fetchOptions = getFetchOptions()
    
    try {
      const response = await fetch(url.toString(), fetchOptions)
      
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Strapi API error: ${response.status} ${response.statusText} - ${errorText}`)
      }
      
      const data = await response.json()
      
      return {
        data,
        status: response.status,
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error(`Network error while fetching ${endpoint}`)
    }
  },
}

// Re-export for backward compatibility
export default strapiClient

export interface StrapiEntity {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

// Utility functions (from strapi-utils.ts)
export function normalizeStrapiUrl(url?: string | null): string | null {
  if (!url) return null
  return url.startsWith('http') ? url : `${STRAPI_CONFIG.BASE_URL}${url}`
}

export function normalizeStrapiUrlWithFallback(url?: string | null, fallback?: string): string {
  const normalized = normalizeStrapiUrl(url)
  return normalized || fallback || url || ''
}

export function extractStrapiData<T>(response: { data: StrapiResponse<T> | T }): T {
  // Check if response.data is an object and has a 'data' property (Strapi v4+ format)
  if (typeof response.data === 'object' && response.data !== null && 'data' in response.data) {
    return (response.data as StrapiResponse<T>).data as T
  }
  // Otherwise, it's already in the desired format
  return response.data as T
}

export function validateStrapiResponse<T>(response: { data: T }, contentType: string): void {
  if (!response) {
    throw new Error(ERROR_MESSAGES.EMPTY_RESPONSE(contentType))
  }

  const data = extractStrapiData(response)
  if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
    throw new Error(ERROR_MESSAGES.EMPTY_RESPONSE(contentType))
  }
}

export function normalizeCarouselButtons(data: { carouselButtons?: { prevActiveIcon?: { url?: string | null }, prevInactiveIcon?: { url?: string | null }, nextActiveIcon?: { url?: string | null }, nextInactiveIcon?: { url?: string | null } } }): void {
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

// Helper to normalize Strapi image URLs (similar to treplus getStrapiImageUrl)
export function getStrapiImageUrl(image: {
  id?: number;
  url?: string;
  data?: {
    attributes?: {
      url: string;
    };
    url?: string;
  };
} | null | undefined): string {
  let url: string | undefined;
  
  if (image?.url) {
    url = image.url;
  } else if (image?.data?.url) {
    url = image.data.url;
  } else if (image?.data?.attributes?.url) {
    url = image.data.attributes.url;
  }
  
  if (!url) {
    return '';
  }
  
  if (url.startsWith('http')) {
    return url;
  }
  
  return `${STRAPI_CONFIG.BASE_URL}${url}`;
}

// Type-safe media URL normalization
export function normalizeMediaUrls<T extends Record<string, unknown>>(data: T): T {
  const normalized = { ...data }
  const mediaFields = [
    'backgroundImage', 'logoImage', 'icon', 'image', 'avatar',
    'CardImage', 'TeamMemberImage', 'ProductImage', 'ProductLogo',
    'ButtonIcon', 'CalendarIcon', 'ScheduleIcon', 'customerAvatar'
  ] as const

  mediaFields.forEach(field => {
    const mediaItem = normalized[field]
    // Type guard: check if it's an object with a url property
    if (
      mediaItem &&
      typeof mediaItem === 'object' &&
      'url' in mediaItem &&
      typeof mediaItem.url === 'string'
    ) {
      const normalizedUrl = normalizeStrapiUrl(mediaItem.url)
      if (normalizedUrl) {
        (mediaItem as { url: string }).url = normalizedUrl
      }
    }
  })

  return normalized
}

export async function fetchStrapiData<T extends Record<string, unknown>>(
  endpoint: string,
  params?: StrapiQueryParams,
  contentType?: string
): Promise<T> {
  try {
    const response = await strapiClient.get<T>(endpoint, { params })

    const data = extractStrapiData<T>(response)
    validateStrapiResponse({ data }, contentType || endpoint)

    return data
  } catch (error) {
    throw error
  }
}

export async function fetchSectionWithItems<
  TSection extends Record<string, unknown>,
  TItems extends Record<string, unknown>
>(
  sectionEndpoint: string,
  itemsEndpoint: string,
  populateField: string,
  contentType: string
): Promise<TSection & { [key: string]: TItems[] }> {
  try {
    const [sectionResponse, itemsResponse] = await Promise.all([
      strapiClient.get<TSection>(`/${sectionEndpoint}`),
      strapiClient.get<TItems[]>(`/${itemsEndpoint}`, {
        params: {
          populate: populateField,
          sort: 'order:asc'
        }
      })
    ])

    const sectionData = extractStrapiData<TSection>(sectionResponse)
    const itemsData = extractStrapiData<TItems[]>(itemsResponse)

    validateStrapiResponse({ data: sectionData }, contentType)
    validateStrapiResponse({ data: itemsData }, `${contentType} items`)

    return {
      ...sectionData,
      [itemsEndpoint.replace('-', '')]: Array.isArray(itemsData) ? itemsData : []
    } as TSection & { [key: string]: TItems[] }
  } catch (error) {
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

export function handleStrapiError(error: unknown, section: string): never {
  if (error instanceof StrapiError) {
    throw error
  }
  
  if (error instanceof Error && error.message?.includes('Strapi API error')) {
    const statusMatch = error.message.match(/status: (\d+)/)
    const status = statusMatch ? parseInt(statusMatch[1]) : undefined
    throw new StrapiError(
      ERROR_MESSAGES.FETCH_ERROR(section),
      status,
      undefined
    )
  }
  
  throw new StrapiError(
    ERROR_MESSAGES.FETCH_ERROR(section),
    undefined,
    undefined
  )
}
