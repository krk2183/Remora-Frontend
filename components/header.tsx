"use client"

import Link from "next/link"
import Image from "next/image"
import { Github } from "lucide-react"
import logoImg from "./LOGO.png" // Direct relative import from the same directory

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md selection:bg-white/10">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        
        {/* Logo Section with imported components/LOGO.png */}
        <Link href="/" className="flex items-center gap-3 group tracking-tighter">
          <Image
            src={logoImg}
            alt="Remora Logo"
            width={28}  // Increased size slightly to match the bigger header context
            height={28}
            className="rounded-md object-contain transition-transform duration-300 group-hover:scale-105"
            priority // Forces Next.js to load the logo instantly without lazy layout shift
          />
          <span className="text-xl font-bold text-white tracking-tighter">
            Remora
          </span>
        </Link>

        {/* High-Contrast Navigation Items */}
        <nav className="flex items-center gap-8">
          <Link 
            href="#features" 
            className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            Features
          </Link>
          <Link 
            href="#how-it-works" 
            className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            How it works
          </Link>
          
          <div className="h-4 w-[1px] bg-white/10" aria-hidden="true" />

          {/* High-Contrast GitHub Link */}
          <Link
            href="https://github.com/krk2183/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-300 bg-white/5 transition-all hover:border-white/20 hover:text-white hover:bg-white/10"
          >
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}