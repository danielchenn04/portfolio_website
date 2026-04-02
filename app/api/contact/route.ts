import { Resend }                      from 'resend';
import { z }                           from 'zod';
import { NextRequest, NextResponse }   from 'next/server';

// ── In-memory rate limiter (3 submissions / IP / 10 min) ─────────────────────
// Module-level state: persists across requests within the same serverless
// function instance. Acceptable for low-traffic portfolio use.
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT   = 3;
const WINDOW_MS    = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now    = Date.now();
  const prev   = rateLimitMap.get(ip) ?? [];
  const recent = prev.filter(t => now - t < WINDOW_MS);
  if (recent.length >= RATE_LIMIT) return true;
  rateLimitMap.set(ip, [...recent, now]);
  return false;
}

// ── Validation schema ─────────────────────────────────────────────────────────
const ContactSchema = z.object({
  name:     z.string().min(1, 'Name is required.').max(100),
  email:    z.string().email('Please enter a valid email address.'),
  message:  z.string().min(1, 'Message is required.').max(5000),
  honeypot: z.string().optional(),
});

// ── POST /api/contact ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Determine client IP (Vercel passes it in x-forwarded-for)
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a few minutes before trying again.' },
      { status: 429 },
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Validate fields
  const result = ContactSchema.safeParse(body);
  if (!result.success) {
    const message = result.error.issues[0]?.message ?? 'Invalid input.';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const { name, email, message, honeypot } = result.data;

  // Honeypot check — silently discard spam (return 200 so bots don't retry)
  if (honeypot) {
    return NextResponse.json({ success: true });
  }

  // Send via Resend
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from:    process.env.CONTACT_FROM_EMAIL ?? '',
    to:      process.env.CONTACT_TO_EMAIL   ?? '',
    subject: `Portfolio contact from ${name}`,
    text:    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });

  if (error) {
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}

// Reject all non-POST methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
