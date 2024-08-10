import React from 'react'
import { BirdIcon } from 'lucide-react'
import Link from 'next/link'

const AuthHeader = () => {
    return (
        <header className="bg-white">
            <nav aria-label="Global" className="mx-auto flex w-full items-center justify-center py-4 md:py-16 px-6 lg:px-8">
                <Link href="/">
                    <div className="flex justify-center items-center gap-2">
                        <h1 className="text-3xl font-bold">The Auction</h1>

                        <BirdIcon className="h-8 w-8" />

                    </div>
                </Link>
            </nav>
        </header>
    )
}

export default AuthHeader