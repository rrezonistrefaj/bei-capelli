import { getHomePageContent } from "@/lib/api"
import HeroSection from "@/components/hero-section"

export default async function HeroPage() {
  try {
    const heroData = await getHomePageContent()
    return <HeroSection heroData={heroData} />
  } catch (error) {
    console.error('Failed to load hero data:', error)
    return <HeroSection heroData={null} />
  }
}