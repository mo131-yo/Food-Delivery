"use client";

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

function NewPasswordContent() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const API_URL = "https://food-ahv2.onrender.com/users/reset-password";

  const handleResetPassword = async () => {
    const email = searchParams.get('email');
    const verifyCode = searchParams.get('code');

    if (!password || password.length < 6) {
      return toast.error("Нууц үг доод тал нь 6 тэмдэгт байх ёстой");
    }

    if (isLoading) return;

    setIsLoading(true);
    toast.dismiss();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          verifyCode, 
          newPassword: password 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Нууц үг амжилттай солигдлоо");
        router.push("/login");
      } else {
        toast.error(data.message || "Алдаа гарлаа");
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
      toast.error("Сервертэй холбогдоход алдаа гарлаа");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-zinc-950 px-4">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl w-full max-w-sm border border-gray-100 dark:border-zinc-800">
        <h2 className="text-2xl font-black mb-4 text-center text-gray-800 dark:text-white">Шинэ нууц үг</h2>
        <p className="text-gray-500 text-center text-sm mb-6">
          Та өөрийн шинэ нууц үгээ доор оруулна уу.
        </p>

        <input 
          type="password" 
          placeholder="••••••••"
          disabled={isLoading}
          className="w-full p-4 border-2 border-gray-100 dark:border-zinc-800 rounded-2xl mb-6 outline-none focus:border-green-500 transition-all dark:bg-zinc-800 dark:text-white"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button 
          onClick={handleResetPassword} 
          disabled={isLoading}
          className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition active:scale-95 flex items-center justify-center
            ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 shadow-green-100'}`}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Нууц үг хадгалах"
          )}
        </button>
      </div>
    </div>
  );
}

export default function NewPassword() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <NewPasswordContent />
    </Suspense>
  );
}