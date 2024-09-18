"use client"

import { useEffect, useState } from 'react';

interface SearchPageProps {
  searchParams: Record<string, string | undefined>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const scantype = searchParams?.scantype || '';
  const scanname = searchParams?.scanname || '';

  // Function to validate the IP format (IPv4 and IPv6)
  const isValidIP = (ip: string) => {
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^[0-9a-fA-F:]+$/;
    return ipv4Regex.test(ip) || ipv6Regex.test(ip);
  };

  if (!scantype || !scanname) {
    return (
      <div>
        <h1>No data available</h1>
      </div>
    );
  }

  const cleanedIP = scanname.replace(/"/g, '').trim();
  if (scantype === 'ip' && isValidIP(cleanedIP)) {
    // Fetch data on the server
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
  } else {
    return (
      <div>
        <h1>Invalid IP format</h1>
      </div>
    );
  }
};

export default SearchPage;
