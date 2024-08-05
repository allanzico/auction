'use client'

import React from 'react'
import { auth } from "@/auth"
import { SignOut } from '../SignOut'
import { SignIn } from '../SignIn'
import { getSession } from '@/actions/auth'
import useSWR from 'swr'

const fetchData = async () => {
  return await getSession()
}

const AuthNav = () => {
    const { data: session } = useSWR(fetchData)

  return (
        session ? (
          <div
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <SignOut />
          </div>
        ) : (
          <div
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <SignIn />
          </div>
        )
  )
}

export default AuthNav