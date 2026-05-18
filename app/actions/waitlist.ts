'use server'
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function joinWaitlist(emailOrFormData: string | FormData) {
  const email = typeof emailOrFormData === 'string' 
    ? emailOrFormData 
    : emailOrFormData.get('email') as string;

  if (!email) return { error: 'Email is required.' };
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { error: 'Please enter a valid email address.' };
  }

  try {
    // 1. Log into Supabase database
    const { error } = await supabase.from('waitlist').insert({ email });

    if (error) {
      console.error('Waitlist submission error:', error);
      if (error.code === '23505') return { error: 'This email is already on the list.' };
      return { error: 'Database connection failed. Try again.' };
    }

    // 2. Fire clean confirmation email containing explicit hyperlink parameters
    try {
      await resend.emails.send({
        from: 'Remora <onboarding@resend.dev>', 
        to: [email],
        subject: '🔒 [Remora] Private Beta Access Requested',
        html: `
          <div style="font-family: monospace; background-color: #09090b; color: #e4e4e7; padding: 32px; border-radius: 8px; max-width: 600px; margin: 0 auto; border: 1px solid #27272a;">
            <h2 style="color: #ffffff; font-size: 20px; font-weight: bold; tracking: -0.05em; margin-bottom: 24px;">System: You are all set! </h2>
            <p style="font-size: 14px; line-height: 1.6; color: #a1a1aa;">Thank you for your interest in Remora.</p>
            <p style="font-size: 14px; line-height: 1.6; color: #a1a1aa;">Your request for private beta access has been safely logged in our database. We are strictly limiting initial slots to protect telemetry stability and compute overhead during early daemon scaling nodes.</p>
            
            <div style="background-color: #18181b; border: 1px solid #27272a; padding: 16px; border-radius: 6px; margin: 24px 0;">
              <code style="color: #34d399; font-size: 12px;">⚡ Status: Queued | Strategy: Automated Loop Disruption</code>
            </div>

            <p style="font-size: 14px; line-height: 1.6; color: #a1a1aa;">
              Monitor infrastructure node allocations and read the initial integration specification docs directly on our network interface:
            </p>
            
            
            <p style="margin: 24px 0; font-size: 14px;">
              <a href="https://remora-jade.vercel.app" style="color: #ffffff; background-color: #27272a; border: 1px solid #3f3f46; padding: 10px 18px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
                Launch Remora Dashboard →
              </a>
            </p>

            <p style="font-size: 14px; line-height: 1.6; color: #71717a;">
              Network URL: <a href="https://remora-jade.vercel.app" target="_blank" style="color: #38bdf8; text-decoration: underline; font-weight: 500;">https://remora-jade.vercel.app</a>
            </p>

            <hr style="border: 0; border-top: 1px solid #27272a; margin: 32px 0;" />
            <p style="font-size: 11px; color: #52525b;">Remora Daemon System • Cloud Circuit Breakers for Autonomous Agents</p>
          </div>
        `
      });
    } catch (emailErr) {
      console.error('Failed to send confirmation email:', emailErr);
    }

    return { success: true };

  } catch (err) {
    console.error('Unexpected waitlist error:', err);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}
