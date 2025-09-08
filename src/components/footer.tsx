import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const scheduleData = [
  { day: 'Monday', hours: 'Gesloten' },
  { day: 'Tuesday', hours: '09:00-21:00' },
  { day: 'Wednesday', hours: '09:00-21:00' },
  { day: 'Thursday', hours: '09:00-21:00' },
  { day: 'Friday', hours: '09:00-21:00' },
  { day: 'Saturday', hours: '09:00-21:00' },
  { day: 'Sunday', hours: 'Gesloten' },
]

const formFields = [
  { type: 'text', placeholder: 'Name', name: 'name' },
  { type: 'email', placeholder: 'Email', name: 'email' },
]

export default function Footer() {
  return (
    <>
    <footer className="pt-16 sm:pt-28 md:pt-56 lg:pt-60 xl:pt-[21.875rem] pb-14 sm:pb-24 md:pb-32 lg:pb-48  xl:pb-[15.625rem] px-4 xl:px-0">
      <div className="max-w-[78.5rem] mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-normal text-black">Availability</h3>
              <h3 className="text-xl font-normal text-black">Time</h3>
            </div>
            <div className="space-y-4">
              {scheduleData.map((item, index) => (
                <div 
                  key={item.day}
                  className={`flex justify-between items-center ${
                    index !== scheduleData.length - 1 ? 'border-b border-black/20 pb-4' : ''
                  }`}
                >
                  <span className="text-black font-light text-xl">{item.day}</span>
                  <span className="text-black font-light text-xl">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className='pt-3'>
            <h3 className="text-4xl font-light text-black  text-center">Have Questions ?</h3>
            <p className="text-black text-xl font-light mb-5 text-center">Don&#39;t hesitate to contact us. We&#39;re happy to help!</p>

            <form className="space-y-5">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {formFields.map((field) => (
                  <Input
                    key={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="bg-[#E6E4E1] border border-black rounded-none placeholder:text-black/60 text-black focus:border-black focus:ring-0 focus-visible:border-black focus-visible:ring-0 w-full px-4 py-[1.5625rem] !text-xl placeholder:!text-xl md:!text-xl"
                  />
                ))}
              </div>

              {/* Message Field */}
              <Textarea
                placeholder="Bericht"
                rows={4}
                className="bg-[#E6E4E1] border border-black rounded-none placeholder:text-black/60 text-black focus:border-black focus:ring-0 focus-visible:border-black focus-visible:ring-0 resize-none w-full px-4 pt-3 min-h-24 !text-xl placeholder:!text-xl md:!text-xl"
              />

              {/* Send Button */}
              <Button
                type="submit"
                className="w-full bg-transparent border border-black text-black text-xl font-light hover:bg-black hover:text-white transition-colors rounded-none py-[1.5625rem] "
              >
                Versturen
              </Button>
            </form>

            {/* Privacy Notice */}
            <p className="text-black/60 text-xl mt-4 text-left leading-tight">
              Wanneer je dit formulier gebruikt, ga je akkoord met de opslag en verwerking van jouw gegevens door
              deze website.
            </p>
          </div>
        </div>
      </div>
    </footer>
    <div >
      <hr className='w-full border-t border-[#0D0D0D] mb-20 sm:mb-24 md:mb-28 lg:mb-36 xl:mb-[18.75rem]'/>
    </div>
    </>
  )
}