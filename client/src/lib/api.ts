import { strapiClient } from './strapi'
import { HeroSectionData, NavigationData, TeamMemberData, Service, ServicesSectionData, ResultsSectionData, BeforeAfterSectionData, ProductSectionData, WelcomeSectionData, LoginSectionData, ContactSectionData, FooterData, ReviewsSectionData } from '@/types/strapi'
import { fetchStrapiData, extractStrapiData, normalizeStrapiUrl, normalizeStrapiUrlWithFallback, fetchSectionWithItems } from './strapi-utils'

export async function getHomePageContent(): Promise<HeroSectionData> {
  const response = await strapiClient.get('/home-page?populate=backgroundImage')
  const data = extractStrapiData<any>(response)
  if (data.backgroundImage?.url) {
    data.backgroundImage.url = normalizeStrapiUrlWithFallback(data.backgroundImage.url)
  }

  return {
    title: data.title,
    description: data.description,
    buttonText: data.buttonText,
    backgroundImage: data.backgroundImage
  }
}

export async function getNavigationData(): Promise<NavigationData> {
  const response = await strapiClient.get('/navigation?populate=*')
  const data = extractStrapiData<NavigationData>(response)


  if (data.logoImage?.url) {
    data.logoImage.url = normalizeStrapiUrlWithFallback(data.logoImage.url)
  }

  return data
}


export async function getTeamMemberData(): Promise<TeamMemberData> {
  const data = await fetchStrapiData<TeamMemberData>('/team-member', {
    populate: {
      TeamMember: { populate: ['TeamMemberImage'] },
      CalendarIcon: true,
      ScheduleIcon: true,
      carouselButtons: {
        populate: ['prevActiveIcon', 'prevInactiveIcon', 'nextActiveIcon', 'nextInactiveIcon']
      },
    },
  }, 'team member')



  if (Array.isArray(data.TeamMember)) {
    data.TeamMember = data.TeamMember.map((member: any) => {
      if (member.TeamMemberImage?.url) {
        member.TeamMemberImage.url = normalizeStrapiUrlWithFallback(member.TeamMemberImage.url)
      }
      return member
    })
  }


  if (data.carouselButtons) {
    const { prevActiveIcon, prevInactiveIcon, nextActiveIcon, nextInactiveIcon } = data.carouselButtons
    if (prevActiveIcon?.url) prevActiveIcon.url = normalizeStrapiUrlWithFallback(prevActiveIcon.url)
    if (prevInactiveIcon?.url) prevInactiveIcon.url = normalizeStrapiUrlWithFallback(prevInactiveIcon.url)
    if (nextActiveIcon?.url) nextActiveIcon.url = normalizeStrapiUrlWithFallback(nextActiveIcon.url)
    if (nextInactiveIcon?.url) nextInactiveIcon.url = normalizeStrapiUrlWithFallback(nextInactiveIcon.url)
  }

  return data
}

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
  const response = await strapiClient.get('/services?populate=ServiceSection.ServiceItem')
  return extractStrapiData<Service[]>(response)
}

export async function getResultsSectionData(): Promise<ResultsSectionData> {
  const data = await fetchStrapiData<ResultsSectionData>('/results-section?populate=ResultCard.CardImage', {}, 'results section')


  if (Array.isArray(data.ResultCard)) {
    data.ResultCard = data.ResultCard.map((card: any) => {
      if (card.CardImage?.url) {
        card.CardImage.url = normalizeStrapiUrlWithFallback(card.CardImage.url)
      }
      return card
    })
  }

  return data
}

export async function getBeforeAfterSectionData(): Promise<BeforeAfterSectionData> {
  const data = await fetchStrapiData<BeforeAfterSectionData>('/before-after-section', {
    populate: {
      beforeAfterItems: {
        populate: 'beforeAfterImage'
      },
      carouselButtons: {
        populate: ['prevActiveIcon', 'prevInactiveIcon', 'nextActiveIcon', 'nextInactiveIcon']
      }
    }
  }, 'before-after section')


  if (data.carouselButtons) {
    const { prevActiveIcon, prevInactiveIcon, nextActiveIcon, nextInactiveIcon } = data.carouselButtons
    if (prevActiveIcon?.url) prevActiveIcon.url = normalizeStrapiUrlWithFallback(prevActiveIcon.url)
    if (prevInactiveIcon?.url) prevInactiveIcon.url = normalizeStrapiUrlWithFallback(prevInactiveIcon.url)
    if (nextActiveIcon?.url) nextActiveIcon.url = normalizeStrapiUrlWithFallback(nextActiveIcon.url)
    if (nextInactiveIcon?.url) nextInactiveIcon.url = normalizeStrapiUrlWithFallback(nextInactiveIcon.url)
  }


  const transformedData: BeforeAfterSectionData = {
    id: data.id.toString(),
    title: (data as any).Title || 'VOOR & NA',
    beforeAfterItems: data.beforeAfterItems?.map((item: any) => ({
      id: item.id.toString(),
      category: item.category,
      title: item.title,
      description: item.description,
      benefits: item.benefits || [],
      beforeAfterImage: normalizeStrapiUrlWithFallback(item.beforeAfterImage?.url, ''),
      order: item.order || 0,
      isActive: item.isActive
    })) || [],
    filterOptions: (data as any).filterOptions || ["All", "Kleuringen", "Stylen", "Knippen"],
    enableZoom: (data as any).enableZoom,
    carouselButtons: data.carouselButtons
  }

  return transformedData
}

