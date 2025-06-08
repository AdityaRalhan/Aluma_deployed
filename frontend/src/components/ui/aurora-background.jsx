"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex flex-col items-center justify-center bg-[#1D5DCB] text-white",
          className
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            "--aurora":
              "repeating-linear-gradient(100deg,#134BB3_10%,#1D5DCB_15%,#4D86E0_20%,#7AA7F2_25%,#C5DFFF_30%)",

            "--soft-gradient":
              "repeating-linear-gradient(100deg,#4D86E0_0%,#4D86E0_7%,transparent_10%,transparent_12%,#1D5DCB_16%)",

            "--white-gradient":
              "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",

            "--blue-100": "#C5DFFF", // very light blue
            "--blue-200": "#7AA7F2", // light sky blue
            "--blue-300": "#4D86E0", // medium sky blue
            "--blue-400": "#1D5DCB", // base color (222°, 84%, 46%)
            "--blue-500": "#134BB3", // deeper blue
            "--white": "#fff",
            "--transparent": "transparent",
          }}
        >
          <div
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px] 
              [background-image:var(--white-gradient),var(--aurora)] 
              [background-size:300%,_200%] 
              [background-position:50%_50%,50%_50%] 
              opacity-60 blur-[8px] invert-0 filter will-change-transform 
              [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--blue-400)_15%,var(--blue-300)_20%,var(--blue-200)_25%,var(--blue-100)_30%)] 
              [--soft-gradient:repeating-linear-gradient(100deg,var(--blue-400)_0%,var(--blue-400)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--blue-300)_16%)] 
              [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] 
              after:absolute after:inset-0 
              after:[background-image:var(--white-gradient),var(--aurora)] 
              after:[background-size:200%,_100%] 
              after:[background-attachment:fixed] 
              after:mix-blend-difference 
              after:content-[""]`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,#1D5DCB_10%,var(--transparent)_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};
