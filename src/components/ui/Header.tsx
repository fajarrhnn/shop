
'use client'

import Link from 'next/link'
// import UserAccountNav from '../auth/UserAccountNav'
import MobileMenu from '../navbar/MobileMenu'
// import LoginButton from './LoginButton'
import DesktopMenu from '../navbar/DesktopMenu'
import { Button } from './button'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
// import TanstackQueryProvier from '../TanstackQueryProvier'
// import UserAccountNav from '../auth/UserAccountNav'

export default function Header() {

    let session = JSON.parse(localStorage.getItem('fn') || 'null');

    const getInitials = (name: string): string => {
        const nameArray = name.split(' ');
        return nameArray.map(word => word.charAt(0)).join('').toUpperCase();
    }


    return (
        <header className='w-full mx-auto sticky top-0 z-50 bg-white shadow-md'>
            <nav className=' flex items-center justify-between py-4 w-11/12 mx-auto'>
                <div className='flex items-center gap-2'>
                    <MobileMenu />

                    <Link href='/' className='hidden md:block'>
                        <p className='text-2xl font-bold'>NextShop</p>
                    </Link>
                </div>
                <div className='hidden md:block'>
                    <DesktopMenu />
                </div>

                <div className='flex items-center gap-4'>


                    {!session ?
                        <Link href={'/login'} passHref>
                            <Button>Login</Button>
                        </Link>
                        :
                        <Avatar>
                            <AvatarImage src={`https://ui-avatars.com/api/?name=${getInitials(session)}`} alt="usn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    }
                </div>
            </nav>

        </header>
    )
}