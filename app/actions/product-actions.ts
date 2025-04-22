"use server"

import { addToCart } from "@/lib/cart";
import type { Product } from "@/types/product";

export async function fetchProducts(url: string): Promise<Product[]> {
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } }) // Cache for 1 hour
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`)
    }

    const data = await response.json()
    
    // Check if the data has the expected structure
    if (!data.primaryList?.productGroups || !Array.isArray(data.primaryList.productGroups)) {
      console.log('No product groups found in response');
      return []
    }
    
    // Extract all products from all product groups
    const allProducts: any[] = [];
    data.primaryList.productGroups.forEach((group: any) => {
      if (group.products && Array.isArray(group.products)) {
        allProducts.push(...group.products);
      }
    });
    
    console.log(`Found ${allProducts.length} products in the response`);
    
    if (allProducts.length === 0) {
      return []
    }
    
    // Transform API products to our Product type
    return allProducts.map((apiProduct: any) => ({
      id: apiProduct.key || '',
      name: apiProduct.title || '',
      price: apiProduct.sellingPrice?.min || 0,
      originalPrice: apiProduct.listPrice?.min || undefined,
      image: apiProduct.imageInfo?.images?.[0]?.sources?.[0]?.url || "/placeholder.svg?height=300&width=300",
      brand: apiProduct.brand || "",
      category: apiProduct.custom?.categoryIds?.[0]?.id || "",
      isNew: false, // Not available in the response
      campaignMessage: apiProduct.custom?.campaignMessage?.[0]?.label ? 
        JSON.parse(apiProduct.custom.campaignMessage[0].label).text : undefined,
      campaignRibbon: apiProduct.custom?.campaignRibbon?.[0]?.label ? 
        JSON.parse(apiProduct.custom.campaignRibbon[0].label).text : undefined,
      inStock: apiProduct.inStock || false,
      summary: apiProduct.title || "",
      baseColor: apiProduct.custom?.baseColor?.[0]?.id || undefined,
    }))
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function fetchProductById(productId: string): Promise<Product | null> {
  try {
    const apiUrl = `https://api.xxlsports.com/elevate-api-v1/sites/xxl-se/product/${productId}`
    const response = await fetch(apiUrl, { next: { revalidate: 3600 } }) // Cache for 1 hour
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`)
    }

    const data = await response.json()
    
    // Check if the data has the expected structure
    if (!data.productGroup?.products || !Array.isArray(data.productGroup.products) || data.productGroup.products.length === 0) {
      console.log('No product found in response');
      return null;
    }
    
    const apiProduct = data.productGroup.products[0];
    
    // Transform API product to our Product type
    return {
      id: apiProduct.key || '',
      name: apiProduct.title || '',
      price: apiProduct.sellingPrice?.min || 0,
      originalPrice: apiProduct.listPrice?.min || undefined,
      image: apiProduct.imageInfo?.images?.[0]?.sources?.[0]?.url || "/placeholder.svg?height=300&width=300",
      brand: apiProduct.brand || "",
      category: apiProduct.custom?.categoryIds?.[0]?.id || "",
      isNew: false,
      campaignMessage: apiProduct.custom?.campaignMessage?.[0]?.label ? 
        JSON.parse(apiProduct.custom.campaignMessage[0].label).text : undefined,
      campaignRibbon: apiProduct.custom?.campaignRibbon?.[0]?.label ? 
        JSON.parse(apiProduct.custom.campaignRibbon[0].label).text : undefined,
      inStock: apiProduct.inStock || false,
      summary: apiProduct.title || "",
      baseColor: apiProduct.custom?.baseColor?.[0]?.id || undefined,
      description: apiProduct.description || "",
      images: apiProduct.imageInfo?.images?.map((img: any) => img.sources?.[0]?.url) || [],
      variants: apiProduct.variants || [],
      rating: apiProduct.rating || 0,
    }
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export async function addToCartAction(product: Product, quantity: number = 1) {
  "use server"
  
  try {
    const response = await addToCart(product, quantity);
    return { success: true, data: response };
  } catch (error) {
    console.error("Error adding to cart:", error);
    return { success: false, error: "Failed to add item to cart" };
  }
}
