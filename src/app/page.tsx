"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Phone, Mail, User, Shield, Zap, Target, ChevronDown, Menu } from "lucide-react"

export default function Component() {
  const [searchType, setSearchType] = useState("phone")

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-4">
            <Shield className="h-6 w-6" />
            <span className="font-bold">OSINT Pro</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" className="hidden sm:inline-flex">
                Pricing
              </Button>
              <Button variant="ghost" className="hidden sm:inline-flex">
                Login
              </Button>
              <Button className="hidden sm:inline-flex">Sign Up</Button>
            </nav>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="sm:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Pricing</DropdownMenuItem>
                <DropdownMenuItem>Login</DropdownMenuItem>
                <DropdownMenuItem>Sign Up</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-grow flex flex-col">
        <section className="flex-grow flex flex-col items-center justify-center p-8 relative">
          <div className="w-full max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-8">Uncover Intelligence with OSINT Pro</h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-12">
              Powerful open-source intelligence tool for professionals and researchers
            </p>
            <Tabs value={searchType} onValueChange={setSearchType} className="w-full mb-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="phone">Phone</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="username">Username</TabsTrigger>
              </TabsList>
              <TabsContent value="phone">
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 max-w-2xl mx-auto">
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
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 max-w-2xl mx-auto">
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
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 max-w-2xl mx-auto">
                  <div className="relative w-full">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input type="text" placeholder="Enter username" className="pl-10 w-full" />
                  </div>
                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    <Search className="mr-2 h-4 w-4" /> Search
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-8 w-8 text-muted-foreground" />
          </div>
        </section>
        <section className="min-h-screen flex items-center justify-center bg-muted">
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
      </main>
      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">FAQs</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Twitter</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">LinkedIn</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>&copy; 2023 OSINT Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}