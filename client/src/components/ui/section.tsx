import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { createContainerVariants, VIEWPORT_SETTINGS } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'


interface SectionProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  background?: 'white' | 'gray' | 'transparent'
  animate?: boolean
  animationOptions?: {
    yOffset?: number
    duration?: number
    staggerChildren?: number
  }
}

const maxWidthClasses = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl', 
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  '2xl': 'max-w-[1265px]',
  full: 'max-w-full'
}

const paddingClasses = {
  none: '',
  sm: 'py-8',
  md: 'py-14 sm:py-24',
  lg: 'py-14 sm:py-24 md:py-32',
  xl: 'py-14 sm:py-24 md:py-32 lg:py-48 xl:py-[15.625rem]'
}

const backgroundClasses = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  transparent: 'bg-transparent'
}

export function Section({
  children,
  className = '',
  containerClassName = '',
  maxWidth = '2xl',
  padding = 'lg',
  background = 'white',
  animate = true,
  animationOptions
}: SectionProps) {
  const reduceMotion = useReducedMotion()
  const containerVariants = animate ? createContainerVariants(reduceMotion, animationOptions) : undefined

  return (
    <section className={cn(
      paddingClasses[padding],
      backgroundClasses[background],
      className
    )}>
      <div className={cn(
        'mx-auto px-4 xl:px-0',
        maxWidthClasses[maxWidth],
        containerClassName
      )}>
        {animate ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_SETTINGS}
          >
            {children}
          </motion.div>
        ) : (
          children
        )}
      </div>
    </section>
  )
}

interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  className?: string
  titleClassName?: string
  subtitleClassName?: string
  descriptionClassName?: string
  center?: boolean
  animate?: boolean
}

export function SectionHeader({
  title,
  subtitle,
  description,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  descriptionClassName = '',
  center = false,
  animate = true
}: SectionHeaderProps) {
  const alignmentClass = center ? 'text-center' : ''
  
  return (
    <div className={cn('mb-8 md:mb-12', alignmentClass, className)}>
      {subtitle && (
        <motion.h3 
          className={cn('text-lg text-gray-600 mb-2', subtitleClassName)}
          initial={animate ? { opacity: 0, y: 10 } : undefined}
          whileInView={animate ? { opacity: 1, y: 0 } : undefined}
          viewport={animate ? VIEWPORT_SETTINGS : undefined}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {subtitle}
        </motion.h3>
      )}
      
      <motion.h2 
        className={cn('text-4xl md:text-5xl font-light text-black mb-4', titleClassName)}
        initial={animate ? { opacity: 0, y: 16 } : undefined}
        whileInView={animate ? { opacity: 1, y: 0 } : undefined}
        viewport={animate ? VIEWPORT_SETTINGS : undefined}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {title}
      </motion.h2>
      
      {description && (
        <motion.p 
          className={cn('text-xl font-light text-black max-w-3xl', descriptionClassName)}
          initial={animate ? { opacity: 0, y: 12 } : undefined}
          whileInView={animate ? { opacity: 1, y: 0 } : undefined}
          viewport={animate ? VIEWPORT_SETTINGS : undefined}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}

interface SectionContentProps {
  children: React.ReactNode
  className?: string
  animate?: boolean
  stagger?: boolean
}

export function SectionContent({
  children,
  className = '',
  animate = true,
  stagger = true
}: SectionContentProps) {
  const reduceMotion = useReducedMotion()
  const containerVariants = animate ? createContainerVariants(reduceMotion, {
    staggerChildren: stagger ? 0.08 : 0
  }) : undefined

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial={animate ? "hidden" : undefined}
      whileInView={animate ? "visible" : undefined}
      viewport={animate ? VIEWPORT_SETTINGS : undefined}
    >
      {children}
    </motion.div>
  )
}
