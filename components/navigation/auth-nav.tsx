import React from 'react'
import { auth } from "@/auth"
import { SignOut } from '../SignOut'
import { SignIn } from '../SignIn'

const AuthNav = async () => {
    const session = await auth()

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