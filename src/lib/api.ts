// Re-export from service files for backward compatibility
export { getHomePageContent } from './services/homePage'
export { getNavigationData } from './services/navigation'
export { getTeamMemberData } from './services/teamMembers'
export { getServicesSectionData, getServicesData } from './services/services'
export { getResultsSectionData } from './services/results'
export { getProductSectionData } from './services/products'
export { getReviewsSectionData } from './services/reviews'
export { getContactSectionData, getLoginSectionData } from './services/contact'
export { getFooterData } from './services/footer'
export { getPageBySlug } from './services/pages'
export { getBeforeAfterSectionData } from './services/beforeAfter'
export { getWelcomeSectionData } from './services/welcome'

// Re-export types for convenience
export type {
  HeroSectionData,
  NavigationData,
  TeamMemberData,
  Service,
  ServicesSectionData,
  ResultsSectionData,
  BeforeAfterSectionData,
  ProductSectionData,
  WelcomeSectionData,
  LoginSectionData,
  ContactSectionData,
  FooterData,
  ReviewsSectionData
} from '@/types/strapi'
