"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  isNew?: boolean
  isFeatured?: boolean
  rating?: number
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  isNew = false,
  isFeatured = false,
  rating = 0,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

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
        {isNew && <Badge className="absolute top-2 left-2 bg-blue-600 hover:bg-blue-700">New</Badge>}
        {discount > 0 && (
          <Badge className="absolute bottom-2 left-2 bg-red-600 hover:bg-red-700">{discount}% OFF</Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="text-sm text-gray-500 mb-1">{category}</div>
        <Link href={`/products/${id}`} className="hover:underline">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{name}</h3>
        </Link>
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
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
