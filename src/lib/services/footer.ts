import { FooterData } from '@/types/strapi'
import { fetchStrapiData } from './strapi'

export async function getFooterData(): Promise<FooterData> {
  const data = await fetchStrapiData<Record<string, unknown>>('/footer', {
    populate: {
      scheduleBlock: { populate: 'schedule' },
      formBlock: true,
    }
  }, 'footer')

  return data as unknown as FooterData
}

