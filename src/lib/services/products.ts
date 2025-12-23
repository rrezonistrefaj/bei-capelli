import { ProductSectionData } from '@/types/strapi'
import { fetchStrapiData, normalizeStrapiUrlWithFallback } from './strapi'

export async function getProductSectionData(): Promise<ProductSectionData> {
  const data = await fetchStrapiData<ProductSectionData>('/product?populate=*', {}, 'product')

  if (data.ButtonIcon?.url) {
    data.ButtonIcon.url = normalizeStrapiUrlWithFallback(data.ButtonIcon.url)
  }
  if (data.ProductLogo?.url) {
    data.ProductLogo.url = normalizeStrapiUrlWithFallback(data.ProductLogo.url)
  }
  if (data.ProductImage?.url) {
    data.ProductImage.url = normalizeStrapiUrlWithFallback(data.ProductImage.url)
  }

  return data
}

