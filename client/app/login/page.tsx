"use client";
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const API_URL = "https://food-ahv2.onrender.com/users/sign-in"; 

  const handleLogin = async (e: React.FormEvent) => {
    
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    toast.dismiss();

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        toast.success("Тавтай морил!");
        router.push('/foods '); 
        
        setTimeout(() => {
          router.refresh();
        }, 100);
      } else {
        toast.error(data.message || "Имэйл эсвэл нууц үг буруу байна");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Сервертэй холбогдоход алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-10">
      <form onSubmit={handleLogin} className="bg-white dark:bg-zinc-900 p-10 rounded-4xl shadow-2xl border border-gray-100 dark:border-zinc-800 w-full max-w-md">
        <h1 className="text-2xl font-black mb-6 text-center">Нэвтрэх</h1>
        
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="И-мэйл хаяг"
            className="w-full p-4 border border-gray-100 dark:border-zinc-800 rounded-2xl bg-gray-50 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-red-500 transition"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input 
            type="password" 
            placeholder="Нууц үг"
            className="w-full p-4 border border-gray-100 dark:border-zinc-800 rounded-2xl bg-gray-50 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-red-500 transition"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          
          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold text-white transition active:scale-95 mt-4 flex justify-center items-center ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#FF3838] hover:bg-red-600 shadow-lg shadow-red-200'
            }`}
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : "Нэвтрэх"}
          </button>
        </div>
      </form>
    </div>
  );
}