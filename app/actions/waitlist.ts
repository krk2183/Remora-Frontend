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
    // 1. Insert into Supabase
    const { error } = await supabase.from('waitlist').insert({ email });

    if (error) {
      console.error('Waitlist submission error:', error);
      if (error.code === '23505') return { error: 'This email is already on the list.' };
      return { error: 'Database connection failed. Try again.' };
    }

    // 2. Database write succeeded! Fire confirmation email.
    try {
      await resend.emails.send({
        from: 'Remora <onboarding@resend.dev>', 
        to: [email],
        subject: '[Remora] Private Beta Access Requested',
        html: `
          <div style="font-family: monospace; background-color: #09090b; color: #e4e4e7; padding: 32px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #ffffff; font-size: 20px; font-weight: bold; tracking: -0.05em; margin-bottom: 24px;">System: You are all set!</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #a1a1aa;">Thank you for your interest in Remora.</p>
            <p style="font-size: 14px; line-height: 1.6; color: #a1a1aa;">Your request for private beta access has been safely logged in our database.</p>
            <div style="background-color: #18181b; border: 1px solid #27272a; padding: 16px; border-radius: 6px; margin: 24px 0;">
              <code style="color: #34d399; font-size: 12px;">⚡ Status: Queued | Strategy: Automated Loop Disruption</code>
            </div>
            <hr style="border: 0; border-top: 1px solid #27272a; margin: 32px 0;" />
            <p style="font-size: 11px; color: #71717a;">Remora Daemon System • Cloud Circuit Breakers for Autonomous Agents</p>
          </div>
        `
      });
    } catch (emailErr) {
      // Muted error context so database success still propagates if the email service trips
      console.error('Failed to send confirmation email:', emailErr);
    }

    // Explicitly return success inside the try block here
    return { success: true };

  } catch (err) {
    console.error('Unexpected waitlist error:', err);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}