
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function PricingSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Hobby</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-4">$5/month</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>Limited searches</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>Basic data sources</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Professional</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-4">$20/month</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>Unlimited searches</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>Advanced data sources</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>Custom alerts</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pro</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-4">$50/month</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>All Professional features</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>API access</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>Priority support</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <a href="/pricing">View Full Pricing Details</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
