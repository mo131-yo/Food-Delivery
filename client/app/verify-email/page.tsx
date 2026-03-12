"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState, Suspense } from 'react';
import toast from 'react-hot-toast';

function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

const handleFinish = async (e: React.FormEvent) => {
  e.preventDefault();
  if (password !== confirmPassword) return toast.error("Nuuts ug taarahgui bn");

  setLoading(true);
  try {
    const res = await fetch('https://food-ahv2.onrender.com/users/last-sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Бүртгэл амжилттай!");
      router.push('/login');
    } else {
      toast.error(data.message || "Алдаа гарлаа");
    }
  } catch (error) {
    toast.error("Сервертэй холбогдоход алдаа гарлаа");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-10">
      <form onSubmit={handleFinish} className="bg-white p-10 rounded-4xl shadow-2xl border w-full max-w-md">
        <h1 className="text-2xl font-black mb-2 text-center text-gray-800">Нууц үг тохируулах</h1>
        <p className="text-gray-400 text-sm mb-8 text-center">Та шинэ нууц үгээ зохиож бүртгэлээ дуусгана уу.</p>
        
        <div className="space-y-4">
          <input 
            type="password" 
            placeholder="Шинэ нууц үг"
            className="w-full p-4 border border-gray-100 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-red-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <input 
            type="password" 
            placeholder="Нууц үг давтах"
            className="w-full p-4 border border-gray-100 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-red-500 transition"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button 
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold text-white transition active:scale-95 mt-4 ${
              loading ? 'bg-gray-400' : 'bg-[#FF3838] hover:bg-red-600 shadow-lg shadow-red-200'
            }`}
          >
            {loading ? "Бүртгэж байна..." : "Бүртгэл дуусгах"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen font-bold">Loading ...</div>}>
      <VerifyEmailForm />
    </Suspense>
  );
}