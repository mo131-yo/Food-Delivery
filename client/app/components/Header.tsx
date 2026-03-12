"use client"

import Link from 'next/link'
import { CiShoppingCart } from "react-icons/ci"
import { MdOutlinePersonOutline } from "react-icons/md"
import { ThemeToggle } from "./Theme"
import { useState, useEffect } from 'react'
import { useCart } from './CartProvider'
import { useRouter } from 'next/navigation';
import { Toast } from '@/app/components/Toast';

export const Header = () => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

const handleIconClick = () => {
  if (user) {
    router.push('/profile');
  } else if (!user) { 
    router.push('/sign-up');
  } else {
    router.push('/login');
  }
};

  return (
    <div className='flex flex-col'>
        {/* <Toast/> */}
      <header className='fixed top-0 left-0 w-full bg-black/60 dark:bg-black backdrop-blur-md h-20 flex items-center justify-between px-10 z-50 shadow-lg'>
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => router.push('/')}> 
          <div className='flex items-center ml-4'>
            <img src="FoodIcon.png" className='w-11 h-9 mr-3' alt="Logo" />
            <div className='flex flex-col leading-tight'>
              <div className='flex text-xl font-bold italic'>
                <p className='text-red-700 '>Yam</p>
                <p className='text-white'>Yam</p>
              </div>
              <p className='text-white text-[10px] font-semibold tracking-widest uppercase'>Food Delivery</p>
            </div>
          </div>
        </div>

        <div className='flex gap-4 items-center'>
          <Link href="/cart" className="relative group w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-red-600 dark:hover:bg-yellow-600">
            <div className="text-[#595959] text-2xl transition-all duration-500 group-hover:rotate-360 group-hover:text-white">
              <CiShoppingCart />
            </div>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          
          <div 
            onClick={handleIconClick}
            className="group w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-red-600 dark:hover:bg-yellow-600 cursor-pointer">
            <div className={`text-2xl transition-all duration-500 group-hover:rotate-360 
              ${user ? 'text-black' : 'text-[#595959] group-hover:text-white'}`}>
              <MdOutlinePersonOutline size={28} />
            </div>
          </div>
          <ThemeToggle/>
        </div>
      </header>

      <div className='pt-20'>
        <img src="BG.png" className='w-full h-auto' alt="Background" />
      </div>
    </div>
  )
}