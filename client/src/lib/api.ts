import { strapiClient } from './strapi'
import { StrapiResponse, HomePageContent, HeroSectionData, NavigationData, TeamMemberData, Service, ServicesSectionData, ResultsSectionData, BeforeAfterItem, BeforeAfterSectionData, ProductSectionData, WelcomeSectionData, ContactSectionData, FooterData } from '@/types/strapi'

/**
 * Fetch home page content from Strapi (Server-side)
 * @returns Promise<HeroSectionData>
 */
export async function getHomePageContent(): Promise<HeroSectionData> {
  try {
    // Use populate parameter to include media fields
    const response = await strapiClient.get('/home-page?populate=backgroundImage')
    
    console.log('Strapi response status:', response.status)
    console.log('Strapi response data:', JSON.stringify(response.data, null, 2))
    
    // Check if response is empty or invalid
    if (!response.data || Object.keys(response.data).length === 0) {
      throw new Error('Empty response from Strapi - check if content exists and is published')
    }
    
    // Handle Strapi v5 response structure (no nested data wrapper)
    const data = response.data.data || response.data
    const backgroundImage = data.backgroundImage
    
    // Convert relative URLs to absolute URLs for Next.js Image component
    if (backgroundImage?.url && !backgroundImage.url.startsWith('http')) {
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
      backgroundImage.url = `${strapiUrl}${backgroundImage.url}`
    }
    
    return {
      title: data.title,
      description: data.description,
      buttonText: data.buttonText,
      backgroundImage: backgroundImage
    }
    
  } catch (error) {
    console.error('Error fetching home page content:', error)
    throw error
  }
}

/**
 * Fetch navigation data from Strapi (Server-side)
 * @returns Promise<NavigationData>
 */
export async function getNavigationData(): Promise<NavigationData> {
  try {
    const response = await strapiClient.get('/navigation?populate=*')
    
    console.log('Navigation response status:', response.status)
    console.log('Navigation response data:', JSON.stringify(response.data, null, 2))
    
    // Check if response is empty or invalid
    if (!response.data || Object.keys(response.data).length === 0) {
      throw new Error('Empty response from Strapi - check if navigation content exists and is published')
    }
    
    // Handle Strapi v5 response structure
    const navigationData = response.data.data || response.data
    
    // Convert relative URLs to absolute URLs for images
    if (navigationData.logoImage?.url && !navigationData.logoImage.url.startsWith('http')) {
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
      navigationData.logoImage.url = `${strapiUrl}${navigationData.logoImage.url}`
    }
    
    return navigationData
    
  } catch (error) {
    console.error('Error fetching navigation data:', error)
    throw error
  }
}

/**
 * Convert Strapi rich text blocks to HTML string
 * Handles both Strapi's internal format and Markdown syntax
 */
export function parseRichText(blocks: any): string {
  if (!blocks) return ''
  
  // If it's already a string, treat it as Markdown
  if (typeof blocks === 'string') {
    return parseMarkdown(blocks)
  }
  
  // If it's not an array, return empty string
  if (!Array.isArray(blocks)) {
    console.log('parseRichText: blocks is not an array:', blocks)
    return ''
  }
  
  return blocks
    .map((block: any) => {
      if (block.type === 'paragraph' && Array.isArray(block.children)) {
        return (
          '<p>' +
          block.children
            .map((ch: any) => {
              const text = String(ch.text || '')
              if (ch.bold) return `<strong>${text}</strong>`
              if (ch.italic) return `<em>${text}</em>`
              return text
            })
            .join('') +
          '</p>'
        )
      }
      if (block.type === 'heading' && Array.isArray(block.children)) {
        const level = block.level || 1
        return (
          `<h${level}>` +
          block.children
            .map((ch: any) => String(ch.text || ''))
            .join('') +
          `</h${level}>`
        )
      }
      if (block.type === 'list' && Array.isArray(block.children)) {
        const tag = block.format === 'ordered' ? 'ol' : 'ul'
        return (
          `<${tag}>` +
          block.children
            .map((item: any) => `<li>${parseRichText(item.children)}</li>`)
            .join('') +
          `</${tag}>`
        )
      }
      return ''
    })
    .join('')
}

