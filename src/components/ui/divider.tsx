import React from 'react'

type Props = {
  inset?: boolean 
  className?: string
}

export default function Divider({ inset = false, className = '' }: Props) {
  return (
    <div className={`w-full ${className}`} aria-hidden>
      <div className={inset ? 'max-w-[1200px] mx-auto px-6' : 'max-w-[1265px] mx-auto px-4 xl:px-0'}>
        <hr className="border-t border-[#0D0D0D] my-16 sm:my-18 lg:my-24 xl:my-[10.9375rem]" />
      </div>
    </div>
  )
}
