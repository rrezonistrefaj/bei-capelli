import React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { createCardVariants, VIEWPORT_SETTINGS } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Image from 'next/image'


interface CardProps {
  children: React.ReactNode
  className?: string
  animate?: boolean
  animationOptions?: {
    yOffset?: number
    duration?: number
  }
  onClick?: () => void
  hover?: boolean
}

export function Card({
  children,
  className = '',
  animate = true,
  animationOptions,
  onClick,
  hover = false
}: CardProps) {
  const reduceMotion = useReducedMotion()
  const cardVariants = animate ? createCardVariants(reduceMotion, animationOptions) : undefined

  return (
    <motion.div
      className={cn(
        'border border-gray-700 bg-transparent',
        hover && 'hover:shadow-lg transition-shadow duration-200',
        onClick && 'cursor-pointer',
        className
      )}
      variants={cardVariants}
      initial={animate ? "hidden" : undefined}
      whileInView={animate ? "visible" : undefined}
      viewport={animate ? VIEWPORT_SETTINGS : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

interface ImageCardProps {
  image: {
    src: string
    alt: string
    width?: number
    height?: number
  }
  title: string
  description?: string
  button?: {
    text: string
    onClick: () => void
    disabled?: boolean
  }
  className?: string
  imageClassName?: string
  contentClassName?: string
  animate?: boolean
}

export function ImageCard({
  image,
  title,
  description,
  button,
  className = '',
  imageClassName = '',
  contentClassName = '',
  animate = true
}: ImageCardProps) {
  return (
    <Card className={className} animate={animate}>
      <div className={cn('w-full h-72 relative', imageClassName)}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 1265px) 50vw, 632px"
          className="object-cover"
        />
      </div>

      <div className={cn('px-[1.5625rem] pt-13.5 pb-[2.6875rem]', contentClassName)}>
        <h3 className="text-3xl text-gray-800 font-light mb-2.5">
          {title}
        </h3>
        
        {description && (
          <p className="text-xl text-gray-800 mb-13.5 font-light max-w-[484px]">
            {description}
          </p>
        )}

        {button && (
          <button
            onClick={button.onClick}
            disabled={button.disabled}
            className={cn(
              'border text-gray-800 text-xl font-light hover:bg-transparent rounded-none px-10.5 py-5.5 transition-colors',
              button.disabled
                ? 'border-gray-400 cursor-not-allowed opacity-60'
                : 'border-gray-700 cursor-pointer hover:border-gray-900'
            )}
          >
            {button.text}
          </button>
        )}
      </div>
    </Card>
  )
}

interface IconCardProps {
  icon?: {
    src: string
    alt: string
    width?: number
    height?: number
  }
  title: string
  description?: string
  content?: React.ReactNode
  className?: string
  iconClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  animate?: boolean
}

export function IconCard({
  icon,
  title,
  description,
  content,
  className = '',
  iconClassName = '',
  titleClassName = '',
  descriptionClassName = '',
  animate = true
}: IconCardProps) {
  return (
    <motion.div
      className={cn('flex flex-col items-center text-center', className)}
      initial={animate ? { opacity: 0, y: 14 } : undefined}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={animate ? VIEWPORT_SETTINGS : undefined}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {icon && (
        <div className={cn('mb-4', iconClassName)}>
          <Image
            src={icon.src}
            alt={icon.alt}
            width={icon.width || 60}
            height={icon.height || 60}
            className="h-15 w-15"
          />
        </div>
      )}
      
      <h3 className={cn('font-medium text-4xl mb-2 text-black', titleClassName)}>
        {title}
      </h3>
      
      {description && (
        <div 
          className={cn('text-xl font-light text-black', descriptionClassName)}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
      
      {content}
    </motion.div>
  )
}

interface ContactCardProps {
  icon?: {
    src: string
    alt: string
    width?: number
    height?: number
  }
  title: string
  content: string[]
  className?: string
  iconClassName?: string
  titleClassName?: string
  contentClassName?: string
  animate?: boolean
}

export function ContactCard({
  icon,
  title,
  content,
  className = '',
  iconClassName = '',
  titleClassName = '',
  contentClassName = '',
  animate = true
}: ContactCardProps) {
  return (
    <motion.div
      className={cn(
        'border border-black p-5 text-center w-full md:flex-1 md:max-w-[220px] bg-[#E0D7C9]',
        className
      )}
      initial={animate ? { opacity: 0, y: 14 } : undefined}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={animate ? VIEWPORT_SETTINGS : undefined}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="flex justify-center mb-2">
        {icon && (
          <Image
            src={icon.src}
            alt={icon.alt}
            width={icon.width || 52}
            height={icon.height || 52}
            className={cn('w-13 h-13', iconClassName)}
          />
        )}
      </div>
      
      <h3 className={cn('text-xl font-normal text-black mb-3.5', titleClassName)}>
        {title}
      </h3>
      
      <div className="flex flex-col justify-center min-h-[60px]">
        <div className={cn('text-black text-base font-light text-center', contentClassName)}>
          {content.map((line: string, lineIndex: number) => (
            <p key={lineIndex} className="text-center">{line}</p>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
