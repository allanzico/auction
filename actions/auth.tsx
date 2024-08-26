'use server'

import prisma from "@/db/database"
import { SignInSchema, SignUpSchema } from "@/lib/schemas"
import { z } from "zod"
import { Argon2id } from "oslo/password"
import { lucia } from "@/lib/lucia"
import { cookies } from "next/headers"

export const signup = async (values: z.infer<typeof SignUpSchema>) => {
    try {
        //existing user
        const existingUser = await prisma.user.findUnique({
            where: {
                email: values.email,
            },
        })

        if (existingUser) {
            return {success: false, error: 'User already exists'}
        }

        const hashedPassword = await new Argon2id().hash(values.password)
        const user = await prisma.user.create({
            data: {
                email: values.email.toLowerCase(),
                hashedPassword,
                role: "user",
            },
        })
        const session = await lucia.createSession(user.id,{})
        const sessionCookie = await lucia.createSessionCookie(session.id)
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
        return {success: true, message: 'You have successfully signed up.'}
    } catch (error) {
        console.log(error)
        return {success: false, error: 'Something went wrong'}
    }
}

export const signin = async (values: z.infer<typeof SignInSchema>) => {
   const user = await prisma.user.findUnique({
        where: {
            email: values.email,
        },
    })
    if (!user || !user.hashedPassword) {
        return {success: false, error: 'Invalid credentials'}
    }
    const validPassword = await new Argon2id().verify(user.hashedPassword, values.password)
    if (!validPassword) {
        return {success: false, error: 'Invalid credentials'}
    }
    const session = await lucia.createSession(user.id,{})
    const sessionCookie =  lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    return {success: true, message: 'You have successfully signed in.'}
}

export const getUser = async () => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value || null
    if (!sessionId) return null
    const {session, user} = await lucia.validateSession(sessionId)
try {

if(session && session.fresh) {
    const sessionCookie = await lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
} 
if(!session) {
    const sessionCookie = await lucia.createBlankSessionCookie()
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
}

} catch (error) {
    
}

const dbUser = await prisma.user.findUnique({
    where: {
        id: user?.id,

    },
    select:{
        id: true,
        email: true,
        role: true,
        name: true,
        favoriteLots: true,
    }
})
return {user: dbUser, session}

}

export const logout = async () => {
    const sessionCookie = await lucia.createBlankSessionCookie()
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
}