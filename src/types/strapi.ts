import type { BlocksContent } from '@strapi/blocks-react-renderer'

export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

// Media format structure for Strapi images
export interface StrapiMediaFormat {
  url: string
  width: number
  height: number
}

// Media formats can have different combinations (thumbnail, small, medium, large)
// All formats are optional since Strapi may not generate all sizes
export interface StrapiMediaFormats {
  thumbnail?: StrapiMediaFormat
  small?: StrapiMediaFormat
  medium?: StrapiMediaFormat
  large?: StrapiMediaFormat
}

// Provider metadata is provider-specific and can vary
// Using Record<string, unknown> to allow any provider-specific fields
export type StrapiProviderMetadata = Record<string, unknown> | null

// Rich text blocks from Strapi (using BlocksContent from @strapi/blocks-react-renderer)
// This is the standard format for Strapi rich text fields
export type StrapiRichTextBlocks = BlocksContent

// Rich text child node (text, link, etc.) - used in parseRichText functions
export interface RichTextChild {
  text?: string
  bold?: boolean
  italic?: boolean
  type?: 'text' | 'link'
  url?: string
  [key: string]: unknown // Allow other properties
}

// Rich text block structure (for parseRichText functions)
export interface RichTextBlock {
  type: 'paragraph' | 'heading' | 'list'
  level?: number // For headings
  format?: 'ordered' | 'unordered' // For lists
  children?: RichTextChild[] | RichTextBlock[] // Can be children or nested blocks (for list items)
  [key: string]: unknown // Allow other properties
}

// Standardized image structure that handles both Strapi v4+ format and normalized format
export interface StrapiImage {
  url: string
  alternativeText?: string | null
  caption?: string | null
  // Optional fields for Strapi v4+ format compatibility
  id?: number
  documentId?: string
  name?: string
  width?: number
  height?: number
  // Handle nested Strapi v4+ structure
  data?: {
    url?: string
    attributes?: {
      url: string
      alternativeText?: string | null
      caption?: string | null
    }
  }
  attributes?: {
    url: string
    alternativeText?: string | null
    caption?: string | null
  }
}

// Base structure for all page sections
interface BasePageSection {
  __component: string
  id?: number
}

// Content section data structure (used by ContentSection component)
export interface ContentSectionData {
  headings?: string[]
  heading?: string
  description?: string
  richText?: StrapiRichTextBlocks | string
  buttonLabel?: string
  buttonUrl?: string
  images?: StrapiImage[] | { data?: StrapiImage[] }
  fullWidthImage?: StrapiImage | { data?: { url?: string; attributes?: { url: string; alternativeText?: string | null } } }
  overlayTitle?: string
  overlayContent?: string
  overlayButtonLabel?: string
  overlayButtonUrl?: string
}

// Content section structure (for page sections)
export interface ContentPageSection extends BasePageSection {
  __component: 'sections.content-section'
  headings?: string[]
  description?: string
  images?: StrapiImage[]
  fullWidthImage?: StrapiImage
  overlayCard?: {
    title?: string
    content?: string
    buttonLabel?: string
    buttonUrl?: string
  }
}

// Simple image section data structure (used by SimpleImageSection component)
export interface SimpleImageSectionData {
  title?: string
  Title?: string
  image?: StrapiImage | { data?: { url?: string; attributes?: { url: string; alternativeText?: string | null } } }
  fullWidthImage?: StrapiImage | { data?: { url?: string; attributes?: { url: string; alternativeText?: string | null } } }
}

// Simple image section structure (for page sections)
export interface SimpleImagePageSection extends BasePageSection {
  __component: 'sections.simple-image-section'
  title?: string
  Title?: string
  image?: StrapiImage
  fullWidthImage?: StrapiImage
}

// Policy block structure
export interface PolicyBlock {
  body?: StrapiRichTextBlocks | string
  [key: string]: unknown
}

// Policy section data structure (used by PolicySection component)
export interface PolicySectionData {
  title?: string
  blocks?: PolicyBlock[]
}

// Policy section structure (for page sections)
export interface PolicyPageSection extends BasePageSection {
  __component: 'sections.policy-section'
  title?: string
  blocks?: PolicyBlock[]
}

// Union type for all possible page sections
export type StrapiPageSection = ContentPageSection | SimpleImagePageSection | PolicyPageSection

