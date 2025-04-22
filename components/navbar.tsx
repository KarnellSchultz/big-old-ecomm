"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, User, Search, Menu, X, ChevronDown, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useCart } from "@/context/cart-context"


export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false)
  const pathname = usePathname()
  const { getCartCount } = useCart()

  // Get cart count from context
  const cartItemCount = getCartCount()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-green-600">SportsPro</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-green-600",
                pathname === "/" ? "text-green-600" : "text-gray-700",
              )}
            >
              Home
            </Link>

            <Link
              href="/products"
              className={cn(
                "text-sm font-medium transition-colors hover:text-green-600",
                pathname === "/products" ? "text-green-600" : "text-gray-700",
              )}
            >
              All Products
            </Link>
            <Link
              href="/products/api-products"
              className={cn(
                "text-sm font-medium transition-colors hover:text-green-600",
                pathname === "/products/api-products" ? "text-green-600" : "text-gray-700",
              )}
            >
              Featured Products
            </Link>
            <Link
              href="/deals"
              className={cn(
                "text-sm font-medium transition-colors hover:text-green-600",
                pathname === "/deals" ? "text-green-600" : "text-gray-700",
              )}
            >
              Deals
            </Link>
            <Link
              href="/about"
              className={cn(
                "text-sm font-medium transition-colors hover:text-green-600",
                pathname === "/about" ? "text-green-600" : "text-gray-700",
              )}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={cn(
                "text-sm font-medium transition-colors hover:text-green-600",
                pathname === "/contact" ? "text-green-600" : "text-gray-700",
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search (Desktop) */}
            <div className="hidden md:flex relative">
              {showSearch ? (
                <div className="flex items-center">
                  <Input type="search" placeholder="Search products..." className="w-[200px] lg:w-[300px]" autoFocus />
                  <Button variant="ghost" size="icon" className="absolute right-0" onClick={() => setShowSearch(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)}>
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              )}
            </div>

            {/* Wishlist */}
            <Link href="/wishlist">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
            </Link>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/account">My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/login">Sign In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register">Register</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-green-600">
                    {cartItemCount}
                  </Badge>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <div className="mb-4">
                    <Input type="search" placeholder="Search products..." className="w-full" />
                  </div>
                  <Link href="/" className="text-lg font-medium transition-colors hover:text-green-600">
                    Home
                  </Link>

                  <Link href="/products" className="text-lg font-medium transition-colors hover:text-green-600">
                    All Products
                  </Link>
                  <Link
                    href="/products/api-products"
                    className="text-lg font-medium transition-colors hover:text-green-600"
                  >
                    Featured Products
                  </Link>
                  <Link href="/deals" className="text-lg font-medium transition-colors hover:text-green-600">
                    Deals
                  </Link>
                  <Link href="/about" className="text-lg font-medium transition-colors hover:text-green-600">
                    About
                  </Link>
                  <Link href="/contact" className="text-lg font-medium transition-colors hover:text-green-600">
                    Contact
                  </Link>
                  <div className="border-t pt-4 mt-4">
                    <Link href="/account" className="text-lg font-medium transition-colors hover:text-green-600">
                      My Account
                    </Link>
                  </div>
                  <div>
                    <Link href="/orders" className="text-lg font-medium transition-colors hover:text-green-600">
                      My Orders
                    </Link>
                  </div>
                  <div>
                    <Link href="/wishlist" className="text-lg font-medium transition-colors hover:text-green-600">
                      My Wishlist
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