/**
 * Simple Markdown parser for basic formatting
 */
function parseMarkdown(text: string): string {
  if (!text) return ''
  
  // Convert line breaks to <br> tags
  let html = text.replace(/\n/g, '<br>')
  
  // Convert **bold** to <strong>
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  
  // Convert *italic* to <em>
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  
  // Convert `code` to <code>
  html = html.replace(/`(.*?)`/g, '<code>$1</code>')
  
  // Wrap in paragraph tags if not already wrapped
  if (!html.startsWith('<')) {
    html = `<p>${html}</p>`
  }
  
  return html
}

/**
 * Fetch Team Member section data with media URLs normalized
 */
export async function getTeamMemberData(): Promise<TeamMemberData> {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
  const res = await strapiClient.get('/team-member', {
    params: {
      populate: {
        TeamMember: { populate: ['TeamMemberImage'] },
        CalendarIcon: true,
        ScheduleIcon: true,
      },
    },
  })

  if (!res.data) throw new Error('No team member data')
  const data = res.data.data || res.data

  const normalizeUrl = (url?: string | null) => {
    if (!url) return null
    return url.startsWith('http') ? url : `${strapiUrl}${url}`
  }

  if (data.CalendarIcon?.url) data.CalendarIcon.url = normalizeUrl(data.CalendarIcon.url) as string
  if (data.ScheduleIcon?.url) data.ScheduleIcon.url = normalizeUrl(data.ScheduleIcon.url) as string

  if (Array.isArray(data.TeamMember)) {
    data.TeamMember = data.TeamMember.map((m: any) => {
      if (m.TeamMemberImage?.url) m.TeamMemberImage.url = normalizeUrl(m.TeamMemberImage.url)
      return m
    })
  }

  return data as TeamMemberData
}

/**
 * Fetch Services Section data with populated services
 * @returns Promise<ServicesSectionData>
 */
export async function getServicesSectionData(): Promise<ServicesSectionData> {
  try {
    // Use Strapi v5 populate syntax
    const response = await strapiClient.get('/services-section?populate=services.ServiceSection.ServiceItem')
    
    console.log('Services Section response status:', response.status)
    console.log('Services Section response data:', JSON.stringify(response.data, null, 2))
    
    if (!response.data) {
      throw new Error('Empty response from Strapi - check if services section content exists and is published')
    }
    
    return (response.data.data || response.data) as ServicesSectionData
    
  } catch (error) {
    console.error('Error fetching services section data:', error)
    throw error
  }
}

/**
 * Fetch all services with populated ServiceSection components
 * @returns Promise<Service[]>
 */
export async function getServicesData(): Promise<Service[]> {
  try {
    const response = await strapiClient.get('/services?populate=ServiceSection.ServiceItem')
    
    console.log('Services response status:', response.status)
    console.log('Services response data:', JSON.stringify(response.data, null, 2))
    
    if (!response.data) {
      throw new Error('Empty response from Strapi - check if services content exists and is published')
    }
    
    return (response.data.data || response.data) as Service[]
    
  } catch (error) {
    console.error('Error fetching services data:', error)
    throw error
  }
}

/**
 * Fetch Results Section data with populated results
 * @returns Promise<ResultsSectionData>
 */
