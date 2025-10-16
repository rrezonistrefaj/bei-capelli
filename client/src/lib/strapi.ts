import axios from 'axios'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

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

if (process.env.NODE_ENV === 'development') {
  strapiClient.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  )

  strapiClient.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  )
}

export default strapiClient
