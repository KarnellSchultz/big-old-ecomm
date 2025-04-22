import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface CategoryCardProps {
  name: string
  image: string
  itemCount: number
  href: string
}

export default function CategoryCard({ name, image, itemCount, href }: CategoryCardProps) {
  return (
    <Link href={href}>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
        <div className="overflow-hidden aspect-square bg-gray-100">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-gray-500">{itemCount} products</p>
        </CardContent>
      </Card>
    </Link>
  )
}
