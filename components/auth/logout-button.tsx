'use client'

import React from 'react'
import { Button } from '../ui/button'
import { logout } from '@/actions/auth'

type Props = {
 children: React.ReactNode
}
const LogoutButton = ({ children }: Props) => {
  return (
    <Button variant="secondary" onClick={() => logout()}>
      {children}
    </Button>
  )
}

export default LogoutButton