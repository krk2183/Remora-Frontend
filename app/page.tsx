import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TerminalVisual } from "@/components/terminal-visual"
import { FeatureGrid } from "@/components/feature-grid"
import { WaitlistForm } from "@/components/waitlist-form"
import { ArrowRight, Brain, Database, GitCommit } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-white/10 selection:text-black">
      <Header />
      
      {/* Hero Section */}
      <main className="pt-16 relative z-10">
        <section className="relative overflow-hidden">
          
          {/* Subtle grid background - SAFE FROM CLICK INTERFERENCE */}
          <div 
            className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none z-0"
            aria-hidden="true"
          />
          
          {/* Decorative Premium Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none z-0" />
          
          <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-32 z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-zinc-400">Now in private beta</span>
            </div>
            
            {/* Scaled Heading Grid */}
            <h1 className="mb-6 max-w-4xl text-balance text-5xl font-bold tracking-tighter text-white md:text-6xl lg:text-7xl leading-[1.05]">
              Stop the infinite loop.
              <br />
              <span className="text-zinc-500">Ship the actual feature.</span>
            </h1>
            
            {/* High-Readability Hero Paragraph */}
            <p className="mb-10 max-w-3xl text-pretty text-xl leading-relaxed text-zinc-400 md:text-2xl font-normal tracking-tight">
              Remora is a cloud circuit breaker that eliminates token drain and context poisoning in autonomous coding agents. One webhook. Zero drift.
            </p>
            
            {/* High explicit stacking order for form interaction targets */}
            <div className="mb-16 relative z-50">
              <WaitlistForm />
            </div>
            
            {/* Terminal Visual */}
            <TerminalVisual />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="border-t border-white/5 bg-white/[0.01] relative z-10">
          <div className="mx-auto max-w-5xl px-6 py-20 md:py-24">
            <div className="mb-12 max-w-xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">
                Features
              </p>
              <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
                Guardrails for the agentic future
              </h2>
              <p className="text-pretty text-lg text-zinc-400">
                Your AI agents are powerful. But without constraints, they wander. Remora keeps them on track.
              </p>
            </div>
            
            <FeatureGrid />
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="border-t border-white/5 relative z-10">
          <div className="mx-auto max-w-5xl px-6 py-20 md:py-24">
            <div className="mb-12 max-w-xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">
                How it works
              </p>
              <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
                Three steps to protected agents
              </h2>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  step: "01",
                  icon: GitCommit,
                  title: "Connect your repo",
                  description: "Add the Remora webhook to your GitHub repository. Takes 30 seconds.",
                },
                {
                  step: "02",
                  icon: Brain,
                  title: "Agent runs as usual",
                  description: "Your coding agent works normally. Remora monitors commit patterns and context signals.",
                },
                {
                  step: "03",
                  icon: Database,
                  title: "Drift detected & blocked",
                  description: "When context drift begins, Remora injects negative constraints to bring the agent back on track.",
                },
              ].map((item, i) => (
                <div key={i} className="relative group border border-white/5 bg-white/[0.01] p-6 rounded-xl hover:border-white/10 transition-all duration-300">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-zinc-600">{item.step}</span>
                  </div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                    <item.icon className="h-5 w-5 text-zinc-300" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="border-t border-white/5 bg-white/[0.01] relative z-10">
          <div className="mx-auto max-w-5xl px-6 py-20 md:py-24">
            <div className="rounded-xl border border-white/5 bg-zinc-900/50 backdrop-blur-md p-8 md:p-12 shadow-2xl">
              <div className="mx-auto max-w-2xl text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">
                  Coming Soon
                </p>
                <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Persistent memory for web users
                </h2>
                <p className="mb-8 text-pretty text-zinc-400 text-lg">
                  Beyond agents—Remora will soon push context to ChatGPT and Gemini memory for web users. Your conversations, always in sync.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <div className="rounded-full border border-white/5 bg-white/5 px-4 py-2 text-sm text-zinc-400">
                    ChatGPT Memory
                  </div>
                  <div className="rounded-full border border-white/5 bg-white/5 px-4 py-2 text-sm text-zinc-400">
                    Gemini Memory
                  </div>
                  <div className="rounded-full border border-white/5 bg-white/5 px-4 py-2 text-sm text-zinc-400">
                    Cross-Session Context
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/5 relative z-10 mb-12">
          <div className="mx-auto max-w-5xl px-6 py-20 md:py-24">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
                Ready to stop the drift?
              </h2>
              <p className="mb-8 text-pretty text-zinc-400">
                Join the waitlist and be first to protect your autonomous agents.
              </p>
              <div className="flex justify-center relative z-50">
                <WaitlistForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}