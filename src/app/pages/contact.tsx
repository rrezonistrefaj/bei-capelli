import Footer from "@/components/layout/Footer";
import MapsContact from "@/components/maps-contact";
import { getContactSectionData, getFooterData } from "@/lib/api";
import { ContactSectionData, FooterData } from "@/types/strapi";

const fallbackContactData: ContactSectionData = {
  id: 0,
  documentId: '',
  mapEmbedUrl: '',
  contactCards: [],
  createdAt: '',
  updatedAt: '',
  publishedAt: ''
}

const fallbackFooterData: FooterData = {
  id: 0,
  documentId: '',
  scheduleBlock: {
    leftTitleLabel: '',
    rightTitleLabel: '',
    schedule: []
  },
  formBlock: {
    title: '',
    description: '',
    submitText: '',
    privacyNotice: ''
  }
}

const ContactPage = async () => {
  try {
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
  } catch (error) {
    console.error('Error fetching contact/footer data:', error)
    return (
      <>
        <MapsContact data={fallbackContactData} />
        <Footer data={fallbackFooterData} />
      </>
    )
  }
}

export default ContactPage;
