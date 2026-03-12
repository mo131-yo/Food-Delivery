"use client";
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import RobotDance from './components/Robot';
// import AnimatedToaster from './components/AnimatedToaster';

export default function SignUpStep1() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://food-ahv2.onrender.com/users/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Verify email ilgeelee");
      } else {
        toast.error(data.message || "Aldaa garlaa");
      }
    } catch (error) {
      toast.error("Server achaalalj bn)");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Server asaj baina tur huleene uu
  <div className='flex justify-center items-center'>
    <RobotDance/> 
  </div>
  </div>

  return (
    <div className="flex flex-col items-center justify-center max-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-10 bg-white shadow-2xl rounded-4xl w-196 h-190 border border-gray-100">
        {/* <AnimatedToaster/> */}
        <h1 className="text-2xl text-black dark:text-white mb-6 text-center">Sign-up</h1>
        <input 
          type="email" 
          placeholder="И-мэйл хаяг"
          className="w-full p-4 border border-gray-200 rounded-2xl mb-4 outline-none text-black focus:ring-2 focus:ring-red-500 bg-gray-50 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button 
          disabled={loading} 
          className={`w-full py-4 rounded-2xl font-bold text-white transition active:scale-95 ${
            loading ? 'bg-gray-400' : 'bg-[#FF3838] hover:bg-red-600'
          }`}
        >
          {loading ? "Sending" : "Contining"}
        </button>
      </form>
    </div>
  );
} 