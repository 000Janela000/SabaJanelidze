import { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * Form submission handler
 *
 * SETUP INSTRUCTIONS:
 * 1. Install Resend (easiest option):
 *    npm install resend
 *
 * 2. Get API key from https://resend.com and add to Vercel env:
 *    RESEND_API_KEY=re_xxxxx
 *
 * 3. Uncomment the Resend implementation below
 *
 * Alternative: Use SendGrid, Mailgun, or your own SMTP server
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, description, projectType } = req.body

  // Validate required fields
  if (!name || !email || !description || !projectType) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  const projectTypeLabels: Record<string, string> = {
    mobile: 'Mobile App',
    web: 'Web Platform',
    ai: 'AI/ML Product',
    design: 'Design System',
    other: 'Other',
  }

  try {
    // TODO: Uncomment one of the email service implementations below

    // OPTION 1: Resend (recommended)
    /*
    import { Resend } from 'resend'
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'noreply@yourdomain.com',
      to: email,
      subject: 'Thanks for reaching out!',
      html: `<p>Hi ${name},</p><p>I received your message and will get back to you within 24 hours.</p>`,
    })

    await resend.emails.send({
      from: 'noreply@yourdomain.com',
      to: 'saba@janelidze.dev',
      subject: `New inquiry from ${name}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p><strong>Type:</strong> ${projectTypeLabels[projectType]}</p><p><strong>Message:</strong></p><p>${description.replace(/\n/g, '<br>')}</p>`,
    })
    */

    // OPTION 2: SendGrid
    /*
    import sgMail from '@sendgrid/mail'
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

    await sgMail.send({
      to: email,
      from: 'noreply@yourdomain.com',
      subject: 'Thanks for reaching out!',
      html: `<p>Hi ${name},</p><p>I received your message and will get back to you within 24 hours.</p>`,
    })

    await sgMail.send({
      to: 'saba@janelidze.dev',
      from: 'noreply@yourdomain.com',
      subject: `New inquiry from ${name}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p><strong>Type:</strong> ${projectTypeLabels[projectType]}</p><p><strong>Message:</strong></p><p>${description.replace(/\n/g, '<br>')}</p>`,
    })
    */

    // For now, log to Vercel logs (you can see this in Vercel dashboard)
    console.log('Form submission received:', {
      name,
      email,
      projectType: projectTypeLabels[projectType],
      timestamp: new Date().toISOString(),
    })

    return res.status(200).json({
      success: true,
      message: 'Message received. You will be contacted within 24 hours.'
    })
  } catch (error) {
    console.error('Form submission error:', error)
    return res.status(500).json({
      error: 'Failed to process form submission. Please try emailing directly.'
    })
  }
}
