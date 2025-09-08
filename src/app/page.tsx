


import HeroPage from "./pages/hero"
import ProductsPage from "./pages/products"
import ResultsPage from "./pages/results"
import ServicesPage from "./pages/services"
import Divider from "@/components/ui/divider"
import TeamMembersPage from "./pages/team-members"
import ReviewsPage from "./pages/reviews"
import WelcomeAppointmentPage from "./pages/welcome-appointment"
import ContactPage from "./pages/contact"

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
