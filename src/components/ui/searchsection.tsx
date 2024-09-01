// File: /components/ui/SearchSection.tsx

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Phone, Mail, User, Globe, Cpu, Bitcoin, Search, ChevronDown } from "lucide-react"

export default function SearchSection() {
  const [searchType, setSearchType] = useState("phone")

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
        <Tabs value={searchType} onValueChange={setSearchType} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-6">
            <TabsTrigger value="phone">Phone</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="username">Username</TabsTrigger>
            <TabsTrigger value="domain">Domain</TabsTrigger>
            <TabsTrigger value="ip">IP</TabsTrigger>
            <TabsTrigger value="bitcoin">Bitcoin</TabsTrigger>
          </TabsList>
          <TabsContent value="phone">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative w-full">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input type="tel" placeholder="Enter phone number" className="pl-10 w-full" />
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="email">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative w-full">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input type="email" placeholder="Enter email address" className="pl-10 w-full" />
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="username">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative w-full">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input type="text" placeholder="Enter username" className="pl-10 w-full" />
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="domain">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative w-full">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input type="text" placeholder="Enter domain name" className="pl-10 w-full" />
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="ip">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative w-full">
                <Cpu className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input type="text" placeholder="Enter IP address" className="pl-10 w-full" />
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="bitcoin">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative w-full">
                <Bitcoin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input type="text" placeholder="Enter Bitcoin address" className="pl-10 w-full" />
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}
