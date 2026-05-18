"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Check, AlertCircle, CornerDownLeft } from "lucide-react"
import { joinWaitlist } from '@/app/actions/waitlist'

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setStatus('loading')

    const res = await joinWaitlist(email)

    if (res?.error) {
      setStatus('error')
      setMessage(res.error)
    } else {
      setStatus('success')
      setMessage("You're locked in. We'll reach out soon.")
      setEmail('')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (status !== 'idle') {
      setStatus('idle')
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative flex flex-col gap-3 sm:flex-row shadow-2xl shadow-black/50 rounded-xl">
        <div className="relative flex-1 group">
          <Input
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={handleInputChange}
            disabled={status === 'loading'}
            className="h-12 border-white/10 bg-white/5 backdrop-blur-md px-4 pr-12 text-zinc-100 placeholder:text-zinc-500 focus:border-white/20 focus:bg-white/10 transition-all duration-300"
          />
          {/* Subtle Enter key hint for developers */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hidden group-focus-within:flex items-center">
            <CornerDownLeft className="h-4 w-4" />
          </div>
        </div>
        <Button
          type="submit"
          disabled={status === 'loading' || !email}
          className="h-12 min-w-[140px] bg-white text-black hover:bg-zinc-200 transition-colors duration-300 disabled:opacity-50 font-medium tracking-tight"
        >
          {status === 'loading' ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Join Waitlist"
          )}
        </Button>
      </div>

      {/* Animated Feedback Box */}
      {(status === 'success' || status === 'error') && (
        <div className={`mt-4 flex items-center gap-3 rounded-lg border px-4 py-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
          status === 'success'
            ? 'border-emerald-500/20 bg-emerald-500/10'
            : 'border-red-500/20 bg-red-500/10'
        }`}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 backdrop-blur-md">
            {status === 'success' ? (
              <Check className="h-4 w-4 text-emerald-400" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-400" />
            )}
          </div>
          <p className={`text-sm font-medium tracking-tight ${
            status === 'success' ? 'text-emerald-300' : 'text-red-300'
          }`}>
            {message}
          </p>
        </div>
      )}
    </form>
  )
}