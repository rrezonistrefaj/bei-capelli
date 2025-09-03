import React from "react"
import { ShoppingCart } from "lucide-react"

export default function ProductsSection() {
  return (
    <section className="py-20" style={{ backgroundColor: "#E9E0D3" }}>
      <div className="max-w-[1256px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left text column */}
          <div className="lg:col-span-6">
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
              WIJ WERKEN
              <br />
              MET OOLABOO
            </h2>

            <div className="mt-6 text-base text-neutral-800 space-y-6 max-w-[640px]">
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

              <button className="mt-4 inline-flex items-center gap-3 border border-neutral-700 px-6 py-3 rounded-sm text-sm">
                <ShoppingCart className="w-5 h-5" />
                Webshop
              </button>
            </div>
          </div>

          {/* Right image column - product visuals stacked and centered */}
          <div className="lg:col-span-6 relative">
            <div className="flex flex-col items-center">
              <img src="/images/product-logo.png" alt="Oolaboo logo" className="w-[220px] mb-6 object-contain" />

              <div className="relative">
                <img
                  src="/images/product-1.png"
                  alt="Oolaboo products"
                  className="w-[420px] md:w-[520px] lg:w-[600px] object-contain"
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