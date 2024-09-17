'use client';

import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const SignUpPage = () => {

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);


  return (
    <div className="flex justify-center items-center min-h-screen">
      <Auth 
        supabaseClient={supabase} 
        appearance={{ theme: ThemeSupa }} // Add any OAuth providers you'd like to use
        view="sign_up" // This explicitly sets the Auth view to Sign-Up
      />
    </div>
  );
};

export default SignUpPage;
