'use client';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function Journal() {
  const [userId, setUserId] = useState(null);
  const [pages, setPages] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [text, setText] = useState("");
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('');
  const Router = useRouter();

  // Decode token to get userId on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT token
        console.log("Decoded token:", decoded);
        setUserId(decoded.id || decoded._id); // Adjust according to your JWT payload
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  // Fetch journal entries after userId is set
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT token
    const userId = decoded.id || decoded._id; // Adjust according to your JWT payload

    if (!userId) return;

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/journal/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    
      .then((res) => res.json())
      .then((data) => {
        if (!data || !Array.isArray(data)) {
          console.error("Invalid data from API", data);
          return;
        }
        const mappedPages = {};
        data.forEach((entry) => {
          mappedPages[entry.pageNumber] = entry.text;
        });
        setPages(mappedPages);
        setText(mappedPages[currentPage] || "");
      })
      .catch((err) => console.error("Error fetching journal entries:", err));
  }, [userId]);

  // Change page handler with flip animation
  const goToPage = (pageNum) => {
    if (pageNum === currentPage || isFlipping) return;
    
    setPages((prev) => ({ ...prev, [currentPage]: text }));
    setIsFlipping(true);
    setFlipDirection(pageNum > currentPage ? 'forward' : 'backward');
    
    setTimeout(() => {
      setCurrentPage(pageNum);
      setText(pages[pageNum] || "");
    }, 600); // Reduced timing for smoother animation
    
    setTimeout(() => {
      setIsFlipping(false);
      setFlipDirection('');
    }, 1200); // Reduced total animation time
  };

  // Save current page content
  const handleSave = async () => {
    if (!userId) return alert("User not logged in");

    const token = localStorage.getItem("token");
    const body = {
      userId, // add this
      pageNumber: currentPage,
      text,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/journal`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) throw new Error("Failed to save entry");
      alert("Saved!");
    } catch (error) {
      console.error(error);
      alert("Error saving entry");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 flex items-center justify-center">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600&display=swap');
        
        .journal-texture {
          background-image: 
            radial-gradient(circle at 15% 15%, rgba(255, 251, 235, 0.4) 0%, transparent 40%),
            radial-gradient(circle at 85% 85%, rgba(250, 245, 220, 0.3) 0%, transparent 40%),
            linear-gradient(135deg, rgba(255, 253, 245, 0.1) 0%, transparent 100%);
        }
        
        .paper-lines {
          background-image: repeating-linear-gradient(
            transparent,
            transparent 28px,
            rgba(71, 85, 105, 0.08) 28px,
            rgba(71, 85, 105, 0.08) 29px
          );
        }
        
        .handwriting {
          font-family: 'Crimson Text', serif;
          line-height: 29px;
          font-weight: 400;
        }
        
        .ui-text {
          font-family: 'Inter', sans-serif;
        }
        
        .margin-line {
          border-left: 2px solid rgba(239, 68, 68, 0.12);
        }
        
        .page-shadow {
          box-shadow: 
            0 0 0 1px rgba(71, 85, 105, 0.08),
            0 8px 25px -5px rgba(0, 0, 0, 0.1),
            0 4px 10px -3px rgba(0, 0, 0, 0.05),
            inset 0 0 0 1px rgba(255, 255, 255, 0.15);
        }
        
        .book-binding {
          background: linear-gradient(to right, 
            rgba(51, 65, 85, 0.9) 0%, 
            rgba(51, 65, 85, 0.7) 50%, 
            rgba(51, 65, 85, 0.9) 100%);
        }

        .page-flip-container {
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .page-flip {
          transition: transform 1.2s cubic-bezier(0.23, 1, 0.32, 1);
          transform-origin: left center;
          transform-style: preserve-3d;
          position: relative;
          will-change: transform;
        }

        .page-flip.flipping-forward {
          animation: flipForward 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }

        .page-flip.flipping-backward {
          animation: flipBackward 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }

        @keyframes flipForward {
          0% {
            transform: rotateY(0deg) translateZ(0px);
            box-shadow: 
              0 0 0 1px rgba(71, 85, 105, 0.08),
              0 8px 25px -5px rgba(0, 0, 0, 0.1),
              0 4px 10px -3px rgba(0, 0, 0, 0.05);
          }
          30% {
            transform: rotateY(-30deg) translateZ(25px);
            box-shadow: 
              -12px 0 24px rgba(0, 0, 0, 0.15),
              -6px 0 12px rgba(0, 0, 0, 0.1);
          }
          50% {
            transform: rotateY(-90deg) translateZ(40px);
            box-shadow: 
              -20px 0 40px rgba(0, 0, 0, 0.2),
              -10px 0 20px rgba(0, 0, 0, 0.15);
          }
          70% {
            transform: rotateY(-150deg) translateZ(25px);
            box-shadow: 
              -12px 0 24px rgba(0, 0, 0, 0.15),
              -6px 0 12px rgba(0, 0, 0, 0.1);
          }
          100% {
            transform: rotateY(-180deg) translateZ(0px);
            box-shadow: 
              0 0 0 1px rgba(71, 85, 105, 0.08),
              0 8px 25px -5px rgba(0, 0, 0, 0.1),
              0 4px 10px -3px rgba(0, 0, 0, 0.05);
          }
        }

        @keyframes flipBackward {
          0% {
            transform: rotateY(-180deg) translateZ(0px);
            box-shadow: 
              0 0 0 1px rgba(71, 85, 105, 0.08),
              0 8px 25px -5px rgba(0, 0, 0, 0.1),
              0 4px 10px -3px rgba(0, 0, 0, 0.05);
          }
          30% {
            transform: rotateY(-150deg) translateZ(25px);
            box-shadow: 
              -12px 0 24px rgba(0, 0, 0, 0.15),
              -6px 0 12px rgba(0, 0, 0, 0.1);
          }
          50% {
            transform: rotateY(-90deg) translateZ(40px);
            box-shadow: 
              -20px 0 40px rgba(0, 0, 0, 0.2),
              -10px 0 20px rgba(0, 0, 0, 0.15);
          }
          70% {
            transform: rotateY(-30deg) translateZ(25px);
            box-shadow: 
              -12px 0 24px rgba(0, 0, 0, 0.15),
              -6px 0 12px rgba(0, 0, 0, 0.1);
          }
          100% {
            transform: rotateY(0deg) translateZ(0px);
            box-shadow: 
              0 0 0 1px rgba(71, 85, 105, 0.08),
              0 8px 25px -5px rgba(0, 0, 0, 0.1),
              0 4px 10px -3px rgba(0, 0, 0, 0.05);
          }
        }

        .page-content {
          backface-visibility: hidden;
          opacity: 1;
          transition: opacity 0.2s ease;
        }

        .page-flip.flipping-forward .page-content,
        .page-flip.flipping-backward .page-content {
          opacity: 0.9;
        }

        .page-back {
          transform: rotateY(180deg);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }
      `}</style>
      
      {/* Book Cover */}
      <div className="bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 rounded-2xl p-8 shadow-2xl max-w-6xl w-full relative border-2 border-slate-500/30">
  
        {/* Close Journal Button */}
        <button
          onClick={() => Router.push("/pages/Dashboard")}
          className="ui-text absolute top-4 right-4 z-50 bg-white/90 backdrop-blur-sm text-slate-700 font-medium px-5 py-2.5 rounded-lg shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 border border-slate-200"
        >
          Close Journal
        </button>
  
        {/* Book Spine */}
        <div className="book-binding absolute left-0 top-0 w-8 h-full rounded-l-2xl shadow-inner"></div>
        
        {/* Decorative Corner Ornaments */}
        <div className="absolute top-6 left-12 w-6 h-6 border-l-2 border-t-2 border-slate-400/40 opacity-60"></div>
        <div className="absolute top-6 right-6 w-6 h-6 border-r-2 border-t-2 border-slate-400/40 opacity-60"></div>
        <div className="absolute bottom-6 left-12 w-6 h-6 border-l-2 border-b-2 border-slate-400/40 opacity-60"></div>
        <div className="absolute bottom-6 right-6 w-6 h-6 border-r-2 border-b-2 border-slate-400/40 opacity-60"></div>
        
        {/* Page Flip Container */}
        <div className="page-flip-container ml-4">
          {/* Inner Paper with Flip Animation */}
          <div className={`
            journal-texture bg-white rounded-xl p-8 page-shadow relative page-flip
            ${isFlipping && flipDirection === 'forward' ? 'flipping-forward' : ''}
            ${isFlipping && flipDirection === 'backward' ? 'flipping-backward' : ''}
          `}>
            
            {/* Main Page Content */}
            <div className="page-content">
              {/* Page Curl Effect */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-tl from-gray-100 to-transparent rounded-bl-full shadow-sm"></div>
              
              {/* Journal Header */}
              <div className="text-center mb-8 border-b-2 border-slate-200 pb-6">
                <h1 className="ui-text text-5xl font-semibold text-slate-800 mb-3 tracking-wide">
                  My Journal
                </h1>
                <div className="w-40 h-1 bg-gradient-to-r from-slate-600 to-slate-700 mx-auto rounded-full mb-4"></div>
                <p className="handwriting text-2xl text-slate-600 font-medium">
                  Page {currentPage}
                </p>
              </div>
      
              {/* Writing Area */}
              <div className="relative">
                <div className="paper-lines margin-line pl-20 pr-8 py-8 min-h-[400px] bg-white/80 backdrop-blur-sm rounded-lg border border-slate-100">
                  <textarea
                    className="handwriting w-full h-[350px] bg-transparent border-none outline-none resize-none text-slate-700 text-lg placeholder-slate-400/70"
                    placeholder="Dear Journal, today I want to write about..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isFlipping}
                    style={{
                      lineHeight: '29px',
                      fontFamily: 'Crimson Text, serif'
                    }}
                  />
                </div>
              </div>
      
              {/* Navigation Controls */}
              <div className="flex justify-between items-center mt-10 pt-8 border-t-2 border-slate-200">
                <button
                  onClick={() => goToPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1 || isFlipping}
                  className={`
                    ui-text px-8 py-4 rounded-xl font-medium text-base flex items-center gap-3 transition-all duration-300 transform
                    ${currentPage === 1 || isFlipping
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-slate-600 to-slate-700 text-white hover:from-slate-700 hover:to-slate-800 hover:scale-105 hover:shadow-lg active:scale-95'
                    }
                  `}
                >
                  <span className="text-lg">◀</span>
                  Previous Page
                </button>
      
                <button
                  onClick={handleSave}
                  disabled={isFlipping}
                  className={`
                    ui-text px-10 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 transition-all duration-300 transform shadow-lg
                    ${isFlipping
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 hover:scale-105 hover:shadow-xl active:scale-95'
                    }
                  `}
                >
                  <span className="text-xl">✒️</span>
                  Save Entry
                </button>
      
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={isFlipping}
                  className={`
                    ui-text px-8 py-4 rounded-xl font-medium text-base flex items-center gap-3 transition-all duration-300 transform
                    ${isFlipping
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-slate-600 to-slate-700 text-white hover:from-slate-700 hover:to-slate-800 hover:scale-105 hover:shadow-lg active:scale-95'
                    }
                  `}
                >
                  Next Page
                  <span className="text-lg">▶</span>
                </button>
              </div>
            </div>

            {/* Back of Page (for flip effect) */}
            <div className="page-back journal-texture bg-white rounded-xl p-8">
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-slate-500 opacity-40">
                  <div className="text-6xl mb-4">📖</div>
                  <p className="handwriting text-2xl">Turning page...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Book Title on Spine */}
        <div className="ui-text absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-slate-300 font-medium text-sm tracking-widest">
          JOURNAL
        </div>
      </div>
    </div>
  );
}