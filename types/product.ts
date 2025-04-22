export interface ProductResponse {
  products: Product[]
  totalCount: number
}

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  brand: string
  category: string
  isNew?: boolean
  isFeatured?: boolean
  rating?: number
  campaignMessage?: string
  campaignRibbon?: string
  inStock?: boolean
  summary?: string
  baseColor?: string
}

export interface ApiProduct {
  id: string
  name: string
  price: {
    value: number
    currency: string
  }
  memberPrice?: {
    value: number
    currency: string
  }
  cheapestPrice?: {
    value: number
    currency: string
  }
  campaignSellingPrice?: {
    value: number
    currency: string
  }
  images: {
    url: string
    alt: string
  }[]
  brand?: string
  primaryCategoryCode?: string
  categoryIds?: string[]
  campaignMessage?: string
  campaignRibbon?: string
  isInStockOnline?: boolean
  summary?: string
  baseColor?: string
  isNew?: boolean
}