export async function getResultsSectionData(): Promise<ResultsSectionData> {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
    
    // Use Strapi v5 populate syntax for nested components
    const response = await strapiClient.get('/results-section?populate=ResultCard.CardImage')
    
    console.log('Results Section response status:', response.status)
    console.log('Results Section response data:', JSON.stringify(response.data, null, 2))
    
    if (!response.data) {
      throw new Error('Empty response from Strapi - check if results section content exists and is published')
    }
    
    const data = response.data.data || response.data
    
    // Normalize image URLs to absolute URLs
    const normalizeUrl = (url?: string | null) => {
      if (!url) return null
      return url.startsWith('http') ? url : `${strapiUrl}${url}`
    }
    
    // Process ResultCard to normalize image URLs
    if (Array.isArray(data.ResultCard)) {
      data.ResultCard = data.ResultCard.map((card: any) => {
        if (card.CardImage?.url) {
          card.CardImage.url = normalizeUrl(card.CardImage.url) as string
        }
        return card
      })
    }
    
    return data as ResultsSectionData
    
  } catch (error) {
    console.error('Error fetching results section data:', error)
    throw error
  }
}

/**
 * Fetch Before After Section data from Strapi
 * @returns Promise<BeforeAfterSectionData>
 */
export async function getBeforeAfterSectionData(): Promise<BeforeAfterSectionData> {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
    
    const response = await strapiClient.get('/before-after-section', {
      params: {
        populate: {
          beforeAfterItems: {
            populate: 'beforeAfterImage'
          }
        }
      }
    })
    
    console.log('Before After Section response status:', response.status)
    console.log('Before After Section response data:', JSON.stringify(response.data, null, 2))
    
    if (!response.data) {
      throw new Error('Empty response from Strapi - check if before-after-section content exists and is published')
    }
    
    const data = response.data.data || response.data
    
    // Normalize image URLs to absolute URLs
    const normalizeUrl = (url?: string | null) => {
      if (!url) return null
      return url.startsWith('http') ? url : `${strapiUrl}${url}`
    }
    
    // Transform the data to match the frontend structure (similar to Services pattern)
    const transformedData = {
      id: data.id.toString(),
      title: data.Title || 'VOOR & NA',
      beforeAfterItems: data.beforeAfterItems?.map((item: any) => ({
        id: item.id.toString(),
        category: item.category,
        title: item.title,
        description: item.description,
        benefits: item.benefits || [],
        beforeAfterImage: normalizeUrl(item.beforeAfterImage?.url) || '/placeholder.svg',
        order: item.order || 0,
        isActive: item.isActive
      })) || [],
      filterOptions: data.filterOptions || ["All", "Kleuringen", "Stylen", "Knippen"],
      enableZoom: data.enableZoom
    }
    
    return transformedData as BeforeAfterSectionData
    
  } catch (error) {
    console.error('Error fetching before after section data:', error)
    throw error
  }
}

/**
 * Fetch Product Section data from Strapi
 * @returns Promise<ProductSectionData>
 */
export async function getProductSectionData(): Promise<ProductSectionData> {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
    
    const response = await strapiClient.get('/product?populate=*')
    
    console.log('Product Section response status:', response.status)
    console.log('Product Section response data:', JSON.stringify(response.data, null, 2))
    
    if (!response.data) {
      throw new Error('Empty response from Strapi - check if product content exists and is published')
    }
    
    const data = response.data.data || response.data
    
    // Normalize image URLs to absolute URLs
    const normalizeUrl = (url?: string | null) => {
      if (!url) return null
      return url.startsWith('http') ? url : `${strapiUrl}${url}`
    }
    
    // Normalize all image URLs
    if (data.ButtonIcon?.url) {
      data.ButtonIcon.url = normalizeUrl(data.ButtonIcon.url) as string
    }
    if (data.ProductLogo?.url) {
      data.ProductLogo.url = normalizeUrl(data.ProductLogo.url) as string
    }
    if (data.ProductImage?.url) {
      data.ProductImage.url = normalizeUrl(data.ProductImage.url) as string
    }
    
    return data as ProductSectionData
    
  } catch (error) {
    console.error('Error fetching product section data:', error)
    throw error
  }
}

