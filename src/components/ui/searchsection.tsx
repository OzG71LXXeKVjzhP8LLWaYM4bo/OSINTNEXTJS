"use client"

import { useState, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Phone, Mail, User, Globe, Cpu, Bitcoin, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch" 

export default function SearchSection() {
  const [searchType, setSearchType] = useState<keyof typeof searchQueries>("phone")
  const [searchQueries, setSearchQueries] = useState<{
    phone: string
    email: string
    username: string
    domain: string
    ip: string
    bitcoin: string
  }>({
    phone: "",
    email: "",
    username: "",
    domain: "",
    ip: "",
    bitcoin: "",
  })

  const [useCase, setUseCase] = useState<"passive" | "all">("passive")
  const [loading, setLoading] = useState(false) // Add loading flag

  const router = useRouter()

  const handleSearch = () => {
    if (loading) return; // Prevent multiple clicks
    
    const query = searchQueries[searchType] // This is what the user typed in the input field
    if (query) {
      setLoading(true) // Set loading to true to prevent multiple clicks
      router.push(`/search?scanname=${query}&scantarget=${query}&scantype=${searchType}&usecase=${useCase}`)
      setLoading(false) // Reset loading after the redirection
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, type: keyof typeof searchQueries) => {
    setSearchQueries((prev) => ({
      ...prev,
      [type]: e.target.value,
    }))
  }

  return (
    <section className="flex flex-col items-center justify-start pt-16 sm:pt-24 min-h-screen p-4 sm:p-8 relative">
      <div className="w-full max-w-3xl mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 sm:mb-6">
          Uncover Intelligence with OSINT Pro
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground text-center mb-8 sm:mb-12">
          Powerful open-source intelligence tool for professionals and researchers
        </p>
      </div>
      <div className="w-full max-w-3xl">
        <Tabs value={searchType} onValueChange={(value) => setSearchType(value as keyof typeof searchQueries)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-6">
            <TabsTrigger value="phone">Phone</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="username">Username</TabsTrigger>
            <TabsTrigger value="domain">Domain</TabsTrigger>
            <TabsTrigger value="ip">IP</TabsTrigger>
            <TabsTrigger value="bitcoin">Bitcoin</TabsTrigger>
          </TabsList>

          {/* Search Inputs for Different Types */}
          <TabsContent value="phone">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative w-full">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="Enter phone number"
                  className="pl-10 w-full"
                  value={searchQueries.phone}
                  onChange={(e) => handleInputChange(e, "phone")}
                />
              </div>
              <Button type="button" size="lg" className="w-full sm:w-auto" onClick={handleSearch} disabled={loading}>
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="email">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative w-full">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter email address"
                  className="pl-10 w-full"
                  value={searchQueries.email}
                  onChange={(e) => handleInputChange(e, "email")}
                />
              </div>
              <Button type="button" size="lg" className="w-full sm:w-auto" onClick={handleSearch} disabled={loading}>
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="username">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative w-full">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter username"
                  className="pl-10 w-full"
                  value={searchQueries.username}
                  onChange={(e) => handleInputChange(e, "username")}
                />
              </div>
              <Button type="button" size="lg" className="w-full sm:w-auto" onClick={handleSearch} disabled={loading}>
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="domain">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative w-full">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter domain name"
                  className="pl-10 w-full"
                  value={searchQueries.domain}
                  onChange={(e) => handleInputChange(e, "domain")}
                />
              </div>
              <Button type="button" size="lg" className="w-full sm:w-auto" onClick={handleSearch} disabled={loading}>
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="ip">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative w-full">
                <Cpu className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter IP address"
                  className="pl-10 w-full"
                  value={searchQueries.ip}
                  onChange={(e) => handleInputChange(e, "ip")}
                />
              </div>
              <Button type="button" size="lg" className="w-full sm:w-auto" onClick={handleSearch} disabled={loading}>
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="bitcoin">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative w-full">
                <Bitcoin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter Bitcoin address"
                  className="pl-10 w-full"
                  value={searchQueries.bitcoin}
                  onChange={(e) => handleInputChange(e, "bitcoin")}
                />
              </div>
              <Button type="button" size="lg" className="w-full sm:w-auto" onClick={handleSearch} disabled={loading}>
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Use Case Switch (applies globally to all search types) */}
        <div className="mt-4 flex justify-center space-x-4">
          <div className="flex items-center">
            <span className="mr-2">Passive</span>
            <Switch
              checked={useCase === "passive"}
              onCheckedChange={() => setUseCase("passive")}
            />
          </div>
          <div className="flex items-center">
            <span className="mr-2">All</span>
            <Switch
              checked={useCase === "all"}
              onCheckedChange={() => setUseCase("all")}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
