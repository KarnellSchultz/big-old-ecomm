import CategoryCard from "@/components/category-card"

export default function CategoriesPage() {
  // This would typically come from a database or API
  const categories = [
    {
      name: "Basketball",
      image: "/placeholder.svg?height=300&width=300",
      itemCount: 42,
      href: "/categories/basketball",
    },
    {
      name: "Football",
      image: "/placeholder.svg?height=300&width=300",
      itemCount: 38,
      href: "/categories/football",
    },
    {
      name: "Running",
      image: "/placeholder.svg?height=300&width=300",
      itemCount: 56,
      href: "/categories/running",
    },
    {
      name: "Tennis",
      image: "/placeholder.svg?height=300&width=300",
      itemCount: 29,
      href: "/categories/tennis",
    },
    {
      name: "Golf",
      image: "/placeholder.svg?height=300&width=300",
      itemCount: 24,
      href: "/categories/golf",
    },
    {
      name: "Swimming",
      image: "/placeholder.svg?height=300&width=300",
      itemCount: 18,
      href: "/categories/swimming",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Shop by Category</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.name} {...category} />
        ))}
      </div>
    </div>
  )
}
