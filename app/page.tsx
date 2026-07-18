"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col overflow-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        
        body { 
          font-family: 'Inter', sans-serif; 
        }
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(0.5deg); }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        .animate-float {
          animation: subtleFloat 6s ease-in-out infinite;
        }
        
        .delay-100 { animation-delay: 0.2s; opacity: 0; }
        .delay-200 { animation-delay: 0.4s; opacity: 0; }
        .delay-300 { animation-delay: 0.6s; opacity: 0; }
        .delay-400 { animation-delay: 0.8s; opacity: 0; }
        
        .glass-panel {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.08);
        }
      `}</style>

      {/* Background Image Layer */}
      <div className="absolute bottom-0 left-0 w-full h-[45vh] z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2400&auto=format&fit=crop"
          alt="Modern industrial architecture"
          className="w-full h-full object-cover filter grayscale opacity-90"
        />
        {/* Gradient overlay to blend image with white background */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/50 to-white"></div>
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-20">
        <div className="flex items-center gap-3 text-gray-900">
          <div className="w-8 h-8 border-2 border-gray-900 rotate-45 flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
          </div>
          <span className="text-lg font-bold tracking-tight">BuildX</span>
        </div>
        {/* Top right links (Platform, Solutions, Contact) have been removed here */}
      </nav>

      {/* Main Content - No Scroll, Viewport Centered */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-28 pb-10 z-10 max-w-6xl mx-auto w-full">
        {/* Hero Heading */}
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.1] mb-6 tracking-tight animate-fade-in-up delay-100">
          Command your sites. <br />
          <span className="italic font-normal text-gray-800">
            From anywhere.
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mb-4 leading-relaxed animate-fade-in-up delay-200 font-light">
          The centralized operating system for industrial builders. Track daily
          factory progress, stop material leakage, and control budgets—without
          leaving your desk.
        </p>

        {/* Highlight Stat */}
        <div className="inline-flex items-center gap-2 mb-10 px-4 py-2 border border-gray-200 rounded-full bg-white/50 backdrop-blur-sm animate-fade-in-up delay-300">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-medium text-gray-700">
            $2.4B+ Industrial Assets Managed
          </span>
        </div>

        {/* Floating Dashboard UI Mockup */}
        <div className="w-full max-w-3xl glass-panel rounded-2xl p-6 md:p-8 mb-12 animate-fade-in-up delay-300 animate-float transition-transform duration-500 hover:scale-[1.02]">
          <div className="grid grid-cols-3 gap-8 text-left">
            <div className="border-r border-gray-200 pr-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="7"
                      width="20"
                      height="14"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Plant Unit-4
                </p>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">68%</h3>
              <p className="text-xs text-green-600 mt-1">
                Civil Work On Schedule
              </p>
            </div>
            <div className="border-r border-gray-200 pr-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Materials
                </p>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">2,450t</h3>
              <p className="text-xs text-gray-400 mt-1">
                Structural Steel Balance
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Budget
                </p>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">$24.5M</h3>
              <p className="text-xs text-green-600 mt-1">4.2% Under Estimate</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-400">
          <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-medium flex items-center justify-center gap-3 hover:bg-gray-700 transition-colors duration-300 shadow-sm group">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 11l3 3L22 4"></path>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
            Request Demo
          </button>
          <button
            onClick={() => router.push("/signin")}
            className="bg-transparent text-gray-900 border border-gray-300 px-8 py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors duration-300 group"
          >
            Client Login
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </main>

      {/* Bottom spacer to allow image to bleed naturally */}
      <div className="h-[10vh] md:h-[5vh] z-10"></div>
    </div>
  );
}
