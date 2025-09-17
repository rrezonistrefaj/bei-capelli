import Footer from "@/components/footer";
import MapsContact from "@/components/maps-contact";
import { getContactSectionData, getFooterData } from "@/lib/api";

const ContactPage = async () => {
  const [contactData, footerData] = await Promise.all([
    getContactSectionData(),
    getFooterData(),
  ])
  return (
    <>
      <MapsContact data={contactData} />
      <Footer data={footerData} />
    </>
  )
}

export default ContactPage;
