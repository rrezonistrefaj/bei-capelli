
import React from 'react'
import { MapPin, Phone, Mail, LucideIcon } from 'lucide-react'

interface ContactCard {
  icon: LucideIcon
  title: string
  content: string[]
}

const MapsContact: React.FC = () => {
  const contactCards: ContactCard[] = [
    {
      icon: MapPin,
      title: "Address",
      content: [
        "Bei Capelli Haarmode",
        "Kerkstraat 4",
        "6721 VA Bennekom"
      ]
    },
    {
      icon: Phone,
      title: "Phone",
      content: ["(0318) 57 61 70"]
    },
    {
      icon: Mail,
      title: "Email",
      content: ["info@bei-capelli.nl"]
    }
  ]

  return (
  <div className=" px-4 xl:px-0 relative">
      <div className="relative max-w-[1256px] mx-auto">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2446.8234567890123!2d5.6789012345678!3d51.9876543210987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBei%20Capelli%20Bennekom%2C%20Kerkstraat%204%2C%206721%20VA%20Bennekom%2C%20Netherlands!5e0!3m2!1sen!2snl!4v1234567890123!5m2!1sen!2snl"
        width="100%"
        height="500"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-[420px] md:h-[500px] border border-black"
      />

      <div className="relative mt-6 md:mt-0 md:absolute md:-bottom-40 md:left-4 md:right-4 flex flex-col sm:flex-row items-stretch md:justify-center gap-4 ">
        {contactCards.map((card, index) => {
          const IconComponent = card.icon
          return (
            <div key={index} className="border border-black p-5 text-center w-full md:flex-1 md:max-w-[220px] bg-[#E0D7C9]">
              <div className="flex justify-center mb-2">
                <IconComponent className="w-13 h-13 text-black" />
              </div>
              <h3 className="text-xl font-normal text-black mb-3.5">{card.title}</h3>
              <div className="flex flex-col justify-center min-h-[60px]">
                <div className="text-black text-base font-light text-center">
                  {card.content.map((line, lineIndex) => (
                    <p key={lineIndex} className="text-center">{line}</p>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      </div>
    </div>
  )
}

export default MapsContact