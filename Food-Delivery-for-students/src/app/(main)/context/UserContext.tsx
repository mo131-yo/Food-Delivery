"use client";

import { User } from "@/constants/auth";
import { api, handleSignIn } from "@/lib";
import getCurrentUser from "@/lib/services/user";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";


type UserContextType = {
  user?: User | undefined | null
  loading: boolean; 
  setUser: Dispatch<SetStateAction<User | undefined | null>>;
  login: (email: string, password: string) => Promise<User | undefined>;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { push } = useRouter();
  const [user, setUser] = useState<User | undefined | null>(undefined);
  const [loading, setLoading] = useState(true);

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user")
    setUser(null);
    push("/login");
  };

const login = async (email: any, password: any) => {
  try {
    const res = await api.post("/users/sign-in", { email, password });
    
    if (res.data.accessToken) {
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      setUser(res.data.user); 
      
      return res.data.user;
    }
  } catch (error) {
    console.error("Context Login Error:", error);
    throw error;
  }
};
  
useEffect(() => {
  const loadUser = async () => {
    const token = localStorage.getItem("token") || localStorage.getItem("accessToken")
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const data = await getCurrentUser(token);
      const userData = data?.user || data;

      if(userData){
        setUser(userData);
      }

      if (userData?.role === "ADMIN") {
          const path = window.location.pathname;
          if (path === "/" || path === ("/login")) {
            push("/food-menu");
          }
        }
        else{
          setUser(null);
        }
      } catch (error) {
        console.error("Load User Error:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [push]);

  return (
    <UserContext.Provider value={{ user, login, setUser, loading, logout }}>
      {!loading && children}
    </UserContext.Provider>
  );
};
