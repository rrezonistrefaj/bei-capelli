import React from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function ProductsSection() {
  return (
    <section className=" px-4 xl:px-0">
      <div className="max-w-[1256px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left text column */}
          <div className="lg:col-span-6">
            <h2 className="text-4xl md:text-5xl  text-black ">
              WIJ WERKEN
              <br />
              MET OOLABOO
            </h2>

            <div className="mt-6 text-x; text-neutral-800 space-y-7 leading-tight max-w-[618px]">
              <p>
                Oolaboo haarverzorgingsproducten hebben niet alleen een luxeuze beleving maar werken veel
                resultaat gerichter dan andere merken. De rijke romige en natuurlijke samenstelling van de
                producten voeden op ongelooflijke wijze ons haar en onze hoofdhuid.
              </p>

              <p>
                Deze producten zijn Sodium Laureth Sulfaat vrij en 100% parabenvrij. Alle producten zijn
                dierproefvrij en dat wordt aangetoond door het Leaping Bunny logo op alle Oolaboo producten.
              </p>

              <p>
                Oolaboo haarverzorging bevat adequate nutriënten (superfoodies) bedoeld om alle tekenen van
                veroudering van het haar en hoofdhuid te behandelen.
              </p>

              <Button variant="ghost" size="sm" className="border border-gray-700 text-gray-800 text-xl font-light hover:bg-transparent rounded-none px-12 py-5.5">
                <ShoppingCart className="w-5 h-5 " />
                Webshop
              </Button>
            </div>
          </div>

          {/* Right image column - product visuals stacked and centered */}
          <div className="lg:col-span-6 relative">
            <div className="flex flex-col items-center">
              <Image
                src="/images/product-logo.png"
                alt="Oolaboo logo"
                width={220}
                height={80}
                className="w-[220px] mb-6 h-auto object-contain"
                priority
              />

              <div className="relative">
                <Image
                  src="/images/product-1.png"
                  alt="Oolaboo products"
                  width={600}
                  height={600}
                  className="w-[420px] md:w-[520px] lg:w-[600px] h-auto object-contain"
                />
                {/* subtle shadow under products to mimic design */}
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-6 h-12 bg-gradient-to-t from-black/10 to-transparent blur-xl opacity-80 rounded-full mx-auto w-[70%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}