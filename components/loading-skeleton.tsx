"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function DashboardSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-gray-200 h-24 sm:h-32 rounded-lg"></div>

      {/* Image Slider Skeleton */}
      <div className="bg-gray-200 h-64 md:h-80 rounded-lg"></div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="p-4 sm:p-6">
              <div className="flex justify-between items-center">
                <div className="bg-gray-200 h-4 w-24 rounded"></div>
                <div className="bg-gray-200 h-4 w-4 rounded"></div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="bg-gray-200 h-8 w-12 rounded mb-2"></div>
              <div className="bg-gray-200 h-3 w-32 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Cards Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {[...Array(2)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="p-4 sm:p-6">
              <div className="bg-gray-200 h-6 w-32 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 w-48 rounded"></div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="bg-gray-200 h-4 w-40 rounded"></div>
                    <div className="bg-gray-200 h-3 w-32 rounded"></div>
                  </div>
                  <div className="bg-gray-200 h-6 w-16 rounded"></div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function TasksSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="bg-gray-200 h-8 w-32 rounded"></div>
          <div className="bg-gray-200 h-4 w-48 rounded"></div>
        </div>
        <div className="bg-gray-200 h-10 w-32 rounded"></div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="p-4">
              <div className="flex justify-between items-start gap-2">
                <div className="bg-gray-200 h-5 w-40 rounded"></div>
                <div className="bg-gray-200 h-6 w-20 rounded"></div>
              </div>
              <div className="bg-gray-200 h-4 w-24 rounded"></div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="bg-gray-200 h-12 w-full rounded"></div>
              <div className="bg-gray-200 h-4 w-32 rounded"></div>
              <div className="bg-gray-200 h-32 w-full rounded"></div>
              <div className="bg-gray-200 h-10 w-full rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function ProjectsSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 animate-pulse">
      {/* Header */}
      <div className="bg-gray-200 h-24 sm:h-32 rounded-lg"></div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="p-4 sm:p-6">
              <div className="flex justify-between items-center">
                <div className="bg-gray-200 h-4 w-24 rounded"></div>
                <div className="bg-gray-200 h-4 w-4 rounded"></div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="bg-gray-200 h-8 w-8 rounded mb-2"></div>
              <div className="bg-gray-200 h-3 w-20 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Projects */}
      <div className="space-y-6 sm:space-y-8">
        {[...Array(2)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="p-4 sm:p-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 space-y-2">
                  <div className="bg-gray-200 h-6 w-64 rounded"></div>
                  <div className="bg-gray-200 h-4 w-48 rounded"></div>
                  <div className="bg-gray-200 h-16 w-full rounded"></div>
                </div>
                <div className="bg-gray-200 h-6 w-20 rounded"></div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="space-y-4">
                    <div className="bg-gray-200 h-5 w-32 rounded"></div>
                    <div className="space-y-2">
                      {[...Array(4)].map((_, k) => (
                        <div key={k} className="bg-gray-200 h-12 w-full rounded"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
