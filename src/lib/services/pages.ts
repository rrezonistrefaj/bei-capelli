import { normalizeStrapiUrl } from './strapi'
import type { StrapiPageSection, StrapiImage, ContentPageSection } from '@/types/strapi'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN
const DEFAULT_REVALIDATE_SECONDS = 60

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
    
    // Use direct URL searchParams approach like treplus for reliability
    const url = new URL(`${STRAPI_URL}/api/pages`);
    url.searchParams.append('filters[slug]', slug);
    url.searchParams.append('populate[sections][populate]', '*');
    url.searchParams.append('populate[seo][populate][shareImage]', 'true');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (STRAPI_API_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
    }
    
    const response = await fetch(url.toString(), {
      headers,
      next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
    });
    
    if (!response.ok) {
      return null;
    }
    
    const result = await response.json();
    
    if (!result.data || !Array.isArray(result.data) || result.data.length === 0) {
      return null;
    }

    // Extract the page data (Strapi v4+ format: { id, attributes: {...} })
    const item = result.data[0];
    const { id, attributes } = item;
    const page = attributes ? { id, ...attributes } : item;

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
    const url = new URL(`${STRAPI_URL}/api/pages`);
    url.searchParams.append('fields[0]', 'slug');
    url.searchParams.append('pagination[pageSize]', '100');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (STRAPI_API_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
    }
    
    const response = await fetch(url.toString(), {
      headers,
      next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
    });
    
    if (!response.ok) {
      return [];
    }
    
    const result = await response.json();
    const data = result.data || []

    if (!Array.isArray(data)) return []

    interface StrapiPageSlugItem {
      slug?: string
      attributes?: {
        slug?: string
      }
    }

    return data
      .map((item: StrapiPageSlugItem): string | undefined => {
        // Handle Strapi v4+ format: { id, attributes: { slug } } or flat { slug }
        const slug = item?.attributes?.slug || item?.slug;
        return slug;
      })
      .filter((slug: string | undefined): slug is string => !!slug)
  } catch (error) {
    console.error('Error fetching all page slugs:', error)
    return []
  }
}

