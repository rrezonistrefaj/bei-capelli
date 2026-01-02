const getStrapiBaseUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_STRAPI_URL
  if (!url && process.env.NODE_ENV === 'production') {
    throw new Error('NEXT_PUBLIC_STRAPI_URL environment variable is required in production')
  }
  return url || 'http://localhost:1337'
}

export const STRAPI_CONFIG = {
  BASE_URL: getStrapiBaseUrl(),
  TIMEOUT: 10000,
  DEFAULT_IMAGE: '/placeholder.svg'
} as const
export const ANIMATION_CONFIG = {
  DEFAULT_DURATION: 0.5,
  DEFAULT_EASE: "easeOut",
  VIEWPORT_THRESHOLD: 0.6,
  STAGGER_DELAY: 0.05
} as const
export const ERROR_MESSAGES = {
  EMPTY_RESPONSE: (contentType: string) =>
    `Empty response from Strapi - check if ${contentType} content exists and is published`,
  FETCH_ERROR: (section: string) =>
    `Error fetching ${section} data`,
  NO_DATA: (section: string) =>
    `No ${section} data`
} as const
export const MOTION_VARIANTS = {
  fadeInUp: {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: ANIMATION_CONFIG.DEFAULT_DURATION, ease: ANIMATION_CONFIG.DEFAULT_EASE }
    }
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: ANIMATION_CONFIG.DEFAULT_DURATION, ease: ANIMATION_CONFIG.DEFAULT_EASE }
    }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: ANIMATION_CONFIG.DEFAULT_DURATION,
        when: "beforeChildren",
        staggerChildren: ANIMATION_CONFIG.STAGGER_DELAY
      }
    }
  },
  staggerItem: {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: ANIMATION_CONFIG.DEFAULT_DURATION * 0.8, ease: ANIMATION_CONFIG.DEFAULT_EASE }
    }
  }
} as const
export const UI_CONSTANTS = {
  MAX_WIDTH: {
    SM: 'max-w-2xl',
    MD: 'max-w-4xl',
    LG: 'max-w-6xl',
    XL: 'max-w-7xl',
    '2XL': 'max-w-[1265px]',
    FULL: 'max-w-full'
  },
  PADDING: {
    NONE: '',
    SM: 'py-8',
    MD: 'py-14 sm:py-24',
    LG: 'py-14 sm:py-24 md:py-32',
    XL: 'py-14 sm:py-24 md:py-32 lg:py-48 xl:py-[15.625rem]'
  },
  BACKGROUND: {
    WHITE: 'bg-white',
    GRAY: 'bg-gray-50',
    TRANSPARENT: 'bg-transparent'
  }
} as const
