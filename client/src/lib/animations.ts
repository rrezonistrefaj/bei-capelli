
export const ANIMATION_DEFAULTS = {
  DURATION: 0.5,
  EASE: "easeOut" as const,
  VIEWPORT_AMOUNT: 0.6,
  STAGGER_CHILDREN: 0.08,
  ITEM_Y_OFFSET: 16,
} as const
export const createContainerVariants = (reduceMotion: boolean, options?: {
  yOffset?: number
  duration?: number
  staggerChildren?: number
  when?: "beforeChildren" | "afterChildren"
}) => {
  const {
    yOffset = ANIMATION_DEFAULTS.ITEM_Y_OFFSET,
    duration = ANIMATION_DEFAULTS.DURATION,
    staggerChildren = ANIMATION_DEFAULTS.STAGGER_CHILDREN,
    when = "beforeChildren"
  } = options || {}

  return {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : duration,
        ease: ANIMATION_DEFAULTS.EASE,
        when,
        staggerChildren: reduceMotion ? 0 : staggerChildren,
      },
    },
  } as const
}
export const createItemVariants = (reduceMotion: boolean, options?: {
  yOffset?: number
  duration?: number
}) => {
  const {
    yOffset = 12,
    duration = ANIMATION_DEFAULTS.DURATION
  } = options || {}

  return {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: reduceMotion ? 0 : duration, 
        ease: ANIMATION_DEFAULTS.EASE 
      },
    },
  } as const
}
export const createCardVariants = (reduceMotion: boolean, options?: {
  yOffset?: number
  duration?: number
}) => {
  const {
    yOffset = ANIMATION_DEFAULTS.ITEM_Y_OFFSET,
    duration = ANIMATION_DEFAULTS.DURATION
  } = options || {}

  return {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: reduceMotion ? 0 : duration, 
        ease: ANIMATION_DEFAULTS.EASE 
      },
    },
  } as const
}
export const createHeaderVariants = (reduceMotion: boolean, options?: {
  yOffset?: number
  duration?: number
  staggerChildren?: number
}) => {
  const {
    yOffset = 16,
    duration = 0.6,
    staggerChildren = 0.06
  } = options || {}

  return {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : duration,
        ease: ANIMATION_DEFAULTS.EASE,
        when: "beforeChildren" as const,
        staggerChildren: reduceMotion ? 0 : staggerChildren,
      },
    },
  } as const
}
export const createFadeInVariants = (reduceMotion: boolean, options?: {
  duration?: number
  delay?: number
}) => {
  const {
    duration = ANIMATION_DEFAULTS.DURATION,
    delay = 0
  } = options || {}

  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: reduceMotion ? 0 : duration, 
        ease: ANIMATION_DEFAULTS.EASE,
        delay: reduceMotion ? 0 : delay
      },
    },
  } as const
}
export const createSlideUpVariants = (reduceMotion: boolean, options?: {
  yOffset?: number
  duration?: number
  delay?: number
}) => {
  const {
    yOffset = 20,
    duration = ANIMATION_DEFAULTS.DURATION,
    delay = 0
  } = options || {}

  return {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: reduceMotion ? 0 : duration, 
        ease: ANIMATION_DEFAULTS.EASE,
        delay: reduceMotion ? 0 : delay
      },
    },
  } as const
}
export const VIEWPORT_SETTINGS = {
  once: true,
  amount: ANIMATION_DEFAULTS.VIEWPORT_AMOUNT,
} as const
export const TRANSITION_PRESETS = {
  fast: { duration: 0.3, ease: ANIMATION_DEFAULTS.EASE },
  normal: { duration: ANIMATION_DEFAULTS.DURATION, ease: ANIMATION_DEFAULTS.EASE },
  slow: { duration: 0.8, ease: ANIMATION_DEFAULTS.EASE },
  spring: { type: "spring", stiffness: 100, damping: 20 },
} as const
export const createStaggerVariants = (itemCount: number, options?: {
  baseDelay?: number
  staggerDelay?: number
  maxDelay?: number
}) => {
  const {
    baseDelay = 0,
    staggerDelay = 0.05,
    maxDelay = 0.25
  } = options || {}

  return Array.from({ length: itemCount }, (_, index) => ({
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION_DEFAULTS.DURATION,
        ease: ANIMATION_DEFAULTS.EASE,
        delay: Math.min(baseDelay + (index * staggerDelay), maxDelay),
      },
    },
  }))
}
