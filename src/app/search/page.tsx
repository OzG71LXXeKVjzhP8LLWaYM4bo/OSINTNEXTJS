import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

interface SearchPageProps {
  searchParams: Record<string, string | undefined>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  // Authenticate user directly without useEffect
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  // If user is not authenticated, redirect to sign-in page
  if (!user) {
    redirect('/sign-in');
    return;
  }

  // Extract scantype and scanname from searchParams
  const scantype = searchParams?.scantype || '';
  const scanname = searchParams?.scanname || '';

  // Validate IP address
  const isValidIP = (ip: string) => {
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^[0-9a-fA-F:]+$/;
    return ipv4Regex.test(ip) || ipv6Regex.test(ip);
  };

  // Clean up the scanname
  const cleanedIP = scanname.replace(/"/g, '').trim();

  // Handle the case when scantype is 'ip' and it's a valid IP address
  if (scantype === 'ip' && isValidIP(cleanedIP)) {
    // Fetch data from API directly without useEffect
    const res = await fetch('https://www.vitaglow.fit/api/ipdata', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ip: cleanedIP }),
    });

    const data = await res.json();

    return (
      <div>
        <h1>Search Results</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }

  // If IP is invalid, return an error message
  return (
    <div>
      <h1>Invalid IP format</h1>
    </div>
  );
};

export default SearchPage;
