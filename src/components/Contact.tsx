
import type { ReactElement } from 'react';
export const Contact = (): ReactElement => {
  return (
    <section
      id="contact"
      className="relative py-28 sm:py-40 bg-gray-50 dark:bg-zinc-950 overflow-hidden"
    >
      {/* Decorative Floating Blobs (Aesthetic) */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-600 dark:to-amber-800 rounded-full opacity-10 animate-blob-1 pointer-events-none filter blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-bl from-purple-400 to-purple-600 dark:from-purple-600 dark:to-purple-800 rounded-full opacity-10 animate-blob-2 pointer-events-none filter blur-3xl"></div>
      <div className="absolute top-1/4 left-1/4 w-60 h-60 bg-gradient-to-tr from-sky-400 to-sky-600 dark:from-sky-600 dark:to-sky-800 rounded-full opacity-10 animate-blob-3 pointer-events-none filter blur-3xl"></div>

      {/* Main Content Container */}
      <div className="relative container mx-auto px-6 lg:px-12 z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight drop-shadow-lg">
            Connect With Us
          </h2>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 font-medium max-w-2xl mx-auto">
            Reach out for custom art inquiries, collaborations, or any questions about our collection. We're here to help you find the perfect piece.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-16 justify-center items-start">
          {/* Instagram Card */}
          <a
            href="https://www.instagram.com/abubakar.arts"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center p-8 rounded-3xl bg-white/60 dark:bg-zinc-800/60 shadow-lg border border-gray-200 dark:border-zinc-700 hover:shadow-2xl hover:scale-105 transition-all duration-500 backdrop-blur-xl transform-gpu overflow-hidden"
          >
            {/* Card Hover Effect */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="p-6 rounded-full shadow-md transition-all duration-500 transform group-hover:-translate-y-1">
                {/* Real Instagram Logo with Gradient */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  viewBox="0 0 48 48"
                >
                  <defs>
                    <linearGradient id="igGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#833ab4" />
                      <stop offset="30%" stopColor="#fd1d1d" />
                      <stop offset="60%" stopColor="#fcb045" />
                    </linearGradient>
                  </defs>
                  <rect width="48" height="48" rx="12" fill="url(#igGradient)" />
                  <path
                    d="M24 15.6c-4.63 0-8.4 3.77-8.4 8.4s3.77 8.4 8.4 8.4 8.4-3.77 8.4-8.4-3.77-8.4-8.4-8.4zm0 13.6c-2.82 0-5.2-2.38-5.2-5.2s2.38-5.2 5.2-5.2 5.2 2.38 5.2 5.2-2.38 5.2-5.2 5.2zm8.8-12.8c-1.32 0-2.4-1.08-2.4-2.4s1.08-2.4 2.4-2.4 2.4 1.08 2.4 2.4-1.08 2.4-2.4 2.4z"
                    fill="white"
                  />
                  <circle cx="32.8" cy="15.2" r="2.4" fill="white" />
                  <rect
                    x="8"
                    y="8"
                    width="32"
                    height="32"
                    rx="12"
                    stroke="white"
                    strokeWidth="2.5"
                    fill="none"
                  />
                </svg>
              </div>
              <span className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white transition-colors duration-500 group-hover:text-amber-500">
                @abubakar.arts
              </span>
            </div>
          </a>

          {/* Phone Card */}
          <a
            href="tel:+92328818275"
            className="group relative flex flex-col items-center p-8 rounded-3xl bg-white/60 dark:bg-zinc-800/60 shadow-lg border border-gray-200 dark:border-zinc-700 hover:shadow-2xl hover:scale-105 transition-all duration-500 backdrop-blur-xl transform-gpu overflow-hidden"
          >
            {/* Card Hover Effect */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="p-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-md group-hover:from-amber-500 group-hover:to-amber-700 transition-all duration-500 transform group-hover:-translate-y-1">
                {/* Premium Phone Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                </svg>
              </div>
              <span className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white transition-colors duration-500 group-hover:text-amber-500">
                +92 328818275
              </span>
            </div>
          </a>
        </div>
      </div>
      
      {/* Styles for the decorative blob animations */}
      <style>{`
        @keyframes blob-1 {
          0%, 100% { transform: translate(0, 0) scale(1.1); }
          33% { transform: translate(50px, -50px) scale(1.2); }
          66% { transform: translate(-30px, 30px) scale(1.0); }
        }
        @keyframes blob-2 {
          0%, 100% { transform: translate(0, 0) scale(1.0); }
          33% { transform: translate(-40px, 40px) scale(1.15); }
          66% { transform: translate(60px, -20px) scale(1.2); }
        }
        @keyframes blob-3 {
          0%, 100% { transform: translate(0, 0) scale(1.2); }
          33% { transform: translate(20px, 80px) scale(1.1); }
          66% { transform: translate(-50px, -40px) scale(1.05); }
        }
        .animate-blob-1 { animation: blob-1 15s infinite ease-in-out; }
        .animate-blob-2 { animation: blob-2 18s infinite ease-in-out; }
        .animate-blob-3 { animation: blob-3 20s infinite ease-in-out; }
      `}</style>
    </section>
  );
};
