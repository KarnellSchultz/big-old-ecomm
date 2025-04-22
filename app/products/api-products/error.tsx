"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-lg text-gray-600 mb-8">
        We encountered an error while loading the products. Please try again.
      </p>
      <Button onClick={reset} className="bg-green-600 hover:bg-green-700">
        Try again
      </Button>
    </div>
  )
}
