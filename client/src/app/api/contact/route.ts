import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message || !isValidEmail(String(email))) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_PORT) === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const escapeHtml = (input: string) =>
      input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')

    const safeName = escapeHtml(String(name))
    const safeMessage = escapeHtml(String(message))
    const safeEmail = String(email)

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      subject: `Contact formulier - ${safeName}`,
      text: `${safeMessage}\n\nVan: ${safeName} <${safeEmail}>`,
      html: `<p>${safeMessage.replace(/\n/g, '<br>')}</p><p>Van: <strong>${safeName}</strong> &lt;${safeEmail}&gt;</p>`,
    })

    return NextResponse.json({ ok: true })
  } catch (_err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}


