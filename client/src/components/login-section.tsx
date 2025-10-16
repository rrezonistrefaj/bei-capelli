"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { LoginSectionData } from "@/types/strapi"

interface LoginSectionProps {
  data: LoginSectionData
}

const LoginSection = ({ data }: LoginSectionProps) => {
  const reduceMotion = useReducedMotion()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <section className="pb-[4.625rem] md:pb-[8.625rem] lg:pb-[12.625rem] xl:pb-[15.625rem]">
      <div className="max-w-[564px] mx-auto text-center px-4 sm:px-0">
        <motion.h2
          className="text-4xl md:text-5xl  text-black mb-4 leading-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeOut" }}
        >
          {data.title.split(' ').map((word, index, array) => {
            if (index === array.length - 1) {
              return <span key={index} className="block">{word}</span>
            }
            return word + ' '
          })}
        </motion.h2>

        <motion.p
          className="text-xl font-light text-black mb-12  mx-auto leading-tight"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut", delay: reduceMotion ? 0 : 0.05 }}
        >
          {data.subtitle}
        </motion.p>

        <motion.p
          className="text-lg font-light text-[#A2A2A2] text-left leading-tight mb-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut", delay: reduceMotion ? 0 : 0.1 }}
        >
          {data.description}
        </motion.p>

        <motion.div
          className="mx-auto"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut", delay: reduceMotion ? 0 : 0.15 }}
        >
          <div className="space-y-5">
            <div>
              <Input
                type="email"
                placeholder={data.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[52px] bg-[#E6E4E1] border border-black  text-black placeholder:text-xl placeholder:font-light placeholder-gray-500 text-xl font-light rounded-none px-[1.3125rem]"
                style={{
                  lineHeight: '52px',
                  fontSize: '20px',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            
            <div>
              <Input
                type="password"
                placeholder={data.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[52px] border border-black bg-[#E6E4E1] text-black placeholder:text-xl placeholder:font-light placeholder-gray-500 text-xl font-light rounded-none px-[1.3125rem]"
                style={{
                  lineHeight: '52px',
                  fontSize: '20px',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            
            <Link href={data.redirectUrl}>
              <Button
                className="w-full border border-black bg-transparent text-black cursor-pointer transition-colors text-xl font-light rounded-none h-[52px] "
              >
                {data.buttonText}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default LoginSection
