import { WelcomeSectionData, WelcomeItem } from '@/types/strapi'
import { fetchSectionWithItems } from './strapi'

export async function getWelcomeSectionData(): Promise<WelcomeSectionData> {
  const data = await fetchSectionWithItems<WelcomeSectionData, WelcomeItem>(
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

