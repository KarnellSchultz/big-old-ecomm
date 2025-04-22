import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import ProductCard from "@/components/product-card"
import { Search, SlidersHorizontal } from "lucide-react"

export default function ProductsPage() {
  // This would typically come from an API or database
  const products = [
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
    {
      id: "5",
      name: "Basketball Hoop - Adjustable Height",
      price: 199.99,
      originalPrice: 249.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Basketball",
      rating: 4.4,
    },
    {
      id: "6",
      name: "Running Shorts - Breathable Fabric",
      price: 24.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Running",
      isNew: true,
      rating: 4.3,
    },
    {
      id: "7",
      name: "Tennis Balls - Pack of 3",
      price: 9.99,
      originalPrice: 12.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Tennis",
      rating: 4.2,
    },
    {
      id: "8",
      name: "Football Cleats - Professional",
      price: 79.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Football",
      rating: 4.5,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search products..." className="pl-10" />
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
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <div className="space-y-2">
              {["Basketball", "Football", "Running", "Tennis", "Golf", "Swimming"].map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={`category-${category}`} />
                  <Label htmlFor={`category-${category}`}>{category}</Label>
                </div>
              ))}
            </div>
          </div>

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
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  )
}
