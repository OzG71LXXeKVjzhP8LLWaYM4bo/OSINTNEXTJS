"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared'; // Adjust import if needed
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Page = () => {
  const router = useRouter();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        const showAlert = document.getElementById('auth-success-alert');
        if (showAlert) {
          showAlert.style.display = 'block'; // Show the alert
        }
        setTimeout(() => {
          router.push('/');
        }, 2000); // Redirect after 2 seconds
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <div className="flex-grow flex flex-col">
      <div className="flex justify-center items-center min-h-screen">
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </div>

      {/* ShadCN Alert (hidden by default, dynamically shown) */}
      <div
        id="auth-success-alert"
        style={{ display: 'none' }}
        className="fixed bottom-4 left-4 w-96 z-50 bg-green-100 border-green-500 text-green-700 p-4 rounded-md shadow-lg"
      >
        <Alert>
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>You are logged in!</AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default Page;

