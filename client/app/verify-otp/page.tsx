"use client";
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

function VerifyOtpContent() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const API_URL = "https://food-ahv2.onrender.com/users/verify-otp";

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 4) {
      return toast.error("Кодоо бүрэн оруулна уу");
    }

    setIsLoading(true);
    toast.dismiss();
    
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, verifyCode: otp }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Код баталгаажлаа");
        router.push(`/new-password?email=${email}&code=${otp}`);
      } else {
        toast.error(data.message || "Код буруу эсвэл хугацаа дууссан");
      }
    } catch (error) {
      console.error("Verify Error:", error);
      toast.error("Сервертэй холбогдоход алдаа гарлаа");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-zinc-950 px-4">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl w-full max-w-sm border border-gray-100 dark:border-zinc-800">
        <h2 className="text-2xl font-black mb-2 text-center text-gray-800 dark:text-white">Баталгаажуулах</h2>
        <p className="text-gray-500 text-center text-sm mb-6">
          {email} хаягт ирсэн кодыг оруулна уу.
        </p>
        
        <input 
          type="text" 
          maxLength={6}
          placeholder="000000"
          disabled={isLoading}
          className="w-full p-4 border-2 border-gray-100 dark:border-zinc-800 rounded-2xl mb-6 text-center text-3xl font-bold tracking-[0.5em] focus:border-red-500 outline-none transition-all dark:bg-zinc-800 dark:text-white"
          onChange={(e) => setOtp(e.target.value)}
        />

        <button 
          onClick={handleVerifyOtp} 
          disabled={isLoading}
          className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition active:scale-95 flex items-center justify-center
            ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-zinc-800 dark:bg-red-500 dark:hover:bg-red-600'}`}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Үргэлжлүүлэх"
          )}
        </button>

        <button 
          onClick={() => router.back()}
          className="w-full mt-4 text-sm text-gray-500 font-medium hover:underline"
        >
          Буцах
        </button>
      </div>
    </div>
  );
}
export default function VerifyOtp() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}