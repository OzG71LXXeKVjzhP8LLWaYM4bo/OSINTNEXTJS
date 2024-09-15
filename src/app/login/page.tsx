import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'

const page = () => {

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  return (
    <div className="flex-grow flex flex-col">
        <div className="flex justify-center items-center min-h-screen">
          <Auth supabaseClient={supabase} />
        </div>
    </div>
  )
}

export default page