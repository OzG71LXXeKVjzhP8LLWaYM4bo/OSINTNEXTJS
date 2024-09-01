import { SignIn } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className="flex-grow flex flex-col">
        <div className="flex justify-center items-center min-h-screen">
            <SignIn routing="hash" />
        </div>
    </div>
  )
}

export default page