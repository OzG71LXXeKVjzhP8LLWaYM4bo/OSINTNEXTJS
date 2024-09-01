import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Shield, Menu } from "lucide-react"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-4">
          <Shield className="h-6 w-6" />
          <Link href="/" className="font-bold hover:underline">
            OSINT Pro
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <nav className="flex items-center space-x-2">
            <Link href="/pricing">
              <Button variant="ghost" className="hidden sm:inline-flex">
                Pricing
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:inline-flex">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="hidden sm:inline-flex">Sign Up</Button>
            </Link>
          </nav>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="sm:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href="/pricing">
                <DropdownMenuItem asChild>
                  <span>Pricing</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/login">
                <DropdownMenuItem asChild>
                  <span>Login</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/signup">
                <DropdownMenuItem asChild>
                  <span>Sign Up</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
