import WelcomeSection from "@/components/welcome-section";
import LoginSection from "@/components/login-section";
import { getWelcomeSectionData, getLoginSectionData } from "@/lib/api";

export default async function WelcomeAppointmentPage() {
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
}
