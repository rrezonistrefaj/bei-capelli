import WelcomeSection from "@/components/welcome-section";
import { getWelcomeSectionData } from "@/lib/api";

export default async function WelcomeAppointmentPage() {
  const data = await getWelcomeSectionData();
  return <WelcomeSection data={data} />;
}
