import { getServicesSectionData } from '@/lib/api'
import ServicesSection from '@/components/services-section'
import { ServicesSectionData } from '@/types/strapi'

const fallbackServicesData: ServicesSectionData = {
  id: 0,
  documentId: '',
  Title: '',
  services: [],
  carouselButtons: null,
  createdAt: '',
  updatedAt: '',
  publishedAt: ''
}

export default async function ServicesPage() {
  try {
    const servicesData = await getServicesSectionData()
    return <ServicesSection servicesData={servicesData} />
  } catch (error) {
    console.error('Error fetching services data:', error)
    return <ServicesSection servicesData={fallbackServicesData} />
  }
}