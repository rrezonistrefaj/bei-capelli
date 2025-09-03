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
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-5" />

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen">

        {/* Hero Section */}
        <main className=" pt-52 max-w-[1265px] mx-auto">
          <div className="max-w-2xl">
            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-black leading-none mb-8">
              <span className="block">KAPPER</span>
              <span className="block">BENNEKOM</span>
            </h1>
            <hr />
            {/* Description Text */}
            <p className="text-black text-lg leading-relaxed mb-8 max-w-lg">
              Sinds 2014 is Bei Capelli Kapper Bennekom dé plek voor de laatste haar trends. Door de jaren hebben wij al
              een heleboel fijne en trouwe klanten mogen verwelkomen. Iedereen wordt met speciale aandacht behandeld
              door ervaren stylisten om uitmuntende kwaliteit en service te garanderen.
            </p>

            {/* CTA Button */}
            <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-base font-medium rounded-none">
              Make an Appointment
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
