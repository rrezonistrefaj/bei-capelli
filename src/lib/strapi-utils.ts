// Re-export from new location for backward compatibility
export {
  normalizeStrapiUrl,
  normalizeStrapiUrlWithFallback,
  extractStrapiData,
  validateStrapiResponse,
  normalizeCarouselButtons,
  normalizeMediaUrls,
  fetchStrapiData,
  fetchSectionWithItems,
  StrapiError,
  handleStrapiError,
  type StrapiResponse,
  type StrapiEntity
} from './services/strapi'
