


import dynamic from "next/dynamic"
import HeroPage from "./pages/hero"
import Divider from "@/components/ui/divider"

// Lazy load below-the-fold sections (ssr: true is default for server components)
const TeamMembersPage = dynamic(() => import("./pages/team-members"))
const ServicesPage = dynamic(() => import("./pages/services"))
const ResultsPage = dynamic(() => import("./pages/results"))
const ProductsPage = dynamic(() => import("./pages/products"))
const ReviewsPage = dynamic(() => import("./pages/reviews"))
const WelcomeAppointmentPage = dynamic(() => import("./pages/welcome-appointment"))
const ContactPage = dynamic(() => import("./pages/contact"))

export default function Home() {
  return (
    <>
      <div id="home" className="scroll-mt-24">
        <HeroPage />
      </div>

      <div id="team-members" className="scroll-mt-24">
        <TeamMembersPage />
      </div>

      <div id="services" className="scroll-mt-24">
        <ServicesPage />
      </div>

      <Divider />

      <div id="results" className="scroll-mt-24">
        <ResultsPage />
      </div>
<Divider />
      <div id="products" className="scroll-mt-24">
        <ProductsPage />
      </div>
<Divider />
      <div id="reviews" className="scroll-mt-24">
        <ReviewsPage />
      </div>

      <div id="welcome-appointment" className="scroll-mt-24">
        <WelcomeAppointmentPage />
      </div>

      <div id="contact" className="scroll-mt-24">
        <ContactPage />
      </div>
    </>
  )
}
