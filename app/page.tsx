import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Award, Truck, CreditCard } from "lucide-react"
import CategoryCard from "@/components/category-card"
import FeaturedProducts from "@/components/featured-products"
import NewsletterSignup from "@/components/newsletter-signup"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Ride the Wave of Adventure</h1>
              <p className="text-lg md:text-xl mb-8">
                Premium jet skiing equipment and accessories. Experience the thrill of water sports with our professional-grade gear.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-blue-800 hover:bg-gray-100">
                  <Link href="/products">Shop Now</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-64 md:h-auto">
              <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
              <Image
src="https://jetskihireibiza.com/wp-content/uploads/2019/04/2024-Yamaha-FXSVHOCR-EU-Dusty_Navy-Action-003-03.jpg"
                alt="Sports Equipment"
                width={1080}
                height={610}
                className="w-full h-full object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Shop by Category</h2>
            <Link href="/categories" className="text-blue-600 hover:text-blue-700 flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <CategoryCard
              name="Jet Skis"
              image="/placeholder.svg?height=300&width=300"
              itemCount={42}
              href="/categories/jet-skis"
            />
            <CategoryCard
              name="Safety Gear"
              image="/placeholder.svg?height=300&width=300"
              itemCount={38}
              href="/categories/safety-gear"
            />
            <CategoryCard
              name="Accessories"
              image="/placeholder.svg?height=300&width=300"
              itemCount={56}
              href="/categories/accessories"
            />
            <CategoryCard
              name="Parts"
              image="/placeholder.svg?height=300&width=300"
              itemCount={29}
              href="/categories/parts"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-200">
              <Award className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                All our jet skis and accessories are sourced from leading manufacturers and meet strict safety standards.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-200">
              <Truck className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Our team of water sports enthusiasts provides expert advice and maintenance support for your jet ski.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-200">
              <CreditCard className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Warranty Coverage</h3>
              <p className="text-gray-600">
                Comprehensive warranty and service packages to keep your jet ski running at peak performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />
    </div>
  )
}
