import { normalizeStrapiUrl, strapiClient, extractStrapiData } from './strapi'
import type { StrapiPageSection, StrapiImage, ContentPageSection } from '@/types/strapi'

// Strapi page structure
export interface StrapiPage {
  id: number
  documentId?: string
  slug: string
  title: string
  sections?: StrapiPageSection[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    shareImage?: {
      url: string
    }
  }
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

export async function getPageBySlug(slug: string): Promise<StrapiPage | null> {
  if (!slug || slug.trim() === '') {
    return null;
  }
  
  try {
    const response = await strapiClient.get<StrapiPage[]>('/pages', {
      params: {
        filters: {
          slug: slug
        },
        populate: {
          sections: {
            populate: '*'
          },
          seo: {
            populate: {
              shareImage: true
            }
          }
        }
      }
    });
    
    const data = extractStrapiData<StrapiPage[]>(response);
    
    if (!Array.isArray(data) || data.length === 0) {
      console.warn(`No page found with slug "${slug}"`)
      return null;
    }

    // Get the first matching page
    const page = data[0];

    // Normalize media URLs inside sections for slug pages
    if (page && Array.isArray(page.sections)) {
      page.sections = page.sections.map((section: StrapiPageSection): StrapiPageSection => {
        if (section.__component === 'sections.content-section') {
          const contentSection = section as ContentPageSection
          // Normalize gallery images
          if (Array.isArray(contentSection.images)) {
            contentSection.images = contentSection.images
              .filter((img: StrapiImage | unknown): img is StrapiImage => {
                const image = img as StrapiImage
                return !!(image && (image.url || image?.attributes?.url || image?.data?.url || image?.data?.attributes?.url))
              })
              .map((img: StrapiImage): StrapiImage => ({
                ...img,
                url: normalizeStrapiUrl(img.url || img?.attributes?.url || img?.data?.url || img?.data?.attributes?.url) || img.url || '',
                alternativeText: img.alternativeText || img?.attributes?.alternativeText || img?.data?.attributes?.alternativeText || null,
                caption: img.caption || img?.attributes?.caption || null
              }))
          } else if (contentSection.images && typeof contentSection.images === 'object' && 'data' in contentSection.images && Array.isArray((contentSection.images as { data: unknown[] }).data)) {
            const imagesData = (contentSection.images as { data: StrapiImage[] }).data
            contentSection.images = imagesData
              .filter((img: StrapiImage): img is StrapiImage => {
                return !!(img && (img.url || img?.attributes?.url))
              })
              .map((img: StrapiImage): StrapiImage => ({
                ...img,
                url: normalizeStrapiUrl(img.url || img?.attributes?.url) || img.url || '',
                alternativeText: img.alternativeText || img?.attributes?.alternativeText || null,
                caption: img.caption || img?.attributes?.caption || null
              }))
          }

          // Normalize fullWidthImage
          if (contentSection.fullWidthImage) {
            const fw = contentSection.fullWidthImage
            const url = fw.url || (fw as StrapiImage)?.data?.url || (fw as StrapiImage)?.data?.attributes?.url
            const alt = fw.alternativeText || (fw as StrapiImage)?.data?.attributes?.alternativeText || null
            contentSection.fullWidthImage = {
              ...fw,
              url: normalizeStrapiUrl(url) || url || '',
              alternativeText: alt
            } as StrapiImage
          }
          return contentSection
        }
        return section
      })
    }

    return page as StrapiPage
  } catch (error) {
    console.error('Error fetching page by slug:', error)
    return null
  }
}

// Helper function to get all page slugs (for debugging)
export async function getAllPageSlugs(): Promise<string[]> {
  try {
    const response = await strapiClient.get<Array<{ slug: string }>>('/pages', {
      params: {
        fields: ['slug'],
        pagination: {
          pageSize: 100
        }
      }
    });
    
    const data = extractStrapiData<Array<{ slug: string }>>(response);

    if (!Array.isArray(data)) return []

    return data
      .map((item) => item?.slug)
      .filter((slug): slug is string => !!slug)
  } catch (error) {
    console.error('Error fetching all page slugs:', error)
    return []
  }
}

