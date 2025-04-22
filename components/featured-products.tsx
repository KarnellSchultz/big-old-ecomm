import { ChevronRight } from "lucide-react"
import Link from "next/link"
import ProductCard from "./product-card"

export default function FeaturedProducts() {
  // This would typically come from an API or database
  const featuredProducts = [
    {
      id: "1",
      name: "Pro Basketball - Official Size",
      price: 29.99,
      originalPrice: 39.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Basketball",
      isNew: true,
      rating: 4.5,
    },
    {
      id: "2",
      name: "Running Shoes - Lightweight Performance",
      price: 89.99,
      originalPrice: 119.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Running",
      isFeatured: true,
      rating: 4.8,
    },
    {
      id: "3",
      name: "Tennis Racket - Professional Series",
      price: 149.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Tennis",
      rating: 4.7,
    },
    {
      id: "4",
      name: "Football - Competition Grade",
      price: 34.99,
      originalPrice: 44.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Football",
      rating: 4.6,
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link href="/products" className="text-green-600 hover:text-green-700 flex items-center">
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
