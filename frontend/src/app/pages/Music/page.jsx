"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

const Music = () => {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6 z-10"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
                layout: { duration: 0.2 },
              }}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden will-change-transform"
            >
              <motion.div
                layoutId={`image-${active.title}-${id}`}
                transition={{ duration: 0.2 }}
              >
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                  loading="eager"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      transition={{ duration: 0.2 }}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      transition={{ duration: 0.2 }}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    transition={{ duration: 0.2 }}
                    className="px-4 py-3 text-sm rounded-full font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-150 shadow-lg"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>

                <div className="pt-4 relative px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Music Cards Grid - Optimized */}
      <div className="w-full max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          {cards.map((card, index) => (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={`card-${card.title}-${id}`}
              onClick={() => setActive(card)}
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.15, ease: "easeOut" },
              }}
              whileTap={{
                scale: 0.99,
                transition: { duration: 0.1 },
              }}
              className="p-6 flex flex-col md:flex-row justify-between items-center bg-white/10 hover:bg-white/20 rounded-xl cursor-pointer transition-colors duration-200 border border-white/20 shadow-lg backdrop-blur-sm will-change-transform"
            >
              <div className="flex gap-6 flex-col md:flex-row items-center md:items-start w-full">
                <motion.div
                  layoutId={`image-${card.title}-${id}`}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    width={100}
                    height={100}
                    src={card.src}
                    alt={card.title}
                    className="h-20 w-20 md:h-16 md:w-16 rounded-lg object-cover object-top shadow-md"
                    loading="lazy"
                  />
                </motion.div>

                <div className="flex-1 text-center md:text-left">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    transition={{ duration: 0.2 }}
                    className="font-semibold text-white text-lg mb-1"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    transition={{ duration: 0.2 }}
                    className="text-white/80 text-sm"
                  >
                    {card.description}
                  </motion.p>
                </div>
              </div>

              <motion.button
                layoutId={`button-${card.title}-${id}`}
                transition={{ duration: 0.2 }}
                whileHover={{
                  backgroundColor: "rgb(59 130 246)",
                  scale: 1.05,
                  transition: { duration: 0.15 },
                }}
                className="px-6 py-2 text-sm rounded-full font-semibold bg-blue-600/80 text-white mt-4 md:mt-0 border border-blue-400/50 flex-shrink-0 transition-colors duration-200 shadow-md"
              >
                {card.ctaText}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0, rotate: -90 }}
      animate={{ opacity: 1, rotate: 0 }}
      exit={{ opacity: 0, rotate: 90 }}
      transition={{ duration: 0.15 }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Quiet your thoughts",
    title: "Peaceful music for meditation",
    src: "/music_pic1.png",
    ctaText: "Play",
    ctaLink: "https://youtu.be/1ZYbU82GVz4?si=OeB1XRh9nFe8xHyg",
    content: () => {
      return (
        <p>
          Relaxing sleep music for deep rest and stress relief. Enjoy calming nature visuals with soothing tunes like "Flying" by Peder B. Helland—perfect for sleep, meditation, relaxation, and study.
        </p>
      );
    },
  },
  {
    description: "stay calm and focused",
    title: "Music for stress relief",
    src: "/music_pic2.png",
    ctaText: "Play",
    ctaLink: "https://youtu.be/lFcSrYw-ARY?si=A8fZ2r-z2RQeu-8x",
    content: () => {
      return (
        <p>
          Meditation Relax Music Channel presents calming stress relief music with beautiful nature sounds. Perfect for meditation, deep sleep, yoga, massage, and total relaxation.
        </p>
      );
    },
  },
  {
    description: "for anxiety and restlessness",
    title: "Breathing exercise",
    src: "/music_pic3.png",
    ctaText: "Play",
    ctaLink: "https://youtu.be/LiUnFJ8P4gM?si=qn8-4AshQbN1IrlW",
    content: () => {
      return (
        <p>
          Breathing exercises calm your mind and ease anxiety by focusing on slow, deep breaths. They help reduce stress and bring peace. Take a moment to breathe deeply and relax.
        </p>
      );
    },
  },
  {
    description: "get those positive affirmations flowing",
    title: "Positive thoughts",
    src: "/music_pic4.png",
    ctaText: "Play",
    ctaLink: "https://youtu.be/0SqQkvUV7Vo?si=uAb-R6HxjYyvOCBi",
    content: () => {
      return (
        <p>
          Positive affirmations reshape your mindset and boost confidence. Repeat daily to reduce stress and embrace a more optimistic outlook.
        </p>
      );
    },
  },
  {
    description: "Or check out the creator's favorite relaxing playlist",
    title: "Bollywood party",
    src: "/music_pic5.png",
    ctaText: "Play",
    ctaLink:
      "https://www.youtube.com/watch?v=II2EO3Nw4m0&list=PLGb4vbMWyI-10b064S09MgvspGFOGQpBo",
    content: () => {
      return (
        <p>
          Timeless Bollywood hits that bring nostalgia and joy. Perfect for unwinding or lifting your spirits—reminding you to keep moving forward. 💫🎧🕺
        </p>
      );
    },
  },
];

export default Music;
