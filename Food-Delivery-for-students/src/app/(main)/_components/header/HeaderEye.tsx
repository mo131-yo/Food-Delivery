"use client";

import React, { useEffect, useRef } from "react";

const EyePanelGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const eyes = document.querySelectorAll(".eye-group");

      eyes.forEach((eye) => {
        const cx = parseFloat(eye.getAttribute("data-cx") || "0");
        const cy = parseFloat(eye.getAttribute("data-cy") || "0");
        const maxRadius = parseFloat(eye.getAttribute("data-r") || "0");

        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const dx = e.clientX - eyeCenterX;
        const dy = e.clientY - eyeCenterY;
        const angle = Math.atan2(dy, dx);
        const distance = Math.min(Math.sqrt(dx * dx + dy * dy), maxRadius * 3);
        const moveDistance = (distance / (maxRadius * 3)) * maxRadius;

        const newX = cx + Math.cos(angle) * moveDistance;
        const newY = cy + Math.sin(angle) * moveDistance;

        const pupil = eye.querySelector(".pupil") as SVGElement;
        if (pupil) {
          if (pupil.tagName === "ellipse" || pupil.tagName === "circle") {
            pupil.setAttribute("cx", newX.toString());
            pupil.setAttribute("cy", newY.toString());
          } else if (pupil.tagName === "path") {
            const dx_move = newX - cx;
            const dy_move = newY - cy;
            pupil.style.transform = `translate(${dx_move}px, ${dy_move}px)`;
            pupil.style.transformOrigin = `${cx}px ${cy}px`;
          }
        }

        const highlight = eye.querySelector(".highlight") as SVGElement;
        if (highlight) {
          const baseCx = parseFloat(highlight.getAttribute("data-base-cx") || highlight.getAttribute("cx") || "0");
          const baseCy = parseFloat(highlight.getAttribute("data-base-cy") || highlight.getAttribute("cy") || "0");
          
          if (!highlight.getAttribute("data-base-cx")) {
            highlight.setAttribute("data-base-cx", baseCx.toString());
            highlight.setAttribute("data-base-cy", baseCy.toString());
          }

          const offsetX = (newX - cx) * 0.5;
          const offsetY = (newY - cy) * 0.5;

          highlight.setAttribute("cx", (baseCx + offsetX).toString());
          highlight.setAttribute("cy", (baseCy + offsetY).toString());
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="flex justify-center items-center pl-5 p-10">
      <div 
        ref={containerRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 overflow-hidden rounded-2xl"
      >
        <div className="relative w-[200px] h-[150px] bg-[#6db85a] overflow-hidden">
          <svg viewBox="0 0 200 150">
            <path d="M 40 30 Q 60 20 80 30" stroke="#000" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 120 30 Q 140 20 160 30" stroke="#000" strokeWidth="4" fill="none" strokeLinecap="round" />
            <EyeGroup cx={60} cy={75} r={15} isCircle />
            <EyeGroup cx={140} cy={75} r={15} isCircle />
          </svg>
        </div>
      </div>
    </div>
  );
};


const EyeGroup = ({ cx, cy, r, isCircle = false }: { cx: number; cy: number; r: number; isCircle?: boolean }) => (
  <g className="eye-group" data-cx={cx} data-cy={cy} data-r={r}>
    <ellipse cx={cx} cy={cy} rx={isCircle ? 35 : 32} ry={isCircle ? 40 : 38} fill="white" stroke="#000" strokeWidth="4" />
    {isCircle ? (
      <circle className="pupil" cx={cx} cy={cy} r="18" fill="#000" />
    ) : (
      <ellipse className="pupil" cx={cx} cy={cy} rx="16" ry="20" fill="#000" />
    )}
    <ellipse className="highlight" cx={cx - 5} cy={cy - 7} rx={isCircle ? 6 : 5} ry={isCircle ? 6 : 6} fill="#fff" />
  </g>
);

const SpikyEye = ({ cx, cy, isRight = false }: { cx: number; cy: number; isRight?: boolean }) => (
  <g className="eye-group" data-cx={cx} data-cy={cy} data-r={12}>
    <ellipse cx={cx} cy={cy} rx="30" ry="35" fill="white" stroke="#000" strokeWidth="4" />
    <line x1={cx} y1={cy - 35} x2={cx} y2={cy - 50} stroke="#000" strokeWidth="4" strokeLinecap="round" />
    <line x1={cx - 15} y1={cy - 33} x2={cx - 25} y2={cy - 45} stroke="#000" strokeWidth="4" strokeLinecap="round" />
    <line x1={cx + 15} y1={cy - 33} x2={cx + 25} y2={cy - 45} stroke="#000" strokeWidth="4" strokeLinecap="round" />
    <ellipse className="pupil" cx={cx} cy={cy} rx="18" ry="22" fill="#000" />
    <ellipse className="highlight" cx={cx - 5} cy={cy - 7} rx="5" ry="7" fill="#fff" />
  </g>
);

const HeartEye = ({ cx, cy, hasLashes = false }: { cx: number; cy: number; hasLashes?: boolean }) => (
  <g className="eye-group" data-cx={cx} data-cy={cy} data-r={10}>
    <path d={`M ${cx} ${cy + 30} C ${cx} ${cy + 30} ${cx - 30} ${cy + 10} ${cx - 30} ${cy - 10} C ${cx - 30} ${cy - 25} ${cx - 20} ${cy - 35} ${cx - 5} ${cy - 35} C ${cx} ${cy - 35} ${cx} ${cy - 30} ${cx} ${cy - 30} C ${cx} ${cy - 30} ${cx} ${cy - 35} ${cx + 5} ${cy - 35} C ${cx + 20} ${cy - 35} ${cx + 30} ${cy - 25} ${cx + 30} ${cy - 10} C ${cx + 30} ${cy + 10} ${cx} ${cy + 30} ${cx} ${cy + 30} Z`} fill="white" stroke="#000" strokeWidth="4" />
    <path className="pupil transition-transform duration-75 ease-out" d={`M ${cx} ${cy + 20} C ${cx} ${cy + 20} ${cx - 18} ${cy + 7} ${cx - 18} ${cy - 5} C ${cx - 18} ${cy - 13} ${cx - 12} ${cy - 20} ${cx - 4} ${cy - 20} C ${cx} ${cy - 20} ${cx} ${cy - 17} ${cx} ${cy - 17} C ${cx} ${cy - 17} ${cx} ${cy - 20} ${cx + 4} ${cy - 20} C ${cx + 12} ${cy - 20} ${cx + 18} ${cy - 13} ${cx + 18} ${cy - 5} C ${cx + 18} ${cy + 7} ${cx} ${cy + 20} ${cx} ${cy + 20} Z`} fill="#000" />
    {hasLashes && (
      <>
        <line x1={cx} y1={cy - 37} x2={cx} y2={cy - 50} stroke="#000" strokeWidth="4" strokeLinecap="round" />
        <line x1={cx - 15} y1={cy - 35} x2={cx - 25} y2={cy - 47} stroke="#000" strokeWidth="4" strokeLinecap="round" />
        <line x1={cx + 15} y1={cy - 35} x2={cx + 25} y2={cy - 47} stroke="#000" strokeWidth="4" strokeLinecap="round" />
      </>
    )}
  </g>
);

export default EyePanelGrid;