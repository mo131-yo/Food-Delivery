"use client";

import { useState, useContext } from "react";
import Image from "next/legacy/image";
import { LogOut, User, X, Mail, ShieldCheck, LogIn } from "lucide-react";
import { UserContext } from "@/app/(main)/context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import EyePanelGrid from "./HeaderEye";

export const HeaderUserProfileIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(UserContext)
  const router = useRouter();

  const profileImage = user?.profileImage || "https://i.pinimg.com/736x/f4/07/5d/f4075d3fdfdf01e3162a845403fdce5f.jpg";
  const userName = user?.name || "User";
  const userEmail = user?.email || "No Information";

  const handleSignOut = () => {
    try {
      logout();
      setIsOpen(false); 
      toast.success("Logout");
    } catch (error) {
      toast.error("Aldaa garlaa");
    }
  };

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="cursor-pointer relative overflow-hidden rounded-full h-10 w-10 border-2 border-gray-100 hover:border-green-500 transition-all shadow-sm active:scale-95"
      >
        <Image src={profileImage} alt="profile" layout="fill" objectFit="cover" />
      </div>

      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[100] transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 flex justify-between items-center border-b bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-800">Profile</h2>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white hover:shadow-md rounded-full transition-all">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {user ? (
          <>
            <div className="p-8 border-b">
              <div className="flex flex-col items-center text-center">
                <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-green-50 shadow-lg mb-4">
                    <Image src={profileImage} alt="profile" layout="fill" objectFit="cover" />
                </div>
                <h3 className="font-bold text-xl text-gray-900">{userName}</h3>
                <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                    <Mail size={14} />
                    <span>{userEmail}</span>
                </div>
                
                {user?.role === "ADMIN" && (
                  <span className="mt-3 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                    <ShieldCheck size={12} /> 
                  </span>
                )}
              </div>
            </div>

            <div className="p-4 flex flex-col justify-between h-[calc(100%-350px)]">
              <nav className="space-y-2">
                <button 
                  onClick={() => { router.push("/user/profile"); setIsOpen(false); }}
                  className="flex items-center w-full p-4 hover:bg-gray-300 rounded-xl transition text-gray-700 font-medium group border"
                >
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-green-100 group-hover:text-green-600 transition-colors mr-4">
                    <User size={18} />
                  </div>
                  Me
                </button>
              </nav>

              <button 
                onClick={handleSignOut}
                className="flex items-center justify-center w-full p-4 bg-red-50 hover:bg-red-100 rounded-2xl transition text-red-600 font-bold gap-3 mt-auto mb-6"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="p-8 flex flex-col items-center justify-center h-[calc(100%-80px)] text-center">
            <EyePanelGrid />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Ta nervreegui bn</h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Ta uilchilgee avahiin tuld nevtersen esvel burtguulsen baih shaardlagatai.
            </p>
            
            <button 
              onClick={() => { router.push("/login"); setIsOpen(false); }}
              className="flex items-center justify-center w-full p-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl transition font-bold gap-3 shadow-lg shadow-green-100 active:scale-95"
            >
              <LogIn size={20} />
              Log in
            </button>
            
            <p className="mt-6 text-sm text-gray-400">
                Burtguuleegui yuu? <span onClick={() => { router.push("/register"); setIsOpen(false); }} className="text-green-600 font-semibold cursor-pointer hover:underline">Sign in</span>
            </p>
          </div>
        )}
      </div>

      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[90] transition-opacity duration-300"
        />
      )}
    </>
  );
};