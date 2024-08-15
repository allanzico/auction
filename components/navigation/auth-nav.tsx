'use client'

import { getUser, logout } from '@/actions/auth'
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import useSWR from 'swr'


const getUserData = async () => {
  return await getUser()
}
const AuthNav = () => {
  const { data: user, error, isLoading, mutate } = useSWR('user', () => getUserData())

  useEffect (() => {
    mutate(
      () => getUserData(),
      false
    )
  }, [user])

  return (
    <>
      {
        user ?
          <div className="hidden lg:gap-2 lg:items-center lg:flex lg:flex-1 lg:justify-end">
            <p> {user?.user?.email}</p>
            <Button variant="secondary" onClick={() => logout()}>
              Logout
            </Button>
          </div>
          : isLoading ? <div className="hidden lg:gap-2 lg:items-center lg:flex lg:flex-1 lg:justify-end"></div>

            : <div className="hidden lg:gap-2 lg:items-center lg:flex lg:flex-1 lg:justify-end">
              <Button variant="ghost">
                <Link href="/auth/signup">
                  Create Account
                </Link>
              </Button>
              <Button className="text-sm font-semibold leading-6 text-white">
                <Link href="/auth/login">
                  Login
                </Link>
              </Button>
            </div>

      }
    </>

  )
}

export default AuthNav