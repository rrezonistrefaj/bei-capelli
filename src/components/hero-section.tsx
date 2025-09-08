import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HeroSection() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image (Next/Image) */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/Hero-image.png"
          alt="Salon background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Gradient Overlay for Header */}


      {/* Content Overlay: use flex column so inner content can use mt-auto to sit at bottom */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Hero Section */}
        <main className="flex flex-col flex-1 max-w-[1265px] mx-auto w-full px-4 xl:px-0 pb-[6.25rem] sm:pb-20 lg:pb-[6.25rem]">
          <div className="max-w-3xl mt-auto">
            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-black leading-none">
              KAPPER<br/>
              BENNEKOM
            </h1>
            <hr className="w-full border-t-1 border-black/90 mb-6 sm:mb-8" />
            {/* Description Text */}
            <p className="text-black text-lg sm:text-xl lg:text-2xl font-light mb-6 sm:mb-8  ">
              Sinds 2014 is Bei Capelli Kapper Bennekom dé plek voor de laatste haar trends. Door de jaren hebben wij al
              een heleboel fijne en trouwe klanten mogen verwelkomen. Iedereen wordt met speciale aandacht behandeld
              door ervaren stylisten om uitmuntende kwaliteit en service te garanderen.
            </p>

            {/* CTA Button */}
              <Button className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 px-2.5 py-6 text-xl rounded-none font-medium transition-colors duration-200">
                Make an Appointment
              </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
