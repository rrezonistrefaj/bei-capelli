import { getServicesSectionData } from '@/lib/api'
import ServicesSection from '@/components/services-section'

export default async function ServicesPage() {
  const servicesData = await getServicesSectionData()
  
  return <ServicesSection servicesData={servicesData} />
}