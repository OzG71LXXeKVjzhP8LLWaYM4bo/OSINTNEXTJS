"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, Target } from "lucide-react"

export default function WhyChoose() {
  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose OSINT Pro?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" /> Comprehensive Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              Access a wide range of open-source intelligence data from multiple sources, all in one place.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5" /> Real-time Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              Get instant results with our powerful search engine, designed for speed and accuracy.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" /> Precision Targeting
              </CardTitle>
            </CardHeader>
            <CardContent>
              Narrow down your search with advanced filters and options for more precise intelligence gathering.
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
