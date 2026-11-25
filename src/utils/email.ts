/**
 * EmailJS delivery for the contact form.
 *
 * Configure in `.env` (see .env.example):
 *   VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
 *
 * The SDK is imported on demand, so it costs nothing until someone actually sends a message.
 */
const config = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim(),
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim(),
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim(),
}

export const isEmailConfigured = Boolean(config.serviceId && config.templateId && config.publicKey)

export interface ContactMessage {
  name: string
  email: string
  subject: string
  message: string
}

/**
 * Variables available in your EmailJS template:
 *   {{from_name}} {{from_email}} {{reply_to}} {{subject}} {{message}} {{sent_at}}
 * (also {{name}} / {{email}} / {{title}} to match EmailJS's default "Contact Us" template)
 */
export async function sendContactEmail(msg: ContactMessage) {
  if (!isEmailConfigured) throw new Error('Email service is not configured.')
  const { default: emailjs, EmailJSResponseStatus } = await import('@emailjs/browser')

  const params = {
    from_name: msg.name,
    from_email: msg.email,
    reply_to: msg.email,
    subject: msg.subject,
    message: msg.message,
    sent_at: new Date().toLocaleString(),
    name: msg.name,
    email: msg.email,
    title: msg.subject,
  }

  try {
    await emailjs.send(config.serviceId!, config.templateId!, params, {
      publicKey: config.publicKey!,
      blockHeadless: true, // drop obvious bot traffic
      limitRate: { id: 'portfolio-contact', throttle: 15_000 }, // one message per 15 s per browser
    })
  } catch (err) {
    // EmailJS rejects with an EmailJSResponseStatus ({ status, text }), not an Error.
    if (err instanceof EmailJSResponseStatus) {
      if (err.status === 429) throw new Error('Please wait a few seconds before sending another message.')
      const text = (err.text || `Email service error (${err.status})`).trim()
      throw new Error(/[.!?]$/.test(text) ? text : `${text}.`)
    }
    throw err instanceof Error ? err : new Error('Network error — please check your connection.')
  }
}
