/**
 * Environment variable validation and access
 * Validates required environment variables on import
 */

const isProduction = process.env.NODE_ENV === 'production'

interface EnvConfig {
  STRAPI_URL: string
  STRAPI_API_TOKEN: string | undefined
  SITE_URL: string
  SMTP_HOST: string | undefined
  SMTP_USER: string | undefined
  SMTP_PASS: string | undefined
  SMTP_PORT: string | undefined
  MAIL_TO: string | undefined
  MAIL_FROM: string | undefined
}

function validateEnv(): EnvConfig {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL
  const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://beicapelli.com'
  
  // SMTP variables (only required if email service is used)
  const SMTP_HOST = process.env.SMTP_HOST
  const SMTP_USER = process.env.SMTP_USER
  const SMTP_PASS = process.env.SMTP_PASS
  const SMTP_PORT = process.env.SMTP_PORT
  const MAIL_TO = process.env.MAIL_TO
  const MAIL_FROM = process.env.MAIL_FROM

  // Required in production
  if (isProduction) {
    if (!STRAPI_URL) {
      throw new Error('NEXT_PUBLIC_STRAPI_URL environment variable is required in production')
    }
    
    if (!STRAPI_URL.startsWith('https://')) {
      throw new Error('NEXT_PUBLIC_STRAPI_URL must use HTTPS in production')
    }
  }

  return {
    STRAPI_URL: STRAPI_URL || 'http://localhost:1337',
    STRAPI_API_TOKEN,
    SITE_URL,
    SMTP_HOST,
    SMTP_USER,
    SMTP_PASS,
    SMTP_PORT,
    MAIL_TO,
    MAIL_FROM,
  }
}

export const env = validateEnv()

