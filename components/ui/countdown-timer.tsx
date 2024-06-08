'use client'

import React, { useEffect, useState } from 'react'

interface CountdownTimerProps {
  start: Date,
  end: Date,
}
const CountdownTimer = ({start, end}: CountdownTimerProps) => {
    const [timeCountDown, setTimeCountDown] = useState<number>(new Date(end).getTime() - new Date().getTime())

    useEffect(() => {
      const timer = setInterval(() => {
        const remainingTime = new Date(end).getTime() - new Date().getTime()
        setTimeCountDown(remainingTime)
      }, 1000)
  
      return () => clearInterval(timer)
    }, [end])
  
    const formatTime = (milliseconds: number) => {
      const totalSeconds = Math.floor(milliseconds / 1000)
      const days = Math.floor(totalSeconds / (3600 * 24))
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60
  
      return `${days}d ${hours}h ${minutes}m ${seconds}s`
    }
  return (
    <>
    {formatTime(timeCountDown)}
    </>
  )
}

export default CountdownTimer