"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { MdOutlinePersonOutline, MdLogout, MdEmail } from "react-icons/md";

export default function ProfilePage() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const API_URL = "https://food-ahv2.onrender.com/users";

  const handlePasswordResetRequest = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    toast.dismiss();

    try {
      const response = await fetch(`${API_URL}/reset-password-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Баталгаажуулах код имэйл рүү илгээгдлээ");
        router.push(`/verify-otp?email=${user?.email}`);
      } else {
        toast.error(data.message || "Хүсэлт илгээхэд алдаа гарлаа");
      }
    } catch (error) {
      toast.error("Сервертэй холбогдоход алдаа гарлаа");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Амжилттай гарлаа");
    router.push('/');
    router.refresh();
  };

  if (!user) return <div className="flex justify-center items-center min-h-screen">Loading ...</div>

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-20 px-4">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-4xl shadow-2xl border border-gray-100 dark:border-zinc-800 w-full max-w-md transition-all">
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-red-50 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mb-4 border-2 border-red-500 dark:border-yellow-500">
            <MdOutlinePersonOutline size={48} className="text-red-500 dark:text-yellow-500" />
          </div>
          <h1 className="text-2xl font-black text-gray-800 dark:text-white">Profile</h1>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl border border-gray-100 dark:border-zinc-700">
            <MdEmail size={24} className="text-gray-400" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">И-мэйл хаяг</span>
              <span className="text-gray-700 dark:text-gray-200 font-medium">{user.email}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button 
            disabled={isLoading}
            onClick={handlePasswordResetRequest}
            className={`w-full py-4 rounded-2xl font-bold text-red-500 border-2 border-red-500 transition active:scale-95 mb-3 
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-50'}`}
          >
            {isLoading ? "Илгээж байна..." : "Нууц үг солих"}
          </button>

          <button 
            onClick={() => router.push('/')}
            className="w-full py-4 rounded-2xl font-bold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition active:scale-95"
          >
            Нүүр хуудас руу буцах
          </button>
          
          <button 
            onClick={handleLogout}
            className="w-full py-4 rounded-2xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200 dark:shadow-none transition flex items-center justify-center gap-2 active:scale-95"
          >
            <MdLogout size={20} />
            Системээс гарах
          </button>
        </div>
      </div>
    </div>
  );
}