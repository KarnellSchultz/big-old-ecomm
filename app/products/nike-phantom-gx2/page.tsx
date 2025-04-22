"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Heart, Share2, Truck, RotateCcw, ShieldCheck, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import ProductCard from "@/components/product-card"

export default function NikePhantomPage() {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [mainImage, setMainImage] = useState(0)

  // Product data from the provided JSON
  const product = {
    id: "1234297",
    name: "Nike Phantom GX 2 Academy FG/MG Erling Haaland Q1 25",
    subtitle: "Fotbollskor för gräs och konstgräs, junior",
    price: 879,
    description:
      "Fotbollsskor med FG/MG-dobbar för användning på naturgräs och nyare konstgräsplaner. Snygg design inspirerad av fotbollsstjärnan Erling Braut Haaland. Snörning.",
    longDescription:
      "Phantom GX 2 Academy från Nike kommer med gjutna FG/MG-dobbar i plast. Dessa dobbar är utvevklade för att säkerställa bra grepp på naturgräs och nyare konstgräsplaner med längre konstgräs.",
    brand: "Nike",
    category: "Football",
    images: [
      "https://www.xxl.se/filespin/79b57c9ff8974e979e0ecbd5d3c88909",
      "https://www.xxl.se/filespin/e49338dc8df349e29cc0b128e0cf006e",
      "https://www.xxl.se/filespin/6900189d502a4b70849edfc4a24c695f",
      "https://www.xxl.se/filespin/e8bc9ebf1d6e4e0db28cd43e942c76a3",
      "https://www.xxl.se/filespin/b9ea983e0f014e5f8c7f94e53ac34a0e",
      "https://www.xxl.se/filespin/ce21fb64f94d4fc6b891d0482f3b100f",
      "https://www.xxl.se/filespin/6afaf86e8bbb410b93fd640bc4fcdb0d",
      "https://www.xxl.se/filespin/4436319aa80b4340984d3c8c94a2bf50",
      "https://www.xxl.se/filespin/d4eb19cdae21442b83f811decd7594f6",
    ],
    color: "Blue",
    sizes: [
      { size: "32", inStock: true, stockNumber: 39 },
      { size: "33", inStock: true, stockNumber: 53 },
      { size: "34", inStock: true, stockNumber: 130 },
      { size: "35", inStock: true, stockNumber: 151 },
      { size: "36", inStock: true, stockNumber: 197 },
      { size: "36.5", inStock: true, stockNumber: 134 },
      { size: "37.5", inStock: true, stockNumber: 248 },
      { size: "38", inStock: true, stockNumber: 236 },
      { size: "38.5", inStock: true, stockNumber: 207 },
    ],
    features: [
      "FG/MG-dobbar för naturgräs och konstgräs",
      "Erling Haaland-design",
      "Snörning",
      "Vadderad innersula",
      "Syntetiskt material",
      "Phantom-serie",
    ],
    specifications: [
      { name: "Användare", value: "Junior" },
      { name: "Stöd", value: "Konstgräs, Gräs" },
      { name: "Material", value: "Syntetiskt" },
      { name: "Ankelstrumpa", value: "Nej" },
      { name: "Serie", value: "Phantom" },
    ],
    campaignMessage: "Annonserad vara 14/4 - 27/4",
    campaignRibbon: "Medlem: köp 2 få -25%*",
  }

  // Related products
  const relatedProducts = [
    {
      id: "1212201",
      name: "Nike Tiempo Legend 10 Academy FG/MG",
      price: 799,
      image: "/placeholder.svg?height=300&width=300",
      category: "Football",
      rating: 4.5,
    },
    {
      id: "1214480",
      name: "Nike Mercurial Vapor 15 Academy FG/MG",
      price: 899,
      originalPrice: 999,
      image: "/placeholder.svg?height=300&width=300",
      category: "Football",
      isNew: true,
      rating: 4.7,
    },
    {
      id: "1198570",
      name: "Nike Phantom Luna Academy FG/MG",
      price: 849,
      image: "/placeholder.svg?height=300&width=300",
      category: "Football",
      rating: 4.6,
    },
    {
      id: "1191699",
      name: "Nike Zoom Mercurial Vapor 15 Pro FG",
      price: 1499,
      originalPrice: 1799,
      image: "/placeholder.svg?height=300&width=300",
      category: "Football",
      rating: 4.8,
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
              src={product.images[mainImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-5 gap-2 overflow-auto">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "aspect-square overflow-hidden rounded-md bg-gray-100 cursor-pointer",
                  index === mainImage && "ring-2 ring-green-600",
                )}
                onClick={() => setMainImage(index)}
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
              <Badge variant="outline" className="text-green-600 border-green-600">
                {product.campaignRibbon}
              </Badge>
            </div>
            <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
            <h1 className="text-3xl font-bold mb-1">{product.name}</h1>
            <p className="text-lg text-gray-700 mb-4">{product.subtitle}</p>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-sm text-gray-600">4.0 (24 reviews)</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.campaignMessage && (
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">{product.campaignMessage}</span>
              )}
            </div>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <Separator className="my-6" />

            {/* Product Options */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Size</h3>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((sizeOption) => (
                  <Button
                    key={sizeOption.size}
                    variant={selectedSize === sizeOption.size ? "default" : "outline"}
                    className={selectedSize === sizeOption.size ? "bg-green-600 hover:bg-green-700" : ""}
                    onClick={() => setSelectedSize(sizeOption.size)}
                  >
                    {sizeOption.size}
                  </Button>
                ))}
              </div>
            </div>

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
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-gray-600">{product.longDescription}</p>
                <p className="text-gray-600 mt-4">
                  These football boots are designed for optimal performance on both natural grass and newer artificial
                  turf pitches. The molded studs provide excellent traction and stability, while the synthetic upper
                  offers durability and a comfortable fit.
                </p>
                <p className="text-gray-600 mt-4">
                  Inspired by football star Erling Braut Haaland, these boots feature a sleek design that combines style
                  and functionality. The lace-up closure ensures a secure fit, and the padded insole provides comfort
                  during play.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Highlights</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-600 mr-2"></span>
                    <span>Designed for junior players</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-600 mr-2"></span>
                    <span>FG/MG studs for natural grass and newer artificial turf</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-600 mr-2"></span>
                    <span>Erling Haaland signature design</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-600 mr-2"></span>
                    <span>Synthetic material for durability</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-600 mr-2"></span>
                    <span>Traditional lace-up closure</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-600 mr-2"></span>
                    <span>Part of Nike's Phantom series</span>
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
          <TabsContent value="specifications" className="py-6">
            <h3 className="text-xl font-semibold mb-4">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <ul className="space-y-2">
                  {product.specifications.map((spec, index) => (
                    <li key={index} className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">{spec.name}</span>
                      <span className="font-medium">{spec.value}</span>
                    </li>
                  ))}
                </ul>
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
