"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function MainCard({ title, description, imgSrc, onClick }) {
  const [fadeOut, setFadeOut] = useState(false);

  const handleClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      onClick();
    }, 400);
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center cursor-pointer transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center shadow-inner">
        <img
          src={imgSrc}
          alt={`${title} Logo`}
          className="w-24 h-24 object-contain rounded-full"
        />
      </div>
    </div>
  );
}

export function ThreeCards() {
  const router = useRouter();

  const cards = [
    {
      title: "Elena",
      description: "Listening partner for your wellness journey.",
      imgSrc: "/elena_logo.png",
      onClick: () => router.push("/pages/Elena"),
    },
    {
      title: "Jess",
      description: "Explore Jess's insights and wellness techniques.",
      imgSrc: "/jess_logo.png",
      onClick: () => router.push("/pages/Jess"),
    },
    // {
    //   title: "Journal",
    //   description: "Dive into your personal wellness journal and reflections.",
    //   imgSrc: "/journal.png",
    //   onClick: () => router.push("/pages/Journal"),
    // },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto w-full p-6">
      {cards.map((card) => (
        <MainCard key={card.title} {...card} />
      ))}
    </div>
  );
}
