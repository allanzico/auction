import React from 'react'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { getUser } from '@/actions/auth'
import LogoutButton from '@/components/auth/logout-button'

const NavHeader = async () => {
    const user = await getUser()
    const isAdmin = user?.user?.email === 'akanyijuka@gmail.com'

  return (
    <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
        <MaxWidthWrapper>
            <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
                <Link href='/' className='flex z-40 font-semibold'>
                Auction Site
                </Link>
                <div className='h-full flex items-center space-x-4'>
                    {
                        user ? (<>
                        <LogoutButton > 
                            Logout
                        </LogoutButton>
                        <p> {user?.user?.email}</p>
                        
                        { isAdmin ?
                           <Link href='auth/logout' className={buttonVariants(
                            {
                                size : 'sm',
                                variant : 'ghost',
                            }
                        )}>
                            Dashboard
                        </Link> : null
                    }
                    <Link href='/auction' className={buttonVariants(
                            {
                                size : 'sm',
                                variant : 'ghost',
                            }
                        )}>
                            Auctions
                        </Link>
                        </> ) : (
                            <>
                            <Link href='auth/signup' className={buttonVariants(
                                {
                                    size : 'sm',
                                    variant : 'ghost',
                                }
                            )}>
                                sign up
                            </Link>
                            <Link href='auth/login' className={buttonVariants(
                                {
                                    size : 'sm',
                                    variant : 'ghost',
                                }
                            )}>
                                login
                            </Link>
                            <div className='h-8 w-px bg-zinc-200 hidden sm:block' />
                            <Link href='/auction' className={buttonVariants(
                            {
                                size : 'sm',
                                variant : 'ghost',
                            }
                        )}>
                            Auctions
                        </Link>
                            </>
                        )
                    }

                </div>
            </div>
        </MaxWidthWrapper>
    </nav>
  )
}

export default NavHeader