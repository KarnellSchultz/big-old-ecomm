import { ChevronRight } from "lucide-react"
import Link from "next/link"
import ProductCard from "./product-card"

export default function FeaturedProducts() {
  // This would typically come from an API or database
  const featuredProducts = [
    {
      id: "1",
      name: "Sea-Doo Spark Trixx - 2024 Model",
      price: 8999.99,
      originalPrice: 9999.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Jet Skis",
      isNew: true,
      rating: 4.9,
    },
    {
      id: "2",
      name: "Premium Life Jacket - Coast Guard Approved",
      price: 129.99,
      originalPrice: 159.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Safety Gear",
      isFeatured: true,
      rating: 4.8,
    },
    {
      id: "3",
      name: "Waterproof Action Camera Mount",
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Accessories",
      rating: 4.7,
    },
    {
      id: "4",
      name: "Performance Spark Plugs - 4 Pack",
      price: 89.99,
      originalPrice: 109.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Parts",
      rating: 4.6,
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link href="/products" className="text-blue-600 hover:text-blue-700 flex items-center">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
}
