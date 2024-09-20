'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

interface SearchPageProps {
  searchParams: Record<string, string | undefined>;
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/sign-in'); // Redirect if not authenticated
      }
    };
    checkSession();
  }, [router]);

  useEffect(() => {
    const fetchData = async (ip: string) => {
      try {
        const res = await fetch('https://www.vitaglow.fit/api/ipdata', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ip }),
        });
        const result = await res.json();
        setData(result);
      } catch (error) {
        setError('Failed to fetch data');
      }
    };

    const scantype = searchParams?.scantype || '';
    const scanname = searchParams?.scanname || '';
    const cleanedIP = scanname.replace(/"/g, '').trim();

    // Validate IP and fetch data if valid
    const isValidIP = (ip: string) => {
      const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      const ipv6Regex = /^[0-9a-fA-F:]+$/;
      return ipv4Regex.test(ip) || ipv6Regex.test(ip);
    };

    if (scantype === 'ip' && isValidIP(cleanedIP)) {
      fetchData(cleanedIP);
    } else if (scantype && !isValidIP(cleanedIP)) {
      setError('Invalid IP format');
    }

  }, [searchParams]);

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
