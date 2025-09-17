"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { FooterData } from '@/types/strapi'

const formFields = [
  { type: 'text', placeholder: 'Name', name: 'name' },
  { type: 'email', placeholder: 'Email', name: 'email' },
]

interface FooterProps { data: FooterData }

export default function Footer({ data }: FooterProps) {
  const reduceMotion = useReducedMotion()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      message: String(formData.get('message') || ''),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        form.reset()
      } else {
        console.error('Submit failed')
      }
    } catch (err) {
      console.error('Submit error', err)
    }
  }
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
              {data.scheduleBlock.schedule.map((item, index) => (
                <motion.div 
                  key={item.day + index}
                  className={`flex justify-between items-center ${
                    index !== data.scheduleBlock.schedule.length - 1 ? 'border-b border-black/20 pb-4' : ''
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
              {data.formBlock.title}
            </motion.h3>
            <motion.p
              className="text-black text-xl font-light mb-5 text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: 'easeOut', delay: reduceMotion ? 0 : 0.05 }}
            >
              {data.formBlock.description}
            </motion.p>

            <form className="space-y-5" onSubmit={handleSubmit}>
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
                      name={field.name}
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
                  name="message"
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
                  {data.formBlock.submitText}
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
              {data.formBlock.privacyNotice}
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