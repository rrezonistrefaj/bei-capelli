import ProductsSection from "@/components/products-section"
import { getProductSectionData } from "@/lib/api"
import { ProductSectionData } from "@/types/strapi"

const fallbackProductData: ProductSectionData = {
  id: 0,
  documentId: '',
  Title: '',
  Description: [],
  ButtonText: '',
  ButtonURL: '',
  ButtonIcon: {
    id: 0,
    documentId: '',
    name: '',
    alternativeText: null,
    caption: null,
    width: 0,
    height: 0,
    url: '',
    formats: {},
    hash: '',
    ext: '',
    mime: '',
    size: 0,
    previewUrl: null,
    provider: '',
    provider_metadata: {},
    createdAt: '',
    updatedAt: '',
    publishedAt: ''
  },
  ProductLogo: {
    id: 0,
    documentId: '',
    name: '',
    alternativeText: null,
    caption: null,
    width: 0,
    height: 0,
    url: '',
    formats: {},
    hash: '',
    ext: '',
    mime: '',
    size: 0,
    previewUrl: null,
    provider: '',
    provider_metadata: {},
    createdAt: '',
    updatedAt: '',
    publishedAt: ''
  },
  ProductImage: {
    id: 0,
    documentId: '',
    name: '',
    alternativeText: null,
    caption: null,
    width: 0,
    height: 0,
    url: '',
    formats: {
      thumbnail: {
        url: '',
        width: 0,
        height: 0
      },
      small: {
        url: '',
        width: 0,
        height: 0
      }
    },
    hash: '',
    ext: '',
    mime: '',
    size: 0,
    previewUrl: null,
    provider: '',
    provider_metadata: {},
    createdAt: '',
    updatedAt: '',
    publishedAt: ''
  },
  createdAt: '',
  updatedAt: '',
  publishedAt: ''
}

export default async function ProductsPage() {
  try {
    const productData = await getProductSectionData()
    return <ProductsSection data={productData} />
  } catch (error) {
    console.error('Error fetching product data:', error)
    return <ProductsSection data={fallbackProductData} />
  }
}