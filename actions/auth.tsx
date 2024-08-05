'use server'

import { auth, signIn, signOut } from "@/auth";

export const handleSignIn = async (provider: string) => {
    return await signIn(provider)
}

export const handleSignOut = async () => {
    return await signOut()
}

export const getSession = async () => {
    return await auth()
}