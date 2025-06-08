"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function FocusCards() {
  const [hovered, setHovered] = useState(null);
  const router = useRouter();

  const cards = [
    {
      title: "Elena",
      description: "Empathetic listener that offers gentle support and comfort",
      src: "/elena_logo.png",
      onClick: () => router.push("/pages/Elena"),
      gradient: "from-rose-400/20 via-pink-300/15 to-rose-500/20",
      accentColor: "rose-400",
    },
    {
      title: "Jess",
      description: "Offers practical advice, coping tips, and helpful resources",
      src: "/jess_logo.png",
      onClick: () => router.push("/pages/Jess"),
      gradient: "from-blue-400/20 via-indigo-300/15 to-blue-500/20",
      accentColor: "blue-400",
    },
    {
      title: "Journal",
      description: "Your space to reflect, write, and grow mindfully",
      src: "/journal.png",
      onClick: () => router.push("/pages/Journal"),
      gradient: "from-emerald-400/20 via-teal-300/15 to-emerald-500/20",
      accentColor: "emerald-400",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-light text-white/90 mb-4">
          Your Wellness
          <span className="block font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
            Companions
          </span>
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"></div>
        <p className="text-white/60 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
          Discover personalized support through our intelligent wellness ecosystem
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {cards.map((card, index) => (
          <div
            key={card.title}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onClick={card.onClick}
            className={cn(
              "group relative cursor-pointer transition-all duration-700 ease-out",
              "hover:scale-[1.02] hover:-translate-y-2",
              hovered !== null && hovered !== index && "opacity-60 scale-[0.98]"
            )}
          >
            {/* Card Container */}
            <div className={cn(
              "relative rounded-3xl backdrop-blur-xl border border-white/10 overflow-hidden",
              "bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02]",
              "shadow-2xl shadow-black/20",
              "min-h-[480px] p-8 flex flex-col items-center text-center",
              "transition-all duration-700 ease-out",
              "hover:border-white/20 hover:shadow-3xl"
            )}>
              
              {/* Ambient Background Glow */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700",
                `bg-gradient-to-br ${card.gradient} blur-xl`
              )}></div>

              {/* Subtle Grid Pattern */}
              <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700"
                   style={{
                     backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                     backgroundSize: '24px 24px'
                   }}>
              </div>

              {/* Content Container */}
              <div className="relative z-10 flex flex-col items-center h-full justify-between">
                
                {/* Image Section */}
                <div className="flex-shrink-0 mb-8">
                  <div className="relative group/image">
                    {/* Outer Glow Ring */}
                    <div className={cn(
                      "absolute -inset-4 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-700",
                      `bg-gradient-to-r from-${card.accentColor}/20 to-${card.accentColor}/30 blur-lg`
                    )}></div>
                    
                    {/* Main Image Container */}
                    <div className={cn(
                      "relative w-36 h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden",
                      "bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm",
                      "border border-white/20 shadow-xl",
                      "group-hover:scale-110 group-hover:rotate-2 transition-all duration-700",
                      "flex items-center justify-center"
                    )}>
                      
                      {/* Inner Accent Ring */}
                      <div className={cn(
                        "absolute inset-2 rounded-full transition-all duration-700",
                        `bg-gradient-to-br from-${card.accentColor}/10 to-${card.accentColor}/20`,
                        "group-hover:from-${card.accentColor}/20 group-hover:to-${card.accentColor}/30"
                      )}></div>
                      
                      <img
                        src={card.src}
                        alt={card.title}
                        className="relative z-10 w-24 h-24 lg:w-28 lg:h-28 object-cover rounded-full filter drop-shadow-lg"
                      />

                      {/* Floating Particles */}
                      <div className={cn(
                        "absolute top-3 right-3 w-2 h-2 rounded-full transition-all duration-700",
                        `bg-${card.accentColor}/60 opacity-0 group-hover:opacity-100`,
                        "animate-pulse"
                      )}></div>
                      <div className={cn(
                        "absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full transition-all duration-700 delay-200",
                        `bg-${card.accentColor}/40 opacity-0 group-hover:opacity-100`,
                        "animate-pulse"
                      )}></div>
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex-grow flex flex-col justify-center space-y-6">
                  <div>
                    <h3 className={cn(
                      "text-2xl lg:text-3xl font-semibold mb-3 transition-all duration-500",
                      "text-white/90 group-hover:text-white"
                    )}>
                      {card.title}
                    </h3>
                    
                    {/* Accent Line */}
                    <div className={cn(
                      "w-12 h-0.5 mx-auto rounded-full transition-all duration-500",
                      `bg-gradient-to-r from-${card.accentColor} to-${card.accentColor}/60`,
                      "group-hover:w-20"
                    )}></div>
                  </div>
                  
                  <p className={cn(
                    "text-white/70 text-base leading-relaxed transition-all duration-500",
                    "group-hover:text-white/80 max-w-xs mx-auto"
                  )}>
                    {card.description}
                  </p>
                </div>

                {/* CTA Section */}
                <div className="flex-shrink-0 mt-8">
                  <div className={cn(
                    "px-6 py-3 rounded-full transition-all duration-500",
                    "bg-white/5 border border-white/10",
                    "group-hover:bg-white/10 group-hover:border-white/20",
                    "group-hover:scale-105"
                  )}>
                    <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors duration-300">
                      Explore →
                    </span>
                  </div>
                </div>
              </div>

              {/* Shimmer Effect */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent",
                "transform -skew-x-12 -translate-x-full",
                "group-hover:translate-x-full transition-transform duration-1000 ease-out",
                "opacity-0 group-hover:opacity-100"
              )}></div>

              {/* Bottom Glow */}
              <div className={cn(
                "absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2",
                "w-3/4 h-20 opacity-0 group-hover:opacity-30 transition-opacity duration-700",
                `bg-gradient-to-t from-${card.accentColor}/20 to-transparent blur-2xl`
              )}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}