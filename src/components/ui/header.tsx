"use client";

import { useEffect, useState } from "react";
import { createClient, SupabaseClient, Session } from "@supabase/supabase-js";
import Link from "next/link";
import { Button } from "./button";
import { Shield } from "lucide-react";

// Simplified Header component with session handling
const Header = () => {
  const [session, setSession] = useState<Session | null>(null); // Track user session
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session); // Set session if authenticated
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session); // Update session on auth state change
    });

    return () => {
      authListener?.subscription?.unsubscribe(); // Clean up listener on unmount
    };
  }, [supabase]);

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
            {/* Conditionally render the Sign In button if the user is not authenticated */}
            {!session && (
              <Link href="/sign-in">
                <Button variant="ghost" className="hidden sm:inline-flex">
                  Sign In
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

const Page = () => {
  return (
    <div className="flex-grow flex flex-col">
      {/* Simple Header */}
      <Header />
      {/* Add your page content here */}
    </div>
  );
};

export default Page;
