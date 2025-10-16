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
    formats: {
      thumbnail: {
        url: string
        width: number
        height: number
      }
      medium: {
        url: string
        width: number
        height: number
      }
      small: {
        url: string
        width: number
        height: number
      }
      large: {
        url: string
        width: number
        height: number
      }
    }
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
    formats: any
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string | null
    provider: string
    provider_metadata: any
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
    formats: any
    hash: string
    ext: string
    mime: string
    size: number
    previewUrl: string | null
    provider: string
    provider_metadata: any
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
    formats: any
    hash: string
    ext: string
    mime: string
    size: number
    previewUrl: string | null
    provider: string
    provider_metadata: any
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
    formats: any
    hash: string
    ext: string
    mime: string
    size: number
    previewUrl: string | null
    provider: string
    provider_metadata: any
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
    formats: any
    hash: string
    ext: string
    mime: string
    size: number
    previewUrl: string | null
    provider: string
    provider_metadata: any
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
  Availability: any // Strapi rich text blocks
  Schedule: string
}

export interface TeamMemberData {
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

export interface ServicesSectionData {
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
    provider_metadata: any
    createdAt: string
    updatedAt: string
    publishedAt: string
  } | null
  ButtonText: string
  ButtonURL: string
  Order: number
}

export interface ResultsSectionData {
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

export interface ProductSectionData {
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
    formats: any
    hash: string
    ext: string
    mime: string
    size: number
    previewUrl: string | null
    provider: string
    provider_metadata: any
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
    formats: any
    hash: string
    ext: string
    mime: string
    size: number
    previewUrl: string | null
    provider: string
    provider_metadata: any
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
    provider_metadata: any
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface WelcomeItem {
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
    provider_metadata: any
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  order: number
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface WelcomeSectionData {
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

export interface ContactCard {
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
    provider_metadata: any
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  order: number
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface ContactSectionData {
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
  attributes: Record<string, any>
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
    formats: any
    hash: string
    ext: string
    mime: string
    size: number
    previewUrl: string | null
    provider: string
    provider_metadata: any
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
    formats: any
    hash: string
    ext: string
    mime: string
    size: number
    previewUrl: string | null
    provider: string
    provider_metadata: any
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
    formats: any
    hash: string
    ext: string
    mime: string
    size: number
    previewUrl: string | null
    provider: string
    provider_metadata: any
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
    formats: any
    hash: string
    ext: string
    mime: string
    size: number
    previewUrl: string | null
    provider: string
    provider_metadata: any
    createdAt: string
    updatedAt: string
    publishedAt: string
  } | null
}

export interface ReviewsSectionData {
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

export interface FooterData {
  id: number
  documentId: string
  scheduleBlock: FooterScheduleBlock
  formBlock: FooterFormBlock
}
