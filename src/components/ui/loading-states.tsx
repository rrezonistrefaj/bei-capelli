import React from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'


interface BaseStateProps {
  className?: string
  children?: React.ReactNode
}

export function LoadingState({ className = "", children }: BaseStateProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={`flex items-center justify-center py-20 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.3 }}
    >
      <div className="text-center">
        {children || (
          <>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-4"></div>
            <div className="text-lg text-gray-600">Loading...</div>
          </>
        )}
      </div>
    </motion.div>
  )
}

export function ErrorState({ 
  className = "", 
  children, 
  error = "Something went wrong" 
}: BaseStateProps & { error?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={`flex items-center justify-center py-20 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.3 }}
    >
      <div className="text-center">
        {children || (
          <>
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <div className="text-lg text-red-600">{error}</div>
          </>
        )}
      </div>
    </motion.div>
  )
}

export function EmptyState({ 
  className = "", 
  children, 
  message = "No data available" 
}: BaseStateProps & { message?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={`flex items-center justify-center py-20 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.3 }}
    >
      <div className="text-center">
        {children || (
          <>
            <div className="text-gray-400 text-4xl mb-4">📭</div>
            <div className="text-lg text-gray-600">{message}</div>
          </>
        )}
      </div>
    </motion.div>
  )
}

export function SectionLoadingState({ 
  className = "", 
  children,
  title = "Loading..." 
}: BaseStateProps & { title?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <section className={`px-4 xl:px-0 ${className}`}>
      <div className="max-w-[1265px] mx-auto">
        <motion.div
          className="flex items-center justify-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.3 }}
        >
          <div className="text-center">
            {children || (
              <>
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
                </div>
                <div className="text-lg text-gray-600 mt-4">{title}</div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function SectionErrorState({ 
  className = "", 
  children,
  error = "Failed to load content" 
}: BaseStateProps & { error?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <section className={`px-4 xl:px-0 ${className}`}>
      <div className="max-w-[1265px] mx-auto">
        <motion.div
          className="flex items-center justify-center py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.3 }}
        >
          <div className="text-center">
            {children || (
              <>
                <div className="text-red-500 text-4xl mb-4">⚠️</div>
                <div className="text-lg text-red-600">{error}</div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function SectionEmptyState({ 
  className = "", 
  children,
  message = "No content available" 
}: BaseStateProps & { message?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <section className={`px-4 xl:px-0 ${className}`}>
      <div className="max-w-[1265px] mx-auto">
        <motion.div
          className="flex items-center justify-center py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.3 }}
        >
          <div className="text-center">
            {children || (
              <>
                <div className="text-gray-400 text-4xl mb-4">📭</div>
                <div className="text-lg text-gray-600">{message}</div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function LoadingSpinner({ 
  size = "md", 
  className = "" 
}: { 
  size?: "sm" | "md" | "lg" 
  className?: string 
}) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  }

  return (
    <div className={`animate-spin rounded-full border-b-2 border-gray-600 ${sizeClasses[size]} ${className}`}></div>
  )
}

export function SkeletonLoader({ 
  className = "",
  lines = 1 
}: { 
  className?: string
  lines?: number 
}) {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <div 
          key={i}
          className="h-4 bg-gray-200 rounded mb-2"
          style={{ width: i === lines - 1 ? '75%' : '100%' }}
        />
      ))}
    </div>
  )
}

