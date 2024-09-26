'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface SearchPageProps {
  searchParams: Record<string, string | undefined>;
}

const SearchPage: React.FC<SearchPageProps> = ({ searchParams }) => {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          router.push('/sign-in');
          return;
        }

        const scantype = searchParams?.scantype ?? '';
        const scanname = searchParams?.scanname ?? '';
        const cleanedIP = scanname.trim();

        const isValidIP = (ip: string): boolean => {
          const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
          const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
          return ipv4Regex.test(ip) || ipv6Regex.test(ip);
        };

        if (scantype === 'ip' && isValidIP(cleanedIP)) {
          const res = await fetch('https://www.vitaglow.fit/api/ipdata', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ip: cleanedIP }),
          });

          if (!res.ok) {
            throw new Error(`API request failed with status ${res.status}`);
          }

          const result = await res.json();
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

    fetchData();
  }, [router, searchParams]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div><h1>{error}</h1></div>;
  return (
    <div>
      <h1>Search Results</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default SearchPage;
