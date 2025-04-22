"use client"

import { addToCartAction } from "@/app/actions/product-actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { Product } from "@/types/product"
import { Heart, RotateCcw, Share2, ShieldCheck, ShoppingCart, Star, StarHalf, Truck } from "lucide-react"
import { useState } from "react"

interface ProductDetailsProps {
  product: Product
}

interface ProductVariant {
  sizes?: string[]
  colors?: string[]
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  // Safely access variants with proper typing
  const variants = product.variants?.[0] as ProductVariant | undefined

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true)
      const result = await addToCartAction(product, quantity)
      
      if (result.success) {
        toast({
          title: "Success",
          description: `${product.name} has been added to your cart.`,
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product to cart. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.images?.[0] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {product.images?.map((image, index) => (
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
              {[...Array(Math.floor(product.rating || 0))].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
              {(product.rating || 0) % 1 !== 0 && <StarHalf className="h-5 w-5 fill-yellow-400 text-yellow-400" />}
              {[...Array(5 - Math.ceil(product.rating || 0))].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-gray-300" />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating || 0} ({product.reviewCount || 0} reviews)
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
          {variants?.sizes && variants.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Size</h3>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {variants.sizes.map((size: string) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {variants?.colors && variants.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Color</h3>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {variants.colors.map((color: string) => (
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
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {isAddingToCart ? "Adding..." : "Add to Cart"}
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
  )
} 