import { NextResponse, NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
  const user = request.cookies.get('lucia-auth-session')
 
  if (user) {
    return NextResponse.next()
  }
  return NextResponse.redirect(new URL('/auth/login', request.url))
}
 
export const config = {
  matcher: [
    '/auction',
    '/account',
    '/account/my-lots',
    '/account/my-purchases',
  ],
}