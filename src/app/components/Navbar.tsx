'use client'

import Link from 'next/link'
import { Search, Heart, ShoppingBag, Menu } from 'lucide-react'
import { useCartStore } from '@/app/store/cartStore'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const itemCount = useCartStore((state) => state.itemCount())
  const { data: session } = useSession()

  return (
    // Updated background to Grey Neon gradient with a subtle neon border
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-zinc-900 via-slate-800 to-zinc-900 border-b border-amber-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo - Soft Gold */}
          <Link href="/" className="text-2xl font-serif font-bold text-amber-200 tracking-wide hover:text-amber-100 transition">
            ERAYA RATNA
          </Link>

          {/* Links - Soft Gold text */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link href="/" className="text-amber-200/90 hover:text-amber-400 transition font-medium">Home</Link>
            <Link href="/about" className="text-amber-200/90 hover:text-amber-400 transition font-medium">About Us</Link>
            <Link href="/shop" className="text-amber-200/90 hover:text-amber-400 transition font-medium">Products</Link>
          </nav>

          {/* Icons - Soft Gold */}
          <div className="flex items-center space-x-6">
            <button className="text-amber-200/90 hover:text-amber-400 transition transform hover:scale-110">
              <Search size={20} />
            </button>
            <button className="text-amber-200/90 hover:text-amber-400 transition transform hover:scale-110 relative">
              <Heart size={20} />
            </button>
            
            <Link href="/cart" className="text-amber-200/90 hover:text-amber-400 transition transform hover:scale-110 relative">
              <ShoppingBag size={22} />
              {itemCount > 0 && (
                // Badge matches the gold theme
                <span className="absolute -top-1 -right-2 bg-amber-500 text-zinc-900 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Auth / Login - Soft Gold */}
            <div className="hidden md:block border-l border-amber-500/30 pl-6">
              {session ? (
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-amber-200/90 hover:text-rose-400 text-sm font-medium transition"
                >
                  Logout
                </button>
              ) : (
                <Link href="/login" className="text-amber-200/90 hover:text-amber-400 text-sm font-medium transition">
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden text-amber-200">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}