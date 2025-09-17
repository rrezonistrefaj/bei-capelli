import axios from 'axios'

// Strapi API configuration
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

// Create axios instance with default config
export const strapiClient = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    ...(STRAPI_API_TOKEN && {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`
    })
  },
  timeout: 10000, // 10 seconds timeout
})

// Request interceptor for logging (development only)
if (process.env.NODE_ENV === 'development') {
  strapiClient.interceptors.request.use(
    (config) => {
      console.log(`[Strapi API] ${config.method?.toUpperCase()} ${config.url}`)
      return config
    },
    (error) => {
      console.error('[Strapi API] Request error:', error)
      return Promise.reject(error)
    }
  )

  // Response interceptor for error handling
  strapiClient.interceptors.response.use(
    (response) => {
      console.log(`[Strapi API] Response: ${response.status} ${response.config.url}`)
      return response
    },
    (error) => {
      console.error('[Strapi API] Response error:', error.response?.data || error.message)
      return Promise.reject(error)
    }
  )
}

export default strapiClient
