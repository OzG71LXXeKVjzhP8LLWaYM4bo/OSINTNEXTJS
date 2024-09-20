'use client'; // Ensure this is a client-side component

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Authenticate user
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        // Log auth status for debugging
        console.log('User:', user);
        if (authError) {
          console.error('Auth error:', authError);
        }

        if (!user) {
          router.push('/sign-in'); // Redirect if not authenticated
          return;
        }

        // Step 2: Process search params
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
          // Step 3: Fetch data from the API
          console.log('Fetching data for IP:', cleanedIP); // Log the IP being sent to the API
          const res = await fetch('https://www.vitaglow.fit/api/ipdata', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ip: cleanedIP }),
          });

          // Step 4: Handle API response
          if (!res.ok) {
            throw new Error(`API request failed with status ${res.status}`);
          }

          const result = await res.json();
          console.log('API Response:', result); // Log the API response
          setData(result);
        } else {
          setError('Invalid IP format');
        }
      } catch (err) {
        console.error('Error during API call:', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Trigger the API call only once
  }, [router, searchParams]); // Make sure this effect runs only when `router` or `searchParams` change

  // Loading state to avoid displaying before data is ready
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error if there is one
  if (error) {
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );
  }

  // Display data once it's fetched
  return (
    <div>
      <h1>Search Results</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default SearchPage;
