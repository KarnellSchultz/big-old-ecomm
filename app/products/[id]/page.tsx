"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Heart, Share2, Truck, RotateCcw, ShieldCheck, Star, StarHalf } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import ProductCard from "@/components/product-card"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [isWishlisted, setIsWishlisted] = useState(false)

  // This would typically come from an API or database based on the ID
  const product = {
    id: params.id,
    name: "Pro Basketball - Official Size",
    price: 29.99,
    originalPrice: 39.99,
    description:
      "Professional grade basketball designed for competitive play. Features a durable composite leather cover with deep channels for superior grip and control. Official size and weight for regulation play.",
    features: [
      "Official size and weight",
      "Durable composite leather cover",
      "Deep channel design for better grip",
      "Suitable for indoor and outdoor use",
      "Air retention technology for consistent bounce",
    ],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Basketball",
    brand: "SportsPro",
    sku: "BB-PRO-001",
    stock: 15,
    rating: 4.5,
    reviewCount: 128,
    colors: ["Orange", "Black", "Blue"],
    sizes: ["Size 5", "Size 6", "Size 7 (Official)"],
  }

  // Related products would also come from an API
  const relatedProducts = [
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
      id: "9",
      name: "Basketball Pump with Pressure Gauge",
      price: 14.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Basketball",
      rating: 4.3,
    },
    {
      id: "10",
      name: "Basketball Training Gloves",
      price: 19.99,
      originalPrice: 24.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Basketball",
      isNew: true,
      rating: 4.1,
    },
    {
      id: "11",
      name: "Indoor Basketball Court Shoes",
      price: 89.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Basketball",
      rating: 4.6,
    },
  ]

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "aspect-square overflow-hidden rounded-md bg-gray-100 cursor-pointer",
                  index === 0 && "ring-2 ring-green-600",
                )}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <Badge className="bg-green-600 hover:bg-green-700 mr-2">In Stock</Badge>
              {product.originalPrice && (
                <Badge variant="outline" className="text-red-600 border-red-600">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(Math.floor(product.rating))].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                {product.rating % 1 !== 0 && <StarHalf className="h-5 w-5 fill-yellow-400 text-yellow-400" />}
                {[...Array(5 - Math.ceil(product.rating))].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gray-300" />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              {product.originalPrice ? (
                <>
                  <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                  <span className="text-gray-500 line-through text-lg">${product.originalPrice.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              )}
            </div>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <Separator className="my-6" />

            {/* Product Options */}
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Size</h3>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Color</h3>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Quantity</h3>
              <div className="flex items-center">
                <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                  -
                </Button>
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                  className="w-16 mx-2 text-center"
                />
                <Button variant="outline" size="icon" onClick={incrementQuantity}>
                  +
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className={cn("flex-1", isWishlisted && "text-red-500 border-red-500")}
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={cn("h-5 w-5 mr-2", isWishlisted && "fill-current")} />
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Free Shipping</h4>
                  <p className="text-sm text-gray-600">On orders over $50. Delivery in 3-5 business days.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold">30-Day Returns</h4>
                  <p className="text-sm text-gray-600">Return or exchange within 30 days of purchase.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Secure Checkout</h4>
                  <p className="text-sm text-gray-600">SSL encrypted checkout for your security.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="details">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-gray-600">
                  This professional-grade basketball is designed to meet the demands of serious players. The composite
                  leather cover provides excellent grip and durability, while the precision-wound construction ensures
                  consistent bounce and shape retention.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Brand</span>
                    <span className="font-medium">{product.brand}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">SKU</span>
                    <span className="font-medium">{product.sku}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Material</span>
                    <span className="font-medium">Composite Leather</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Weight</span>
                    <span className="font-medium">22 oz (Size 7)</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Circumference</span>
                    <span className="font-medium">29.5" (Size 7)</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Suitable for</span>
                    <span className="font-medium">Indoor & Outdoor</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="features" className="py-6">
            <h3 className="text-xl font-semibold mb-4">Key Features</h3>
            <ul className="space-y-4">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                    ✓
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="reviews" className="py-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-semibold">Customer Reviews</h3>
              <Button>Write a Review</Button>
            </div>
            <div className="space-y-6">
              {/* Sample reviews - would come from API */}
              <div className="border-b pb-6">
                <div className="flex justify-between mb-2">
                  <h4 className="font-semibold">Great basketball for the price</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-2">By Michael J. - March 15, 2023</p>
                <p className="text-gray-600">
                  This basketball has excellent grip and durability. I've been using it for both indoor and outdoor play
                  for about a month now and it's holding up really well. The bounce is consistent and it feels great in
                  hand.
                </p>
              </div>
              <div className="border-b pb-6">
                <div className="flex justify-between mb-2">
                  <h4 className="font-semibold">Good quality, but runs small</h4>
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    {[...Array(1)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-gray-300" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-2">By Sarah T. - February 28, 2023</p>
                <p className="text-gray-600">
                  The quality of this basketball is great, but I found that it runs a bit smaller than other Size 7
                  basketballs I've used. Still, the grip is excellent and it has good bounce on both indoor and outdoor
                  courts.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="py-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
                <p className="text-gray-600 mb-2">We offer the following shipping options for all orders:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Standard Shipping (3-5 business days): Free on orders over $50, otherwise $5.99</li>
                  <li>Express Shipping (2-3 business days): $12.99</li>
                  <li>Next Day Delivery (order by 2pm): $19.99</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Return Policy</h3>
                <p className="text-gray-600 mb-2">
                  We want you to be completely satisfied with your purchase. If you're not happy with your item, you can
                  return it within 30 days of delivery.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Items must be in original condition with tags attached</li>
                  <li>Return shipping is free for defective items</li>
                  <li>For non-defective returns, customer is responsible for return shipping</li>
                  <li>Refunds will be processed within 5-7 business days after we receive your return</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  )
}