/**
 * Fetch Welcome Section data from Strapi
 * @returns Promise<WelcomeSectionData>
 */
export async function getWelcomeSectionData(): Promise<WelcomeSectionData> {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
  
  // Fetch welcome section and welcome items separately
  const [sectionResponse, itemsResponse] = await Promise.all([
    strapiClient.get('/welcome-section'),
    strapiClient.get('/welcome-items', {
      params: {
        populate: 'icon',
        sort: 'order:asc'
      }
    })
  ])
  
  console.log('Welcome Section response status:', sectionResponse.status)
  console.log('Welcome Items response status:', itemsResponse.status)
  
  if (!sectionResponse.data || !itemsResponse.data) {
    throw new Error('Empty response from Strapi - check if welcome content exists and is published')
  }
  
  const sectionData = sectionResponse.data.data || sectionResponse.data
  const itemsData = itemsResponse.data.data || itemsResponse.data
  
  // Normalize image URLs to absolute URLs
  const normalizeUrl = (url?: string | null) => {
    if (!url) return null
    return url.startsWith('http') ? url : `${strapiUrl}${url}`
  }
  
  // Process welcome items to normalize image URLs
  const normalizedItems = Array.isArray(itemsData) ? itemsData.map((item: any) => {
    if (item.icon?.url) {
      item.icon.url = normalizeUrl(item.icon.url) as string
    }
    return item
  }) : []
  
  return {
    ...sectionData,
    welcomeItems: normalizedItems
  } as WelcomeSectionData
}

/**
 * Fetch Contact Section data from Strapi
 * @returns Promise<ContactSectionData>
 */
export async function getContactSectionData(): Promise<ContactSectionData> {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
  
  // Fetch contact section and contact cards separately
  const [sectionResponse, cardsResponse] = await Promise.all([
    strapiClient.get('/contact-section'),
    strapiClient.get('/contact-cards', {
      params: {
        populate: 'icon',
        sort: 'order:asc'
      }
    })
  ])
  
  console.log('Contact Section response status:', sectionResponse.status)
  console.log('Contact Cards response status:', cardsResponse.status)
  
  if (!sectionResponse.data || !cardsResponse.data) {
    throw new Error('Empty response from Strapi - check if contact content exists and is published')
  }
  
  const sectionData = sectionResponse.data.data || sectionResponse.data
  const cardsData = cardsResponse.data.data || cardsResponse.data
  
  // Normalize image URLs to absolute URLs
  const normalizeUrl = (url?: string | null) => {
    if (!url) return null
    return url.startsWith('http') ? url : `${strapiUrl}${url}`
  }
  
  // Process contact cards to normalize image URLs
  const normalizedCards = Array.isArray(cardsData) ? cardsData.map((card: any) => {
    if (card.icon?.url) {
      card.icon.url = normalizeUrl(card.icon.url) as string
    }
    return card
  }) : []
  
  return {
    ...sectionData,
    contactCards: normalizedCards
  } as ContactSectionData
}

/**
 * Fetch Footer data from Strapi
 */
export async function getFooterData(): Promise<FooterData> {
  const response = await strapiClient.get('/footer', {
    params: {
      populate: {
        scheduleBlock: { populate: 'schedule' },
        formBlock: true,
      }
    }
  })
  if (!response.data) throw new Error('Empty footer response')
  const data = response.data.data || response.data
  return data as FooterData
}

/**
 * Generic function to fetch any Strapi collection
 * @param endpoint - The Strapi API endpoint (e.g., 'home-page', 'services')
 * @param params - Optional query parameters
 * @returns Promise<T>
 */
export async function fetchStrapiData<T>(
  endpoint: string, 
  params?: Record<string, any>
): Promise<T> {
  try {
    const response = await strapiClient.get<StrapiResponse<T>>(`/${endpoint}`, { params })
    return (response.data.data || response.data) as T
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error)
    throw error
  }
}
