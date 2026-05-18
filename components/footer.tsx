"use client"

import Image from "next/image"
import logoImg from "./LOGO.png" 

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-zinc-950">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8">
        
        <div className="flex items-center gap-3">
          <Image
            src={logoImg}
            alt="Remora Logo"
            width={20}
            height={20}
            className="rounded object-contain opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <span className="text-xs font-medium text-zinc-400 tracking-tight">
            Remora © {new Date().getFullYear()}
          </span>
        </div>
        
        <p className="text-xs text-zinc-500 font-normal tracking-tight">
          Built for autonomous coding agents.
        </p>
        
      </div>
    </footer>
  )
}