import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import ProductCard from "@/components/product-card"
import { Search, SlidersHorizontal } from "lucide-react"
import { notFound } from "next/navigation"

// This would typically come from a database or API
const categories = ["basketball", "football", "running", "tennis", "golf", "swimming"]

// Sample products data - in a real app, this would come from a database
const allProducts = [
  {
    id: "1",
    name: "Pro Basketball - Official Size",
    price: 29.99,
    originalPrice: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "basketball",
    isNew: true,
    rating: 4.5,
  },
  {
    id: "2",
    name: "Running Shoes - Lightweight Performance",
    price: 89.99,
    originalPrice: 119.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "running",
    isFeatured: true,
    rating: 4.8,
  },
  {
    id: "3",
    name: "Tennis Racket - Professional Series",
    price: 149.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "tennis",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Football - Competition Grade",
    price: 34.99,
    originalPrice: 44.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "football",
    rating: 4.6,
  },
  {
    id: "5",
    name: "Basketball Hoop - Adjustable Height",
    price: 199.99,
    originalPrice: 249.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "basketball",
    rating: 4.4,
  },
  {
    id: "6",
    name: "Running Shorts - Breathable Fabric",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "running",
    isNew: true,
    rating: 4.3,
  },
  {
    id: "7",
    name: "Tennis Balls - Pack of 3",
    price: 9.99,
    originalPrice: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "tennis",
    rating: 4.2,
  },
  {
    id: "8",
    name: "Football Cleats - Professional",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "football",
    rating: 4.5,
  },
  {
    id: "9",
    name: "Golf Clubs - Complete Set",
    price: 499.99,
    originalPrice: 599.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "golf",
    rating: 4.8,
  },
  {
    id: "10",
    name: "Swimming Goggles - Anti-Fog",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "swimming",
    isNew: true,
    rating: 4.6,
  },
]

// Helper function to format category name for display
function formatCategoryName(category: string) {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params

  // Check if the category exists
  if (!categories.includes(category.toLowerCase())) {
    notFound()
  }

  // Filter products by category
  const products = allProducts.filter((product) => product.category.toLowerCase() === category.toLowerCase())

  const formattedCategoryName = formatCategoryName(category)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">{formattedCategoryName} Products</h1>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input placeholder={`Search ${formattedCategoryName} products...`} className="pl-10" />
        </div>
        <div className="flex gap-4">
          <Select defaultValue="featured">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="best-rated">Best Rated</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="hidden md:block space-y-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Price Range</h3>
            <Slider defaultValue={[0, 200]} min={0} max={500} step={10} />
            <div className="flex justify-between mt-2">
              <span>$0</span>
              <span>$500</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Brand</h3>
            <div className="space-y-2">
              {["Nike", "Adidas", "Under Armour", "Wilson", "Spalding"].map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox id={`brand-${brand}`} />
                  <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Rating</h3>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <Label htmlFor={`rating-${rating}`}>{rating}+ Stars</Label>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full bg-green-600 hover:bg-green-700">Apply Filters</Button>
        </div>

        {/* Products Grid */}
        <div className="md:col-span-3">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">No products found</h2>
              <p className="text-gray-600">
                We couldn't find any {formattedCategoryName} products. Please check back later or try another category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
