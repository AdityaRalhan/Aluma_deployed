"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  const [start, setStart] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    addAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "normal" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden",
        className
      )}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-8 py-6",
          start && "animate-scroll"
        )}
        style={{
          animationPlayState: paused ? "paused" : "running",
          animationDirection: "var(--animation-direction)",
          animationDuration: "var(--animation-duration)",
        }}
      >
        {items.map((item) => (
          <li
            key={item.name}
            className="relative w-[350px] md:w-[450px] max-w-full shrink-0 rounded-3xl border bg-gradient-to-br from-blue-300 via-blue-600 to-blue-400 px-8 py-10 shadow-lg transition-transform hover:scale-[1.04] flex flex-col justify-between min-h-[320px]"
            style={{
              boxShadow: "0 10px 30px rgba(45, 85, 150, 0.8)", // stronger blue shadow
              animationFillMode: "both",
              animationName: direction === "left" ? "fadeInLeft" : "fadeInRight",
              animationDuration: "0.6s",
              animationTimingFunction: "ease-out",
            }}
          >
            <blockquote className="flex flex-col justify-between h-full">
              <div className="flex-1 flex items-center">
                <p className="text-lg font-medium text-white leading-relaxed">
                  “{item.quote}”
                </p>
              </div>
              <div className="mt-6">
                <p className="text-sm font-semibold text-rose-300">{item.name}</p>
                <p className="text-sm text-rose-200">{item.title}</p>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation-name: scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-direction: var(--animation-direction);
          animation-duration: var(--animation-duration);
          animation-play-state: running;
        }

        @keyframes fadeInLeft {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          0% {
            opacity: 0;
            transform: translateX(20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};
