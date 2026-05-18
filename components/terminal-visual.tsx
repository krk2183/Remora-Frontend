"use client"

import { useEffect, useState } from "react"

const driftingLines = [
  { text: "agent: Analyzing codebase structure...", type: "info" },
  { text: "agent: Found 847 files to process", type: "info" },
  { text: "agent: Reading package.json dependencies", type: "info" },
  { text: "agent: Wait, let me reconsider the architecture", type: "drift" },
  { text: "agent: Actually, should we use a different framework?", type: "drift" },
  { text: "agent: Let me re-read all 847 files again...", type: "drift" },
  { text: "agent: Hmm, what if we refactored everything?", type: "drift" },
  { text: "tokens: 127,482 consumed ↑↑↑", type: "error" },
]

const cleanLines = [
  { text: "agent: Analyzing codebase structure...", type: "info" },
  { text: "agent: Found 847 files to process", type: "info" },
  { text: "remora: Drift detected → Injecting constraint", type: "success" },
  { text: "agent: Task complete. 3 files modified.", type: "info" },
  { text: "tokens: 2,847 consumed ✓", type: "success" },
]

export function TerminalVisual() {
  const [visibleDrift, setVisibleDrift] = useState(0)
  const [visibleClean, setVisibleClean] = useState(0)

  useEffect(() => {
    const driftInterval = setInterval(() => {
      setVisibleDrift(prev => (prev < driftingLines.length ? prev + 1 : prev))
    }, 600)

    const cleanInterval = setInterval(() => {
      setVisibleClean(prev => (prev < cleanLines.length ? prev + 1 : prev))
    }, 800)

    return () => {
      clearInterval(driftInterval)
      clearInterval(cleanInterval)
    }
  }, [])

  const getLineColor = (type: string) => {
    switch (type) {
      case "info": return "text-muted-foreground"
      case "drift": return "text-amber-500/80"
      case "error": return "text-red-400"
      case "success": return "text-emerald-400"
      default: return "text-muted-foreground"
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Without Remora */}
      <div className="relative overflow-hidden rounded-lg border border-border/50 bg-card">
        <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/70" />
            <div className="h-3 w-3 rounded-full bg-amber-500/70" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/70" />
          </div>
          <span className="ml-2 font-mono text-xs text-muted-foreground">without-remora.log</span>
        </div>
        <div className="h-[200px] overflow-hidden p-4 font-mono text-xs leading-relaxed">
          {driftingLines.slice(0, visibleDrift).map((line, i) => (
            <div 
              key={i} 
              className={`${getLineColor(line.type)} transition-opacity duration-300`}
            >
              <span className="text-muted-foreground/50 select-none">{String(i + 1).padStart(2, " ")} </span>
              {line.text}
            </div>
          ))}
          {visibleDrift >= driftingLines.length && (
            <div className="mt-2 animate-pulse text-muted-foreground/50">
              <span className="text-muted-foreground/50 select-none">{String(driftingLines.length + 1).padStart(2, " ")} </span>
              agent: Still thinking...
            </div>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
      </div>

      {/* With Remora */}
      <div className="relative overflow-hidden rounded-lg border border-emerald-500/20 bg-card">
        <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/70" />
            <div className="h-3 w-3 rounded-full bg-amber-500/70" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/70" />
          </div>
          <span className="ml-2 font-mono text-xs text-muted-foreground">with-remora.log</span>
          <span className="ml-auto rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-400">
            Protected
          </span>
        </div>
        <div className="h-[200px] overflow-hidden p-4 font-mono text-xs leading-relaxed">
          {cleanLines.slice(0, visibleClean).map((line, i) => (
            <div 
              key={i} 
              className={`${getLineColor(line.type)} transition-opacity duration-300`}
            >
              <span className="text-muted-foreground/50 select-none">{String(i + 1).padStart(2, " ")} </span>
              {line.text}
            </div>
          ))}
          {visibleClean >= cleanLines.length && (
            <div className="mt-2 text-muted-foreground/50">
              <span className="text-muted-foreground/50 select-none">{String(cleanLines.length + 1).padStart(2, " ")} </span>
              <span className="animate-pulse">_</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
