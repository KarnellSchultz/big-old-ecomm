"use server"

import type { ApiProduct, Product } from "@/types/product"

export async function fetchProducts(url: string): Promise<Product[]> {
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } }) // Cache for 1 hour

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`)
    }

    const data = await response.json()

    if (!data.products || !Array.isArray(data.products)) {
      return []
    }

    // Transform API products to our Product type
    return data.products.map((apiProduct: ApiProduct) => ({
      id: apiProduct.id,
      name: apiProduct.name,
      price: apiProduct.memberPrice?.value || apiProduct.price.value,
      originalPrice:
        apiProduct.price.value !== (apiProduct.memberPrice?.value || 0) ? apiProduct.price.value : undefined,
      image: apiProduct.images?.[0]?.url || "/placeholder.svg?height=300&width=300",
      brand: apiProduct.brand || "",
      category: apiProduct.primaryCategoryCode || "",
      isNew: apiProduct.isNew || false,
      campaignMessage: apiProduct.campaignMessage,
      campaignRibbon: apiProduct.campaignRibbon,
      inStock: apiProduct.isInStockOnline,
      summary: apiProduct.summary,
      baseColor: apiProduct.baseColor,
    }))
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}
