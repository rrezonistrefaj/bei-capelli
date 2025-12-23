import WelcomeSection from "@/components/welcome-section";
import LoginSection from "@/components/login-section";
import { getWelcomeSectionData, getLoginSectionData } from "@/lib/api";
import { WelcomeSectionData, LoginSectionData } from "@/types/strapi";

const fallbackWelcomeData: WelcomeSectionData = {
  id: 0,
  documentId: '',
  title: '',
  description: '',
  welcomeItems: [],
  createdAt: '',
  updatedAt: '',
  publishedAt: ''
}

const fallbackLoginData: LoginSectionData = {
  id: 0,
  documentId: '',
  title: '',
  subtitle: '',
  description: '',
  emailPlaceholder: '',
  passwordPlaceholder: '',
  buttonText: '',
  redirectUrl: '',
  createdAt: '',
  updatedAt: '',
  publishedAt: ''
}

export default async function WelcomeAppointmentPage() {
  try {
    const [welcomeData, loginData] = await Promise.all([
      getWelcomeSectionData(),
      getLoginSectionData()
    ]);
    
    return (
      <>
        <WelcomeSection data={welcomeData} />
        <LoginSection data={loginData} />
      </>
    );
  } catch (error) {
    console.error('Error fetching welcome/login data:', error)
    return (
      <>
        <WelcomeSection data={fallbackWelcomeData} />
        <LoginSection data={fallbackLoginData} />
      </>
    );
  }
}
