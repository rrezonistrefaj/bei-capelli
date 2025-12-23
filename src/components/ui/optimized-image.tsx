import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'


interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  loading?: 'lazy' | 'eager'
  onLoad?: () => void
  onError?: () => void
}

export const IMAGE_SIZES = {

  HERO: '(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw',

  CARD: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',

  THUMBNAIL: '(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw',

  AVATAR: '(max-width: 768px) 10vw, (max-width: 1200px) 5vw, 4vw',

  ICON: '(max-width: 768px) 8vw, (max-width: 1200px) 4vw, 3vw',
} as const

export const IMAGE_QUALITY = {
  HIGH: 90,
  MEDIUM: 75,
  LOW: 60,
  THUMBNAIL: 50,
} as const

export const OptimizedImage = React.memo(function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes = IMAGE_SIZES.CARD,
  className = '',
  priority = false,
  quality = IMAGE_QUALITY.MEDIUM,
  placeholder = 'empty',
  blurDataURL,
  loading = 'lazy',
  onLoad,
  onError
}: OptimizedImageProps) {

  const defaultBlurDataURL = React.useMemo(() => {
    if (placeholder === 'blur' && !blurDataURL) {

      return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
    }
    return blurDataURL
  }, [placeholder, blurDataURL])


  const handleLoad = React.useCallback(() => {
    onLoad?.()
  }, [onLoad])

  const handleError = React.useCallback(() => {
    onError?.()
  }, [onError])


  const shouldPrioritize = priority || loading === 'eager'

  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      sizes={sizes}
      className={cn('object-cover', className)}
      priority={shouldPrioritize}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={defaultBlurDataURL}
      loading={loading}
      onLoad={handleLoad}
      onError={handleError}
    />
  )
})

export const HeroImage = React.memo(function HeroImage({
  src,
  alt,
  className = '',
  ...props
}: Omit<OptimizedImageProps, 'sizes' | 'priority' | 'quality'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      sizes={IMAGE_SIZES.HERO}
      priority
      quality={IMAGE_QUALITY.HIGH}
      className={cn('object-cover', className)}
      {...props}
    />
  )
})

export const CardImage = React.memo(function CardImage({
  src,
  alt,
  className = '',
  ...props
}: Omit<OptimizedImageProps, 'sizes' | 'quality'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      sizes={IMAGE_SIZES.CARD}
      quality={IMAGE_QUALITY.MEDIUM}
      className={cn('object-cover', className)}
      {...props}
    />
  )
})

export const ThumbnailImage = React.memo(function ThumbnailImage({
  src,
  alt,
  width = 60,
  height = 60,
  className = '',
  ...props
}: Omit<OptimizedImageProps, 'sizes' | 'quality' | 'fill'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={IMAGE_SIZES.THUMBNAIL}
      quality={IMAGE_QUALITY.THUMBNAIL}
      className={cn('object-cover', className)}
      {...props}
    />
  )
})

export const AvatarImage = React.memo(function AvatarImage({
  src,
  alt,
  width = 52,
  height = 52,
  className = '',
  ...props
}: Omit<OptimizedImageProps, 'sizes' | 'quality' | 'fill'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={IMAGE_SIZES.AVATAR}
      quality={IMAGE_QUALITY.MEDIUM}
      className={cn('object-cover rounded-full', className)}
      {...props}
    />
  )
})

export const IconImage = React.memo(function IconImage({
  src,
  alt,
  width = 24,
  height = 24,
  className = '',
  ...props
}: Omit<OptimizedImageProps, 'sizes' | 'quality' | 'fill'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={IMAGE_SIZES.ICON}
      quality={IMAGE_QUALITY.MEDIUM}
      className={cn('object-contain', className)}
      {...props}
    />
  )
})

