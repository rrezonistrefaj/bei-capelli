"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { motion, useReducedMotion } from 'framer-motion'

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
  const reduceMotion = useReducedMotion()
  return (
    <>
    <footer className="pt-16 sm:pt-28 md:pt-56 lg:pt-60 xl:pt-[21.875rem] pb-14 sm:pb-24 md:pb-32 lg:pb-48  xl:pb-[15.625rem] px-4 xl:px-0">
      <div className="max-w-[78.5rem] mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <motion.div
              className="flex justify-between items-center mb-8"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: 'easeOut' }}
            >
              <h3 className="text-xl font-normal text-black">Availability</h3>
              <h3 className="text-xl font-normal text-black">Time</h3>
            </motion.div>
            <div className="space-y-4">
              {scheduleData.map((item, index) => (
                <motion.div 
                  key={item.day}
                  className={`flex justify-between items-center ${
                    index !== scheduleData.length - 1 ? 'border-b border-black/20 pb-4' : ''
                  }`}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.65 }}
                  transition={{ duration: reduceMotion ? 0 : 0.4, ease: 'easeOut', delay: reduceMotion ? 0 : index * 0.05 }}
                >
                  <span className="text-black font-light text-xl">{item.day}</span>
                  <span className="text-black font-light text-xl">{item.hours}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className='pt-3'>
            <motion.h3
              className="text-4xl font-light text-black  text-center"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: 'easeOut' }}
            >
              Have Questions ?
            </motion.h3>
            <motion.p
              className="text-black text-xl font-light mb-5 text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: 'easeOut', delay: reduceMotion ? 0 : 0.05 }}
            >
              Don&#39;t hesitate to contact us. We&#39;re happy to help!
            </motion.p>

            <form className="space-y-5">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {formFields.map((field, idx) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: reduceMotion ? 0 : 0.4, ease: 'easeOut', delay: reduceMotion ? 0 : idx * 0.06 }}
                  >
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="bg-[#E6E4E1] border border-black rounded-none placeholder:text-black/60 text-black focus:border-black focus:ring-0 focus-visible:border-black focus-visible:ring-0 w-full px-4 py-[1.5625rem] !text-xl placeholder:!text-xl md:!text-xl"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Message Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: 'easeOut', delay: reduceMotion ? 0 : 0.12 }}
              >
                <Textarea
                  placeholder="Bericht"
                  rows={4}
                  className="bg-[#E6E4E1] border border-black rounded-none placeholder:text-black/60 text-black focus:border-black focus:ring-0 focus-visible:border-black focus-visible:ring-0 resize-none w-full px-4 pt-3 min-h-24 !text-xl placeholder:!text-xl md:!text-xl"
                />
              </motion.div>

              {/* Send Button */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: 'easeOut', delay: reduceMotion ? 0 : 0.18 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-transparent border border-black text-black text-xl font-light hover:bg-black hover:text-white transition-colors rounded-none py-[1.5625rem] "
                >
                  Versturen
                </Button>
              </motion.div>
            </form>

            {/* Privacy Notice */}
            <motion.p
              className="text-black/60 text-xl mt-4 text-left leading-tight"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: 'easeOut', delay: reduceMotion ? 0 : 0.22 }}
            >
              Wanneer je dit formulier gebruikt, ga je akkoord met de opslag en verwerking van jouw gegevens door
              deze website.
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
    <div>
      <motion.hr
        className='w-full border-t border-[#0D0D0D] mb-20 sm:mb-24 md:mb-28 lg:mb-36 xl:mb-[18.75rem]'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, ease: 'easeOut' }}
      />
    </div>
    </>
  )
}