export async function getProductSectionData(): Promise<ProductSectionData> {
  const data = await fetchStrapiData<ProductSectionData>('/product?populate=*', {}, 'product')


  if (data.ButtonIcon?.url) {
    data.ButtonIcon.url = normalizeStrapiUrlWithFallback(data.ButtonIcon.url)
  }
  if (data.ProductLogo?.url) {
    data.ProductLogo.url = normalizeStrapiUrlWithFallback(data.ProductLogo.url)
  }
  if (data.ProductImage?.url) {
    data.ProductImage.url = normalizeStrapiUrlWithFallback(data.ProductImage.url)
  }

  return data
}

export async function getWelcomeSectionData(): Promise<WelcomeSectionData> {
  const data = await fetchSectionWithItems<any, any>(
    'welcome-section',
    'welcome-items',
    'icon',
    'welcome'
  )

  return {
    ...data,
    welcomeItems: data.welcomeitems || []
  } as WelcomeSectionData
}

export async function getLoginSectionData(): Promise<LoginSectionData> {
  const data = await fetchStrapiData<LoginSectionData>('/login-section', {}, 'login section')

  return {
    id: data.id,
    documentId: data.documentId,
    title: (data as any).Title,
    subtitle: (data as any).Subtitle,
    description: (data as any).Description,
    emailPlaceholder: data.emailPlaceholder,
    passwordPlaceholder: data.passwordPlaceholder,
    buttonText: data.buttonText,
    redirectUrl: (data as any).buttonURL,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    publishedAt: data.publishedAt
  }
}

export async function getContactSectionData(): Promise<ContactSectionData> {
  const data = await fetchSectionWithItems<any, any>(
    'contact-section',
    'contact-cards',
    'icon',
    'contact'
  )

  return {
    ...data,
    contactCards: data.contactcards || []
  } as ContactSectionData
}

export async function getFooterData(): Promise<FooterData> {
  const data = await fetchStrapiData<FooterData>('/footer', {
    populate: {
      scheduleBlock: { populate: 'schedule' },
      formBlock: true,
    }
  }, 'footer')

  return data
}


export async function getPageBySlug(slug: string): Promise<any | null> {
  try {
    const response = await strapiClient.get('/pages', {
      params: {
        filters: {
          slug: slug
        },
        populate: {
          sections: {
            populate: '*'
          }
        }
      },
    })

    const data = extractStrapiData<any[]>(response)

    if (!Array.isArray(data) || data.length === 0) return null

    const page = data[0] || null

    // Normalize media URLs inside sections for slug pages
    if (page && Array.isArray(page.sections)) {
      page.sections = page.sections.map((section: any) => {
        if (section.__component === 'sections.content-section') {
          // Normalize gallery images
          if (Array.isArray(section.images)) {
            section.images = section.images
              .filter((img: any) => img && (img.url || img?.attributes?.url))
              .map((img: any) => ({
                ...img,
                url: normalizeStrapiUrl(img.url || img?.attributes?.url),
                alternativeText: img.alternativeText || img?.attributes?.alternativeText || '',
                caption: img.caption || img?.attributes?.caption || ''
              }))
          } else if (section.images?.data && Array.isArray(section.images.data)) {
            section.images = section.images.data
              .filter((img: any) => img && (img.url || img?.attributes?.url))
              .map((img: any) => ({
                ...img,
                url: normalizeStrapiUrl(img.url || img?.attributes?.url),
                alternativeText: img.alternativeText || img?.attributes?.alternativeText || '',
                caption: img.caption || img?.attributes?.caption || ''
              }))
          }

          // Normalize fullWidthImage
          if (section.fullWidthImage) {
            const fw = section.fullWidthImage
            const url = fw.url || fw?.data?.url || fw?.data?.attributes?.url
            const alt = fw.alternativeText || fw?.data?.attributes?.alternativeText || ''
            section.fullWidthImage = {
              ...fw,
              url: normalizeStrapiUrl(url) || url,
              alternativeText: alt
            }
          }
        }
        return section
      })
    }

    return page
  } catch (error) {
    const { logger } = await import('./logger')
    logger.error('Error fetching page by slug')
    return null
  }
}

export async function getReviewsSectionData(): Promise<ReviewsSectionData> {
  const data = await fetchStrapiData<ReviewsSectionData>('/reviews-section', {
    populate: {
      reviews: {
        populate: 'customerAvatar'
      },
      carouselButtons: {
        populate: ['prevActiveIcon', 'prevInactiveIcon', 'nextActiveIcon', 'nextInactiveIcon']
      },
      button: {
        populate: 'icon'
      }
    }
  }, 'reviews section')


  if (data.carouselButtons) {
    const { prevActiveIcon, prevInactiveIcon, nextActiveIcon, nextInactiveIcon } = data.carouselButtons
    if (prevActiveIcon?.url) prevActiveIcon.url = normalizeStrapiUrlWithFallback(prevActiveIcon.url)
    if (prevInactiveIcon?.url) prevInactiveIcon.url = normalizeStrapiUrlWithFallback(prevInactiveIcon.url)
    if (nextActiveIcon?.url) nextActiveIcon.url = normalizeStrapiUrlWithFallback(nextActiveIcon.url)
    if (nextInactiveIcon?.url) nextInactiveIcon.url = normalizeStrapiUrlWithFallback(nextInactiveIcon.url)
  }


  if (data.button?.icon?.url) {
    data.button.icon.url = normalizeStrapiUrlWithFallback(data.button.icon.url)
  }


  if (Array.isArray(data.reviews)) {
    data.reviews = data.reviews
      .map((review: any) => {
        if (review.customerAvatar?.url) {
          review.customerAvatar.url = normalizeStrapiUrlWithFallback(review.customerAvatar.url)
        }
        return review
      })
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
  }

  return data
}
