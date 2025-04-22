import { fetchProductById } from "@/app/actions/product-actions"
import { Suspense } from "react"
import ProductDetails from "./product-details"
import ProductDetailsSkeleton from "./product-details-skeleton"

export const metadata = {
  title: "Product Details | SportsPro",
  description: "View detailed information about our products",
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetchProductById(params.id)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          We couldn't find the product you're looking for. Please try another product.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails product={product} />
      </Suspense>
    </div>
  )
}
