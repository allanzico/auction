import { getUser } from '@/actions/auth'
import Authcontainer from '@/components/auth/auth-container'
import { LoginForm } from '@/components/auth/login-form'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async() => {
  const user = await getUser()
  if(user) return redirect('/auction')
  return <Authcontainer>

  <LoginForm />

  </Authcontainer>
}

export default Page