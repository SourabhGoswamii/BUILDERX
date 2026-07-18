"use client";
import { useState } from "react";

export default function Login() {
  const [phoneno, setPhoneno] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1: Phone, Step 2: OTP
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Step 1: Simulate sending OTP
    if (step === 1) {
      setTimeout(() => {
        // Basic validation for demo
        if (phoneno.length < 10) {
          setError("Please enter a valid mobile number.");
          setLoading(false);
          return;
        }
        setStep(2);
        setLoading(false);
      }, 800);
    } 
    // Step 2: Simulate OTP Verification
    else if (step === 2) {
      setTimeout(() => {
        if (otp === "1234") {
          // Fake successful login: Save to local storage
          localStorage.setItem("buildx_user", JSON.stringify({ 
            phone: phoneno, 
            role: "BUILDER",
            loggedInAt: new Date().toISOString()
          }));
          
          console.log("Sign in successful!");
          // Redirect to the dashboard
          window.location.href = '/dashboard';
        } else {
          setError("Invalid OTP. For this demo, please use 1234.");
          setLoading(false);
        }
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col items-center justify-center relative overflow-hidden p-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        
        body { 
          font-family: 'Inter', sans-serif; 
        }
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.3s; opacity: 0; }
        .delay-300 { animation-delay: 0.5s; opacity: 0; }
        
        .glass-panel {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      {/* Background Image Layer - Faded Industrial Building */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2400&auto=format&fit=crop" 
          alt="Industrial architecture background" 
          className="w-full h-full object-cover filter grayscale opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white"></div>
      </div>

      {/* Logo / Back to Home */}
      <div className="absolute top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-20">
        <div className="flex items-center gap-3 text-gray-900 animate-fade-in-up delay-100">
          <div className="w-8 h-8 border-2 border-gray-900 rotate-45 flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
          </div>
          <span className="text-lg font-bold tracking-tight">BuildX</span>
        </div>
        <a href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 animate-fade-in-up delay-100">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </a>
      </div>

      {/* Main Sign In Card */}
      <main className="relative z-10 w-full max-w-md animate-fade-in-up delay-200">
        <div className="glass-panel rounded-3xl p-8 md:p-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-medium mb-3 tracking-tight">
              {step === 1 ? "Site Access" : "Verify OTP"}
            </h1>
            <p className="text-gray-500 text-sm font-light">
              {step === 1 
                ? "Enter your mobile number to access the dashboard." 
                : `We sent a 4-digit code to ${phoneno}`}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {step === 1 ? (
              /* Phone Number Input */
              <div>
                <label className="block text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <input 
                    type="tel" 
                    value={phoneno}
                    onChange={(e) => setPhoneno(e.target.value)}
                    required
                    placeholder="99999 00000"
                    className="w-full pl-12 pr-4 py-3.5 bg-white/60 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
                  />
                </div>
              </div>
            ) : (
              /* OTP Input */
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-medium text-gray-600 uppercase tracking-wider">
                    One-Time Password
                  </label>
                  <button 
                    type="button" 
                    onClick={() => { setStep(1); setOtp(""); setError(null); }}
                    className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Change Number
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <input 
                    type="text"
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    required
                    placeholder="1234"
                    className="w-full pl-12 pr-4 py-3.5 bg-white/60 border border-gray-200 rounded-xl text-gray-900 text-lg tracking-[0.5em] placeholder-gray-300 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Error Message Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2 animate-fade-in-up">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full bg-gray-900 text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-3 hover:bg-gray-700 transition-all duration-300 shadow-sm ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {step === 1 ? 'Sending...' : 'Verifying...'}
                </>
              ) : (
                <>
                  {step === 1 ? 'Get OTP' : 'Verify & Sign In'}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </>
              )}
            </button>

          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center text-sm text-gray-500">
            Having trouble logging in?{" "}
            <a href="/contact" className="font-medium text-gray-900 hover:underline">
              Contact Support
            </a>
          </div>

        </div>
        
        {/* Trusted By Microcopy */}
        <p className="text-center text-xs text-gray-400 mt-8 animate-fade-in-up delay-300">
          Internal field access. Unauthorized usage is logged.
        </p>
      </main>

    </div>
  );
}