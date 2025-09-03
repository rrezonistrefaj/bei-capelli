


import HeroPage from "./pages/hero"
import ProductsPage from "./pages/products"
import ResultsPage from "./pages/results"
import ServicesPage from "./pages/services"
import TeamMembersPage from "./pages/team-members"
import ReviewsPage from "./pages/reviews"
import WelcomeAppointmentPage from "./pages/welcome-appointment"
import ContactPage from "./pages/contact"

export default function Home() {
  return (
    <>
      <HeroPage />
      <TeamMembersPage />
      <ServicesPage />
      <ResultsPage />
      <ProductsPage />
      <ReviewsPage />
      <WelcomeAppointmentPage />
      <ContactPage /> 
    </>
  )
}
