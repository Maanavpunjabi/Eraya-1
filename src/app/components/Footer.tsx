import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-zinc-900 via-slate-800 to-black text-amber-200/90 pt-16 pb-10">
      {/* Top decorative line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mb-12" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Brand + Story */}
          <div className="space-y-6">
            <h3 className="text-3xl font-serif font-bold text-amber-500 tracking-wide">
              ERAYA RATNA
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm max-w-xs">
              Handcrafted luxury jewelry inspired by timeless elegance and the natural energy of crystals.
            </p>
            <div className="flex items-center gap-3 text-amber-500 text-sm">
              <span className="text-xl">✦</span>
              <span>Crafted with love in India</span>
              <span className="text-xl">✦</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="text-lg font-medium text-white mb-6 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-500 transition-colors duration-300 flex items-center gap-2">
                  <span className="text-amber-500 opacity-70">→</span> Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-500 transition-colors duration-300 flex items-center gap-2">
                  <span className="text-amber-500 opacity-70">→</span> About Us
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-amber-500 transition-colors duration-300 flex items-center gap-2">
                  <span className="text-amber-500 opacity-70">→</span> Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-5">
            <h4 className="text-lg font-medium text-white mb-6 uppercase tracking-wider">
              Policies
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/shipping" className="hover:text-amber-500 transition-colors duration-300 flex items-center gap-2">
                  <span className="text-amber-500 opacity-70">→</span> Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-amber-500 transition-colors duration-300 flex items-center gap-2">
                  <span className="text-amber-500 opacity-70">→</span> Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-amber-500 transition-colors duration-300 flex items-center gap-2">
                  <span className="text-amber-500 opacity-70">→</span> Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social + Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-medium text-amber-100 mb-6 uppercase tracking-wider">
              Connect With Us
            </h4>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-amber-200/90 transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={28} strokeWidth={1.5} />
              </a>

              <a
                href="#"
                className="text-gray-400 hover:text-amber-200/90 transition-all duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={28} strokeWidth={1.5} />
              </a>

              <a
                href="#"
                className="text-gray-400 hover:text-amber-200/90 transition-all duration-300 transform hover:scale-110"
                aria-label="Pinterest"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0" />
                  <path d="M12 16v6" />
                  <path d="M12 2a10 10 0 0 0-10 10c0 4.27 2.67 7.9 6.44 9.34.04-.74.08-1.67.16-2.4l.46-1.93s-.12-.23-.12-.58c0-.54.32-.95.71-.95.33 0 .5.25.5.55 0 .34-.21.84-.33 1.3-.09.38.19.7.56.7.68 0 1.14-.87 1.14-1.9 0-.78-.52-1.37-1.5-1.37-1.1 0-1.8.82-1.8 1.74 0 .31.09.53.23.67l-.34 1.28c-.11-.42-.2-.84-.2-1.3 0-1.83 1.5-3.53 4.04-3.53 2.12 0 3.52 1.53 3.52 3.19 0 2.24-1.25 3.84-3.1 3.84-.63 0-1.21-.34-1.42-.73l-.38 1.48c-.14.52-.41 1.04-.64 1.41A10 10 0 1 0 12 2z" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>

            {/* Small decorative crystals */}
            <div className="flex gap-4 mt-8 opacity-70">
              <span className="text-2xl">💎</span>
              <span className="text-2xl">✧</span>
              <span className="text-2xl">💎</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="mt-16 pt-8 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Eraya Ratna. All rights reserved.</p>
          <p className="mt-2 text-xs opacity-70">
            Crafted with passion • Inspired by nature • Made for you
          </p>
        </div>
      </div>
    </footer>
  );
}