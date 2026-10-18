export interface ContactValues {
  name: string
  email: string
  subject: string
  message: string
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>

export const LIMITS = { name: 80, email: 120, subject: 120, message: 2000 } as const

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  const name = values.name.trim()
  const subject = values.subject.trim()
  const message = values.message.trim()

  if (name.length < 2) errors.name = 'Please enter your name (at least 2 characters).'
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (subject.length < 3) errors.subject = 'Please add a short subject (at least 3 characters).'
  if (message.length < 10) errors.message = 'Your message needs at least 10 characters.'
  return errors
}
