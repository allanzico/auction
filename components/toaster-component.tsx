
'use client'
import React, { useEffect, useState } from 'react'
import { Toaster } from "./ui/toaster"

const ToasterComponent = () => {
    const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
      setIsClient(true)
    }, [])
  return isClient  && <Toaster />
}

export default ToasterComponent