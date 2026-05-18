import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema, type ContactFormData } from '@/lib/contact-schema';

// ─── Rate limiting (in-memory, resets on cold start) ─────────────────────────

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3_600_000 });
    return false;
  }
  if (entry.count >= 5) return true;
  entry.count += 1;
  return false;
}

// ─── Email HTML builder ───────────────────────────────────────────────────────

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const serviceLabels: Record<string, string> = {
  mantenimiento: 'Mantenimiento',
  montaje: 'Montaje',
  'puesta-en-marcha': 'Puesta en marcha',
  alineacion: 'Alineación',
  asesoria: 'Asesoría técnica',
  suministros: 'Suministros',
  integral: 'Propuesta integral',
  otro: 'Otro',
};

const plantLabels: Record<string, string> = {
  hidro: 'Hidroeléctrica',
  vapor: 'Térmica de vapor',
  gas: 'Térmica de gas',
  mixta: 'Mixta',
  otra: 'Otra',
};

function row(label: string, value: string | undefined): string {
  if (!value) return '';
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;vertical-align:top;width:38%;padding-right:16px;">
        <span style="font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">${label}</span>
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;vertical-align:top;">
        <span style="font-size:14px;color:#0f172a;line-height:1.6;">${esc(value)}</span>
      </td>
    </tr>`;
}

function buildEmailHtml(data: ContactFormData): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:20px;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" role="presentation"
             style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#0A1F44;padding:28px 32px;">
            <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;font-family:Arial,sans-serif;">NRG Ingeniería</p>
            <p style="margin:6px 0 0;font-size:12px;color:#E89F3C;letter-spacing:0.1em;text-transform:uppercase;">Nueva solicitud de contacto</p>
          </td>
        </tr>
        <!-- Accent line -->
        <tr><td style="background:#E89F3C;height:3px;font-size:0;line-height:0;">&nbsp;</td></tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              ${row('Nombre', data.fullName)}
              ${row('Empresa', data.company)}
              ${row('Cargo', data.position)}
              ${row('Email', data.email)}
              ${row('Teléfono', data.phone)}
              ${row('País', data.country)}
              ${row('Servicio requerido', serviceLabels[data.serviceType] ?? data.serviceType)}
              ${row('Tipo de central', plantLabels[data.plantType] ?? data.plantType)}
            </table>

            <!-- Message block -->
            <div style="margin-top:24px;background:#f8fafc;border-left:3px solid #E89F3C;padding:16px 20px;border-radius:0 6px 6px 0;">
              <p style="margin:0 0 8px;font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Descripción / Mensaje</p>
              <p style="margin:0;font-size:14px;color:#0f172a;line-height:1.7;white-space:pre-wrap;">${esc(data.message)}</p>
            </div>

            <!-- Reply CTA -->
            <div style="margin-top:28px;text-align:center;">
              <a href="mailto:${esc(data.email)}"
                 style="display:inline-block;background:#E89F3C;color:#0A1F44;font-weight:700;font-size:14px;padding:12px 28px;border-radius:8px;text-decoration:none;">
                Responder a ${esc(data.fullName)}
              </a>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:16px 32px;">
            <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.5;">
              Generado automáticamente desde el formulario de contacto de nrg-ingenieria.com<br>
              Para responder, usa el botón de arriba o escribe directamente a ${esc(data.email)}.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed.', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const emailTo = process.env.CONTACT_EMAIL_TO;
  const emailFrom = process.env.CONTACT_EMAIL_FROM ?? 'onboarding@resend.dev';

  if (!apiKey || !emailTo) {
    console.error('[contact] Missing RESEND_API_KEY or CONTACT_EMAIL_TO');
    return NextResponse.json(
      { error: 'Email service not configured on the server.' },
      { status: 500 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      replyTo: data.email,
      subject: `[NRG] Nueva solicitud — ${data.fullName} · ${data.company}`,
      html: buildEmailHtml(data),
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] Resend error:', err);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
