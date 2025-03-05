'use client';

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className='relative h-screen'>
        <Image 
          src='/landing-splash.jpg' 
          alt='Rentiful Rental Platform Hero Section' 
          fill 
          className='object-cover object-center' 
          priority
          />
        <div className='absolute inset-0 bg-black bg-opacity-60'>
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className='absolute top-1/3 transform -translate-x-1/2 -translate-y-1/2 text-center w-full'
            >
                <div className='max-w-4xl mx-auto px-16 sm:px-12'>
                    <h3 className='text-white text-5xl font-bold mb-4'>
                        راه خانه تو 
                    </h3>
                    <p className='text-white text-lg mb-8'>
                        خانه هایی که با <span className='font-bold '>سبک زندگی</span> تو همخوانی دارند
                    </p>
                    <div className='flex justify-center'>
                        <Input 
                            type='search'
                            placeholder='جستجوی شهر، منطقه یا محله'
                            className='w-full max-w-lg rounded-none rounded-r-xl border-none bg-white h-12'
                            onChange={(e) => {
                                console.log(e.target.value);
                            }}
                        />
                        <Button 
                            className='bg-primary-10 text-white rounded-none rounded-l-xl border-none h-12 hover:bg-primary-20'
                            onClick={() => {
                                console.log('جستجو');
                            }}
                        >
                            جستجو
                        </Button>
                    </div>
                </div> 
            </motion.div>
        </div>
    </div>
  )
}

export default HeroSection