"use client"

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const SearchPage = () => {
  const searchParams = useSearchParams()
  
  // State for API result and loading
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false) // Loading state
  const [error, setError] = useState('')

  // Get the parameters from the URL
  const scantype = searchParams.get('scantype')
  const ip = searchParams.get('scanname')

  // Function to validate the IP format (IPv4 and IPv6)
  const isValidIP = (ip: string) => {
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    const ipv6Regex = /^[0-9a-fA-F:]+$/
    return ipv4Regex.test(ip) || ipv6Regex.test(ip)
  }

  useEffect(() => {
    // Check if the scantype is 'ip' and if the IP format is valid
    if (scantype === 'ip' && ip) {
      if (isValidIP(ip)) {
        setLoading(true)
        // Make the POST request
        fetch('https://www.vitaglow.fit/api/ipdata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ip }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`API request failed with status ${response.status}`)
            }
            return response.json()
          })
          .then((data) => {
            setResult(data) // Store the result from the API
            setLoading(false) // Stop loading
          })
          .catch((error) => {
            setError('Failed to fetch data from the API: ' + error.message)
            setLoading(false) // Stop loading
          })
      } else {
        setError('Invalid IP format')
      }
    }
  }, [scantype, ip])

  return (
    <div>
      <h1>Search Results</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : result ? (
        <div>
          <h2>IP Data</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre> {/* Displaying the API result */}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  )
}

export default SearchPage
