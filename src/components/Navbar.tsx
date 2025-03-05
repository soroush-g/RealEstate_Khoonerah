import { NAVBAR_HEIGHT } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <div 
      className='fixed top-0 left-0 right-0 w-full z-50 shadow-md'
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
        <div className='flex items-center justify-between w-full px-8 py-3 bg-primary-10 text-white'>
            <div className='flex items-center gap-4 md:gap-6'>
                <Link href='/' className='cursor-pointer hover:!text-primary-80' scroll={false}>
                 <div className='flex items-center gap-3'>
                    <Image src='/logo.svg' alt='logo' width={32} height={32} className='w-6 h-6' />
                    <div className='text-xl font-bold gap-0'>
                       <span className='inline-block'>خونه</span>
                       <span className='text-primary-700 font-bold mr-1 hover:!text-primary-800 inline-block'>راه</span>
                    </div>
                 </div>
                </Link>
            </div>
            <p className='text-primary-200 hidden md:block'>
               <span className='text-primary-700 font-bold'>خونه ایده‌آل</span>&nbsp;
               <span className='text-primary-200'>رو با آرامش خاطر پیدا کن؛ چه اجاره، چه خرید و فروش! </span>
            </p>
            <div className='flex items-center gap-5'>
               <Link href="/signin" className='cursor-pointer hover:!text-primary-80'>
                 <Button 
                   variant="outline" 
                   className='bg-primary-10 text-white bg-transparent hover:bg-white px-4 py-2 rounded-md'>
                   ورود  
                 </Button>
               </Link>
               <Link href="/signout" className='cursor-pointer hover:!text-primary-80'>
                 <Button 
                   variant="outline" 
                   className='bg-primary-10 text-white bg-transparent hover:bg-white px-4 py-2 rounded-md'>
                   ثبت نام  
                 </Button>
               </Link>
               
            </div>
        </div>
    </div>
  )
}

export default Navbar