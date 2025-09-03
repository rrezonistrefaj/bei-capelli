import React from "react"
import { HelpCircle, User, Monitor, Phone, Clock, Gift } from "lucide-react"

const WelcomeSection = () => {
  return (
    <section className="py-16" style={{ backgroundColor: "#DFD6C9" }}>
      <div className="max-w-[856px] mx-auto text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 tracking-tight leading-tight">
          EVERYONE IS
          <span className="block">WELCOME</span>
        </h2>

  <p className="text-sm text-black mb-12 max-w-[680px] mx-auto">
          Everyone is welcome at Bei Capelli Kapper Bennekom. Make an appointment in advance to avoid
          disappointment, that way, you'll always have your spot when it suits you best.
        </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-12">
          <div className="flex flex-col items-center text-center px-4">
            <HelpCircle className="h-9 w-9 text-black mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-black">Need Help Booking?</h3>
      <p className="text-sm text-black">If you're unsure while booking, don't hesitate to contact us. We're happy to help!</p>
          </div>

          <div className="flex flex-col items-center text-center px-4">
            <User className="h-9 w-9 text-black mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-black">New Client?</h3>
            <p className="text-sm text-black">Are you visiting for the first time? Give us a call to book your appointment. After your first visit, we'll create an account for you so you can use our online system in the future.</p>
          </div>

          <div className="flex flex-col items-center text-center px-4">
            <Monitor className="h-9 w-9 text-black mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-black">Book Online Anytime</h3>
            <p className="text-sm text-black">You can make an appointment 24/7 online with a top stylist of your choice. After booking, you'll receive an SMS or email reminder 24 hours before your appointment.</p>
          </div>

          <div className="flex flex-col items-center text-center px-4">
            <Phone className="h-9 w-9 text-black mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-black">Need to Cancel or Reschedule?</h3>
            <p className="text-sm text-black">Online bookings cannot be changed online. To cancel or reschedule, please call us in time at: <br /><span className="font-medium">(0318) 57 61 70</span></p>
          </div>

          <div className="flex flex-col items-center text-center px-4">
            <Clock className="h-9 w-9 text-black mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-black">Standard 40-Minute Treatments</h3>

            <p className="text-sm text-black whitespace-pre-line">To help us serve all clients efficiently, we kindly ask you to choose from our standard 40-minute treatments.

For example: haircuts and/or coloring. Available times:
09:00 / 09:40 / 10:20 / 11:00 / 11:40 / 13:20 / 14:00 / 14:40 / 15:20 / 16:00 / 16:40 / 18:20 / 19:00 / 19:40 / 20:20</p>
          </div>

          <div className="flex flex-col items-center text-center px-4">
            <Gift className="h-9 w-9 text-black mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-black">Returning Clients</h3>
            <p className="text-sm text-black">Do you visit us regularly? Join our special program and enjoy exclusive deals, more value, and extra service.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WelcomeSection