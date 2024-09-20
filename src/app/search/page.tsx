'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface SearchPageProps {
  searchParams: Record<string, string | undefined>;
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state to control renders

  // Authenticate user and fetch data in one effect to avoid multiple calls
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Authenticate user
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
          router.push('/sign-in'); // Redirect if not authenticated
          return;
        }

        // Process search params if user is authenticated
        const scantype = searchParams?.scantype || '';
        const scanname = searchParams?.scanname || '';
        const cleanedIP = scanname.replace(/"/g, '').trim();

        // Validate IP format
        const isValidIP = (ip: string) => {
          const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
          const ipv6Regex = /^[0-9a-fA-F:]+$/;
          return ipv4Regex.test(ip) || ipv6Regex.test(ip);
        };

        if (scantype === 'ip' && isValidIP(cleanedIP)) {
          // Fetch data from the API
          const res = await fetch('https://www.vitaglow.fit/api/ipdata', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ip: cleanedIP }),
          });

          const result = await res.json();
          setData(result);
        } else {
          setError('Invalid IP format');
        }
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false); // Ensure we stop loading after the API call
      }
    };

    fetchData();
  }, [router, searchParams]); // Only run the effect once with correct dependencies

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while waiting for API response
  }

  if (error) {
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Search Results</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default SearchPage;
