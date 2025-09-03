
import React from 'react'
import { MapPin, Phone, Mail } from 'lucide-react'

const MapsContact: React.FC = () => {
  return (
    <div className="bg-[#DFD6C9]">
      <div className="relative max-w-[1256px] mx-auto">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2446.8234567890123!2d5.6789012345678!3d51.9876543210987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBei%20Capelli%20Bennekom%2C%20Kerkstraat%204%2C%206721%20VA%20Bennekom%2C%20Netherlands!5e0!3m2!1sen!2snl!4v1234567890123!5m2!1sen!2snl"
        width="100%"
        height="500"
        style={{ border: "1px solid #000" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full"
      />

  <div className="absolute -bottom-10 left-4 right-4 flex justify-center gap-4">
        {/* Address Card */}
  <div className="bg-[#DFD6C9] border border-black p-3 text-center flex-1 max-w-[220px]">
          <div className="flex justify-center mb-2">
            <MapPin className="w-5 h-5 text-black" />
          </div>
          <h3 className="text-sm font-semibold text-black mb-1">Address</h3>
          <div className="text-black text-xs">
            <p>Bei Capelli Haarmode</p>
            <p>Kerkstraat 4</p>
            <p>6721 VA Bennekom</p>
          </div>
        </div>

        {/* Phone Card */}
  <div className="bg-[#DFD6C9] border border-black p-3 text-center flex-1 max-w-[220px]">
          <div className="flex justify-center mb-2">
            <Phone className="w-5 h-5 text-black" />
          </div>
          <h3 className="text-sm font-semibold text-black mb-1">Phone</h3>
          <div className="text-black text-xs">
            <p>(0318) 57 61 70</p>
          </div>
        </div>

        {/* Email Card */}
  <div className="bg-[#DFD6C9] border border-black p-3 text-center flex-1 max-w-[220px]">
          <div className="flex justify-center mb-2">
            <Mail className="w-5 h-5 text-black" />
          </div>
          <h3 className="text-sm font-semibold text-black mb-1">Email</h3>
          <div className="text-black text-xs">
            <p>info@bei-capelli.nl</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default MapsContact