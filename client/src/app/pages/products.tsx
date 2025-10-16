import ProductsSection from "@/components/products-section"
import { getProductSectionData } from "@/lib/api"

export default async function ProductsPage() {
    const productData = await getProductSectionData()
    
    return <ProductsSection data={productData} />
}