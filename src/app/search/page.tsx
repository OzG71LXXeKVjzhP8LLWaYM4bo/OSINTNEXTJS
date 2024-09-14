"use client"

import { useSearchParams } from 'next/navigation'
import React from 'react'

const SearchPage = () => {
  const searchParams = useSearchParams()

  // Get the parameters from the URL
  const scanname = searchParams.get('scanname')
  const scantarget = searchParams.get('scantarget')
  const scantype = searchParams.get('scantype')
  const usecase = searchParams.get('usecase')

  return (
    <div>
      <h1>Search Results</h1>
      <p><strong>Scan Name:</strong> {scanname}</p>
      <p><strong>Scan Target:</strong> {scantarget}</p>
      <p><strong>Scan Type:</strong> {scantype}</p>
      <p><strong>Use Case:</strong> {usecase}</p>
    </div>
  )
}

export default SearchPage
