"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/dist/CustomEase';

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export const Toast = () => {
  const toastRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!toastRef.current) return;

    CustomEase.create(
      "toastIn",
      "M0,0 C0,0.502 0.073,0.674 0.2,0.8 0.331,0.932 0.504,1 1,1 "
    );
    CustomEase.create("toastOut", "M0,0 C0.532,0 0.954,0.461 1,1 ");

    const tl = gsap.timeline({ paused: true });

    tl.fromTo(
      toastRef.current,
      {
        y: "100%",
        opacity: 0,
        rotation: 18,
        scaleX: 0.5,
        scaleY: 2.6,
        color: "transparent",
        height: 140,
        width: 100,
        display: "block"
      },
      {
        y: -360,
        opacity: 1,
        rotation: -18,
        duration: 0.66,
        scaleX: 1.2,
        scaleY: 0.7,
        ease: "toastIn"
      }
    );

    tl.to(
      toastRef.current,
      {
        rotation: 420,
        scale: 1,
        duration: 1,
        height: "auto",
        width: "auto",
        ease: "circ.inOut"
      },
      ">-0.45"
    );

    tl.to(
      toastRef.current,
      {
        color: "white",
        backgroundColor: "#795129",
        duration: 0.2
      },
      "<0.4"
    );

    tl.to(toastRef.current, {
      y: 0,
      rotation: 360,
      opacity: 1,
      backgroundColor: "#272a2d",
      backgroundImage: "none",
      duration: 1.3,
      ease: "bounce.out"
    });

    tl.to(toastRef.current, { 
      y: 200, 
      opacity: 0, 
      duration: 1, 
      delay: 3, 
      ease: "circ.in",
      onComplete: () => {
        gsap.set(toastRef.current, { display: "none" });
      }
    });

    timelineRef.current = tl;

    const timer = setTimeout(() => {
      showToast();
    }, 300);

    return () => {
      clearTimeout(timer);
      tl.kill();
    };
  }, []);

  const showToast = () => {
    if (timelineRef.current) {
      gsap.set(toastRef.current, { display: "block" });
      timelineRef.current.play(0);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
      <h1 
        className="pointer-events-auto cursor-pointer text-2xl font-bold text-black select-none"
        onClick={showToast}
      >
        CLICK TOAST
      </h1>

      <div
        id="toast"
        ref={toastRef}
        role="status"
        aria-live="polite"
        className="toast fixed right-5 bottom-5 text-whitesmoke p-3 text-center rounded-xl bg-transparent opacity-0 z-9999"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' fill='%23795129' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 88.7 41.635 L 88.7 85.612 C 88.7 87.573 88.1 89.947 87.3 91.702 C 85.2 96.038 81.3 98 76.7 98 C 64.7 98 34.7 98 22.7 98 C 20.8 98 18.5 97.38 16.8 96.554 C 12.6 94.386 10.7 90.36 10.7 85.612 L 10.7 41.222 C 5.4 37.3 2 30.9 2 23.674 C 2 9.317 16.803 2.079 31.383 2.001 C 38.04 1.966 45.373 3.1 50.171 3.1 C 54.967 3.1 63.71 2.192 70.348 2.298 C 85.165 2.532 98 9.315 98 23.674 C 98 31.21 94.3 37.713 88.7 41.635 Z'/%3E%3C/svg%3E")`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100px',
          height: '120px',
          willChange: 'opacity, transform, background, color, height, width'
        }}
      >
        <span className="relative top-1/2 -translate-y-1/2 block font-bold">
            TOASTY!
        </span>
      </div>
    </div>
  );
};