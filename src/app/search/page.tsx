"use client"

import AnimatedCircularProgressBar from '@/components/magicui/animated-circular-progress-bar'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const SearchPage = () => {
  const searchParams = useSearchParams()

  // State for API result and loading
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false) // Loading state
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0) // Progress state for the animated circular progress bar

  // Get the parameters from the URL
  const scantype = searchParams.get('scantype')
  let ip = searchParams.get('scanname')

  // Function to validate the IP format (IPv4 and IPv6)
  const isValidIP = (ip: string) => {
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    const ipv6Regex = /^[0-9a-fA-F:]+$/
    return ipv4Regex.test(ip) || ipv6Regex.test(ip)
  }

  // Function to clean the IP and remove any extra quotes
  const cleanIP = (ip: string) => {
    return ip.replace(/"/g, '').trim()
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (loading) {
      // Slowly increment progress while loading
      interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 5 : prev)) // Slow increment until 90%
      }, 500)
    }

    return () => clearInterval(interval) // Clear interval on component unmount or when loading stops
  }, [loading])

  useEffect(() => {
    // Clean the IP before using it
    ip = cleanIP(ip || '')

    // Check if the scantype is 'ip' and if the IP format is valid
    if (scantype === 'ip' && ip) {
      if (isValidIP(ip)) {
        setLoading(true)
        setError('')
        console.log('Submitting request to API with IP:', ip) // Debugging log

        // Make the POST request
        fetch('https://www.vitaglow.fit/api/ipdata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Ensure that Content-Type is set to application/json
          },
          body: JSON.stringify({ ip }), // Submit the cleaned IP data
        })
          .then((response) => {
            console.log('Response status:', response.status) // Log response status
            if (!response.ok) {
              throw new Error(`API request failed with status ${response.status}`)
            }
            return response.json()
          })
          .then((data) => {
            console.log('API response data:', data) // Log the response data
            setResult(data) // Store the result from the API
            setLoading(false) // Stop loading
            // Quickly jump to 100% progress in 2 seconds
            const start = Date.now()
            const duration = 2000 // 2 seconds
            const interval = setInterval(() => {
              const elapsed = Date.now() - start
              const nextProgress = Math.min(100, 90 + (elapsed / duration) * 10) // Fast jump from 90% to 100%
              setProgress(nextProgress)
              if (nextProgress === 100) {
                clearInterval(interval)
              }
            }, 100)
          })
          .catch((error) => {
            console.error('API error:', error.message) // Log error
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
      {loading || progress < 100 ? (
        <div className="flex justify-center items-center min-h-screen"> {/* Centering the progress bar */}
          <AnimatedCircularProgressBar
            max={100}
            min={0}
            value={progress} // Dynamic progress value
            gaugePrimaryColor="rgb(79 70 229)"
            gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
          />
        </div>
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
