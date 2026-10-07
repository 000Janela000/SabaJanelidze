import type { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * Contact form handler: emails each message to Saba through Resend (https://resend.com).
 *
 * Needs the RESEND_API_KEY environment variable in Vercel: a send-only key for the
 * verified domain sabajanelidze.com. The email comes from contact@sabajanelidze.com
 * with Reply-To set to the visitor, so answering is just "Reply".
 */

const TO = 'ssjanelidze@gmail.com'
const FROM = 'Portfolio contact <contact@sabajanelidze.com>'

const projectTypeLabels: Record<string, string> = {
  fintech: 'Fintech / Crypto Product',
  web: 'Web Platform',
  mobile: 'Mobile App',
  fullstack: 'Full-Stack Product',
  other: 'Other',
}

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

const field = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = req.body ?? {}

  // "company" is a hidden field people never see. Bots fill it in: pretend it worked, send nothing.
  if (field(body.company, 200)) {
    return res.status(200).json({ success: true })
  }

  const name = field(body.name, 100).replace(/[\r\n]+/g, ' ')
  const email = field(body.email, 254)
  const description = field(body.description, 5000)
  const projectType = projectTypeLabels[field(body.projectType, 20)] ?? 'Other'

  // Validate required fields
  if (!name || !email || !description) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('Contact form: RESEND_API_KEY is not set')
    return res.status(500).json({ error: 'Failed to send. Please email ssjanelidze@gmail.com directly.' })
  }

  const text = `From: ${name} <${email}>\nType: ${projectType}\n\n${description}\n`
  const html =
    `<p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>` +
    `<p><strong>Type:</strong> ${escapeHtml(projectType)}</p>` +
    `<p><strong>Message:</strong></p><p>${escapeHtml(description).replace(/\n/g, '<br>')}</p>`

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `New enquiry from ${name} (${projectType})`,
        text,
        html,
      }),
    })

    if (!response.ok) {
      console.error('Contact form: Resend error', response.status, await response.text())
      return res.status(502).json({ error: 'Failed to send. Please email ssjanelidze@gmail.com directly.' })
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Contact form: send failed', error)
    return res.status(500).json({ error: 'Failed to send. Please email ssjanelidze@gmail.com directly.' })
  }
}
