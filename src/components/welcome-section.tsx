import React from "react"
import { HelpCircle, User, Monitor, Phone, Clock, Gift } from "lucide-react"

const items: {
  id: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: React.ReactNode
  pClass?: string
}[] = [
  {
    id: "help",
    Icon: HelpCircle,
    title: "Need Help Booking?",
    description: (
      <>If you&#39;re unsure while booking, don&#39;t hesitate to contact us. We&#39;re happy to help!</>
    ),
  },
  {
    id: "new-client",
    Icon: User,
    title: "New Client?",
    description: (
      <>Are you visiting for the first time? Give us a call to book your appointment. After your first visit, we&#39;ll create an account for you so you can use our online system in the future.</>
    ),
  },
  {
    id: "online",
    Icon: Monitor,
    title: "Book Online Anytime",
    description: (
      <>You can make an appointment 24/7 online with a top stylist of your choice. After booking, you&#39;ll receive an SMS or email reminder 24 hours before your appointment.</>
    ),
  },
  {
    id: "cancel",
    Icon: Phone,
    title: "Need to Cancel or Reschedule?",
    description: (
      <>
        Online bookings cannot be changed online. To cancel or reschedule, please call us in time at: <br />
        <span className="font-medium">(0318) 57 61 70</span>
      </>
    ),
  },
  {
    id: "standard",
    Icon: Clock,
    title: "Standard 40-Minute Treatments",
    description: (
      <p className="whitespace-pre-line">
        To help us serve all clients efficiently, we kindly ask you to choose from our standard 40-minute treatments.

For example: haircuts and/or coloring. Available times:
09:00 / 09:40 / 10:20 / 11:00 / 11:40 / 13:20 / 14:00 / 14:40 / 15:20 / 16:00 / 16:40 / 18:20 / 19:00 / 19:40 / 20:20
      </p>
    ),
    pClass: "text-sm text-black",
  },
  {
    id: "returning",
    Icon: Gift,
    title: "Returning Clients",
    description: (
      <>Do you visit us regularly? Join our special program and enjoy exclusive deals, more value, and extra service.</>
    ),
  },
]

const WelcomeSection = () => {
  return (
    <section className="pt-14 sm:pt-24 md:pt-32 lg:pt-48 xl:pt-[15.625rem] pb-[9.375rem]">
      <div className="max-w-[856px] mx-auto text-center px-6">
        <h2 className="text-4xl md:text-5xl font-light text-black mb-4 leading-12">
          EVERYONE IS
          <span className="block">WELCOME</span>
        </h2>

        <p className="text-xl font-light text-black mb-12 max-w-[680px] mx-auto leading-tight">
          Everyone is welcome at Bei Capelli Kapper Bennekom. Make an appointment in advance to avoid
          disappointment, that way, you&#39;ll always have your spot when it suits you best.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-12">
          {items.map(({ id, Icon, title, description, pClass }) => (
            <div key={id} className="flex flex-col items-center text-center ">
              <Icon className="h-9 w-9 text-black mb-4" />
              <h3 className="font-medium text-4xl mb-2 text-black">{title}</h3>
              {typeof description === "string" ? (
                <p className={pClass ?? "text-xl font-light text-black"}>{description}</p>
              ) : (
                // description may already include its own element (for pre-line or spans)
                <div className={pClass ?? "text-xl font-light text-black"}>{description}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WelcomeSection