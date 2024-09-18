"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient, SupabaseClient, Session } from "@supabase/supabase-js";
import Link from "next/link";
import { Button } from "./button";
import { Menu, Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

// Custom Header component with session handling
const Header = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false); // Session check done
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) return null;  // Prevent rendering until session is checked

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Shield className="h-6 w-6" />
          <Link href="/" className="font-bold hover:underline">
            OSINT Pro
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <nav className="flex items-center space-x-2">
            <Link href="/pricing">
              <Button variant="ghost" className="hidden sm:inline-flex">
                Pricing
              </Button>
            </Link>

            {!session ? (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="hidden sm:inline-flex">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="hidden sm:inline-flex">Sign Up</Button>
                </Link>
              </>
            ) : null}
          </nav>

          {session ? (
            <>
              {/* Separate Logout Button */}
              <Button variant="ghost" onClick={() => handleLogout}>
                Logout
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
};

const Page = () => {
  return (
    <div className="flex-grow flex flex-col">
      {/* Custom Header */}
      <Header />
      {/* Add your page content here */}
    </div>
  );
};

export default Page;
