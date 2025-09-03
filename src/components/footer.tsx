import React from 'react'
import { Button } from '@/components/ui/button'

export default function Footer() {
  return (
    <footer className="py-48" style={{ backgroundColor: "#DFD6C9" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Availability Schedule */}
          <div>
            <h3 className="text-2xl font-bold text-black mb-8">Availability</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-black/20 pb-2">
                <span className="text-black font-medium">Monday</span>
                <span className="text-black">Gesloten</span>
              </div>
              <div className="flex justify-between items-center border-b border-black/20 pb-2">
                <span className="text-black font-medium">Tuesday</span>
                <span className="text-black">09:00-21:00</span>
              </div>
              <div className="flex justify-between items-center border-b border-black/20 pb-2">
                <span className="text-black font-medium">Wednesday</span>
                <span className="text-black">09:00-21:00</span>
              </div>
              <div className="flex justify-between items-center border-b border-black/20 pb-2">
                <span className="text-black font-medium">Thursday</span>
                <span className="text-black">09:00-21:00</span>
              </div>
              <div className="flex justify-between items-center border-b border-black/20 pb-2">
                <span className="text-black font-medium">Friday</span>
                <span className="text-black">09:00-21:00</span>
              </div>
              <div className="flex justify-between items-center border-b border-black/20 pb-2">
                <span className="text-black font-medium">Saturday</span>
                <span className="text-black">09:00-21:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-black font-medium">Sunday</span>
                <span className="text-black">Gesloten</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold text-black mb-2">Have Questions ?</h3>
            <p className="text-black mb-8">Don&#39;t hesitate to contact us. We&#39;re happy to help!</p>

            <form className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="bg-[#E6E4E1] border border-black rounded-none placeholder:text-black/60 text-black focus:border-black focus:ring-0 w-full px-4 py-3"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-[#E6E4E1] border border-black rounded-none placeholder:text-black/60 text-black focus:border-black focus:ring-0 w-full px-4 py-3"
                />
              </div>

              {/* Message Field */}
              <textarea
                placeholder="Bericht"
                rows={4}
                className="bg-[#E6E4E1] border border-black rounded-none placeholder:text-black/60 text-black focus:border-black focus:ring-0 resize-none w-full p-4"
              />

              {/* Send Button */}
              <Button
                type="submit"
                className="w-full bg-transparent border border-black text-black hover:bg-black hover:text-white transition-colors rounded-none py-3"
              >
                Versturen
              </Button>

              {/* Privacy Notice */}
              <p className="text-black/60 text-sm leading-relaxed">
                Wanneer je dit formulier gebruikt, ga je akkoord met de opslag en verwerking van jouw gegevens door
                deze website.
              </p>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}