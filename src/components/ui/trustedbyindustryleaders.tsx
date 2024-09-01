
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "./button"

export default function TrustedByIndustryLeaders() {
  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Trusted by Industry Leaders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Unlock the Power of Open-Source Intelligence</h3>
            <p className="text-muted-foreground">
              OSINT Pro provides you with the tools and data you need to make informed decisions, conduct thorough research, and stay ahead in your field.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span>Access to over 100+ data sources</span>
              </li>
              <li className="flex items-center">
                <span>Advanced search algorithms for accurate results</span>
              </li>
              <li className="flex items-center">
                <span>Customizable alerts and monitoring</span>
              </li>
              <li className="flex items-center">
                <span>Comprehensive reporting and data visualization</span>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <p className="font-semibold">500+</p>
                <p className="text-sm text-muted-foreground">Companies</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="font-semibold">50,000+</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="font-semibold">1M+</p>
                <p className="text-sm text-muted-foreground">Searches/Month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="font-semibold">99.9%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Button size="lg">Start Your Free Trial</Button>
        </div>
      </div>
    </section>
  )
}