export interface HomePageContent {
  id: number
  attributes: {
    title: string
    description: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

export interface HeroSectionData {
  title: string
  description: string
  buttonText: string
  backgroundImage?: {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    formats: StrapiMediaFormats
    url: string
    provider: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

export interface NavigationItem {
  id: number
  label: string
  URL: string
  Order: number
}

export interface NavButton {
  id: number
  ButtonText: string
  buttonURL: string
  openInNewTab: boolean | null
}

export interface NavigationData {
  id: number
  documentId: string
  logoAltText: string
  logoLinkURL: string
  logoImage: {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    formats: StrapiMediaFormats
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string | null
    provider: string
    provider_metadata: StrapiProviderMetadata
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  NavigationItems: NavigationItem[]
  navButton: NavButton
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface CarouselButtons {
  id: number
  prevActiveIcon?: {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    url: string
    formats: StrapiMediaFormats
    hash: string
    ext: string
    mime: string
    size: number
    previewUrl: string | null
    provider: string
    provider_metadata: StrapiProviderMetadata
    createdAt: string
    updatedAt: string
    publishedAt: string
  } | null
  prevInactiveIcon?: {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    url: string
    formats: StrapiMediaFormats
    hash: string
    ext: string
    mime: string
    size: number
    previewUrl: string | null
    provider: string
    provider_metadata: StrapiProviderMetadata
    createdAt: string
    updatedAt: string
    publishedAt: string
  } | null
  nextActiveIcon?: {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    url: string
    formats: StrapiMediaFormats
    hash: string
    ext: string
    mime: string
    size: number
    previewUrl: string | null
    provider: string
    provider_metadata: StrapiProviderMetadata
    createdAt: string
    updatedAt: string
    publishedAt: string
  } | null
  nextInactiveIcon?: {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    url: string
    formats: StrapiMediaFormats
    hash: string
    ext: string
    mime: string
    size: number
    previewUrl: string | null
    provider: string
    provider_metadata: StrapiProviderMetadata
    createdAt: string
    updatedAt: string
    publishedAt: string
  } | null
}

export interface TeamMemberImage {
  id: number
  documentId: string
  url: string
  name: string
  width?: number
  height?: number
  mime?: string
}

export interface TeamMemberItem {
  id: number
  Order: number
  Name: string
  Role: string
  TeamMemberImage?: TeamMemberImage | null
  Availability: StrapiRichTextBlocks
  Schedule: string
}

export interface TeamMemberData extends Record<string, unknown> {
  id: number
  documentId: string
  Title: string
  Description: string
  CalendarIcon?: { url: string } | null
  ScheduleIcon?: { url: string } | null
  TeamMember: TeamMemberItem[]
  carouselButtons?: CarouselButtons | null
}

export interface ServiceItem {
  id: number
  Service: string
  Price: string
}

export interface ServiceSection {
  id: number
  Category: string
  PriceLabel: string
  ServiceItem: ServiceItem[]
}

export interface Service {
  id: number
  documentId: string
  Title: string
  Order: number
  ServiceSection: ServiceSection[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface ServicesSectionData extends Record<string, unknown> {
  id: number
  documentId: string
  Title: string
  services: Service[]
  carouselButtons?: CarouselButtons | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface ResultCard {
  id: number
  Title: string
  Description: string
  CardImage?: {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    url: string
    formats: {
      thumbnail: {
        url: string
        width: number
        height: number
      }
      small: {
        url: string
        width: number
        height: number
      }
    }
    hash: string
    ext: string
    mime: string
    size: number
    previewUrl: string | null
    provider: string
    provider_metadata: StrapiProviderMetadata
    createdAt: string
    updatedAt: string
    publishedAt: string
  } | null
  ButtonText: string
  ButtonURL: string
  Order: number
}

export interface ResultsSectionData extends Record<string, unknown> {
  id: number
  documentId: string
  ResultCard: ResultCard[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface BeforeAfterItem {
  id: string
  category: 'Kleuringen' | 'Stylen' | 'Knippen'
  title: string
  description: string
  benefits: string[]
  beforeAfterImage: string
  order: number
  isActive: boolean
}

export interface BeforeAfterSectionData {
  id: string
  title: string
  beforeAfterItems: BeforeAfterItem[]
  filterOptions: string[]
  enableZoom: boolean
  carouselButtons?: CarouselButtons | null
}

export interface ProductSectionData extends Record<string, unknown> {
  id: number
  documentId: string
  Title: string
  Description: Array<{
    type: string
    children: Array<{
      type: string
      text: string
    }>
  }>
  ButtonText: string
  ButtonURL: string
  ButtonIcon: {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    url: string
    formats: StrapiMediaFormats
    hash: string
    ext: string
    mime: string
    size: number
    previewUrl: string | null
    provider: string
    provider_metadata: StrapiProviderMetadata
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  ProductLogo: {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    url: string
    formats: StrapiMediaFormats
    hash: string
    ext: string
    mime: string
    size: number
    previewUrl: string | null
    provider: string
    provider_metadata: StrapiProviderMetadata
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  ProductImage: {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    url: string
    formats: {
      thumbnail: {
        url: string
        width: number
        height: number
      }
      small: {
        url: string
        width: number
        height: number
      }
    }
    hash: string
    ext: string
    mime: string
    size: number
    previewUrl: string | null
    provider: string
    provider_metadata: StrapiProviderMetadata
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface WelcomeItem extends Record<string, unknown> {
  id: number
  documentId: string
  title: string
  description: Array<{
    type: string
    children: Array<{
      type: string
      text: string
      bold?: boolean
    }>
  }>
  icon: {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    url: string
    formats: {
      thumbnail: {
        url: string
        width: number
        height: number
      }
      small: {
        url: string
        width: number
        height: number
      }
    }
    hash: string
    ext: string
    mime: string
    size: number
    previewUrl: string | null
    provider: string
    provider_metadata: StrapiProviderMetadata
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  order: number
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface WelcomeSectionData extends Record<string, unknown> {
  id: number
  documentId: string
  title: string
  description: string
  welcomeItems: WelcomeItem[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface LoginSectionData {
  id: number
  documentId: string
  title: string
  subtitle: string
  description: string
  emailPlaceholder: string
  passwordPlaceholder: string
  buttonText: string
  redirectUrl: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface ContactCard extends Record<string, unknown> {
  id: number
  documentId: string
  title: string
  content: string[]
  icon: {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    url: string
    formats: {
      thumbnail: {
        url: string
        width: number
        height: number
      }
      small: {
        url: string
        width: number
        height: number
      }
    }
    hash: string
    ext: string
    mime: string
    size: number
    previewUrl: string | null
    provider: string
    provider_metadata: StrapiProviderMetadata
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  order: number
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface ContactSectionData extends Record<string, unknown> {
  id: number
  documentId: string
  mapEmbedUrl: string
  contactCards: ContactCard[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface StrapiEntity {
  id: number
  attributes: Record<string, unknown>
}

export interface StarRating {
  id: number
  rating: number
  starIcon?: {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    url: string
    formats: StrapiMediaFormats
    hash: string
    ext: string
    mime: string
    size: number
    previewUrl: string | null
    provider: string
    provider_metadata: StrapiProviderMetadata
    createdAt: string
    updatedAt: string
    publishedAt: string
  } | null
  emptyStarIcon?: {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    url: string
    formats: StrapiMediaFormats
    hash: string
    ext: string
    mime: string
    size: number
    previewUrl: string | null
    provider: string
    provider_metadata: StrapiProviderMetadata
    createdAt: string
    updatedAt: string
    publishedAt: string
  } | null
}

export interface ReviewItem {
  id: number
  customerName: string
  reviewText: string
  rating: number
  reviewDate: string
  customerAvatar?: {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    url: string
    formats: StrapiMediaFormats
    hash: string
    ext: string
    mime: string
    size: number
    previewUrl: string | null
    provider: string
    provider_metadata: StrapiProviderMetadata
    createdAt: string
    updatedAt: string
    publishedAt: string
  } | null
  order: number
}

export interface Button {
  id: number
  text: string
  icon?: {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    url: string
    formats: StrapiMediaFormats
    hash: string
    ext: string
    mime: string
    size: number
    previewUrl: string | null
    provider: string
    provider_metadata: StrapiProviderMetadata
    createdAt: string
    updatedAt: string
    publishedAt: string
  } | null
}

export interface ReviewsSectionData extends Record<string, unknown> {
  id: number
  documentId: string
  title: string
  reviews: ReviewItem[]
  carouselButtons?: CarouselButtons | null
  button?: Button | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface FooterScheduleItem {
  id: number
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
  hours: string
}

export interface FooterScheduleBlock {
  leftTitleLabel: string
  rightTitleLabel: string
  schedule: FooterScheduleItem[]
}

export interface FooterFormBlock {
  title: string
  description: string
  submitText: string
  privacyNotice: string
}

export interface FooterData extends Record<string, unknown> {
  id: number
  documentId: string
  scheduleBlock: FooterScheduleBlock
  formBlock: FooterFormBlock
}
