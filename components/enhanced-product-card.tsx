"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useCart } from "@/context/cart-context"
import { toast } from "@/components/ui/use-toast"

interface EnhancedProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
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

export default function EnhancedProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  isNew = false,
  isFeatured = false,
  rating = 0,
  campaignMessage,
  campaignRibbon,
  inStock = true,
  summary,
  baseColor,
}: EnhancedProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem } = useCart()

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      image,
      quantity: 1,
      color: baseColor,
    })

    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    })
  }

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="relative">
        <Link href={`/products/${id}`}>
          <div className="overflow-hidden aspect-square bg-gray-100">
            <img
              src={image || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white",
            isWishlisted ? "text-red-500" : "text-gray-600",
          )}
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
        </Button>
        {isNew && <Badge className="absolute top-2 left-2 bg-green-600 hover:bg-green-700">New</Badge>}
        {discount > 0 && (
          <Badge className="absolute bottom-2 left-2 bg-red-600 hover:bg-red-700">{discount}% OFF</Badge>
        )}
        {campaignRibbon && (
          <Badge className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700">{campaignRibbon}</Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="text-sm text-gray-500 mb-1">{category}</div>
        <Link href={`/products/${id}`} className="hover:underline">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{name}</h3>
        </Link>
        {summary && <p className="text-sm text-gray-600 mb-2 line-clamp-2">{summary}</p>}
        <div className="flex items-center gap-2">
          {originalPrice ? (
            <>
              <span className="font-bold text-lg">${price.toFixed(2)}</span>
              <span className="text-gray-500 line-through text-sm">${originalPrice.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-bold text-lg">${price.toFixed(2)}</span>
          )}
        </div>
        {campaignMessage && (
          <div className="mt-1">
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{campaignMessage}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className={cn("w-full", inStock ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed")}
          disabled={!inStock}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  )
}
