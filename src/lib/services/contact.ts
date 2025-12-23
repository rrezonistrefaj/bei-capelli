import { ContactSectionData, ContactCard, LoginSectionData } from '@/types/strapi'
import { fetchStrapiData, fetchSectionWithItems } from './strapi'

export async function getContactSectionData(): Promise<ContactSectionData> {
  const data = await fetchSectionWithItems<ContactSectionData, ContactCard>(
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

// Type for raw Strapi login section data (may have different field names)
interface RawLoginSectionData {
  id: number
  documentId: string
  Title?: string
  Subtitle?: string
  Description?: string
  emailPlaceholder: string
  passwordPlaceholder: string
  buttonText: string
  buttonURL?: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export async function getLoginSectionData(): Promise<LoginSectionData> {
  const data = await fetchStrapiData<Record<string, unknown>>('/login-section', {}, 'login section') as unknown as RawLoginSectionData

  return {
    id: data.id,
    documentId: data.documentId,
    title: data.Title || '',
    subtitle: data.Subtitle || '',
    description: data.Description || '',
    emailPlaceholder: data.emailPlaceholder,
    passwordPlaceholder: data.passwordPlaceholder,
    buttonText: data.buttonText,
    redirectUrl: data.buttonURL || '',
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    publishedAt: data.publishedAt
  }
}

