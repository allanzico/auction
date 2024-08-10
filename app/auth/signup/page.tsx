import { getUser } from '@/actions/auth'
import Authcontainer from '@/components/auth/auth-container'
import SignupForm from '@/components/auth/signup-fom'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async() => {
  const user = await getUser()
  if(user) return redirect('/auction')
    
  return <Authcontainer>

  <SignupForm />

  </Authcontainer>
}

export default Page