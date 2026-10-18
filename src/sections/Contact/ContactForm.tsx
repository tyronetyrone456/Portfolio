import { useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { CheckCircle2, Send, TriangleAlert } from 'lucide-react'
import { Button } from '@/components/Button/Button'
import { site } from '@/data/site'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/utils'
import { LIMITS, validateContact } from './validate'
import type { ContactErrors, ContactValues } from './validate'

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'success' | 'error'; message: string }

const empty: ContactValues = { name: '', email: '', subject: '', message: '' }

const inputClass =
  'w-full rounded-xl border bg-surface px-4 py-3 text-sm text-fg transition-colors placeholder:text-subtle hover:border-border-strong'

interface FieldProps {
  id: keyof ContactValues
  label: string
  type?: string
  autoComplete?: string
  multiline?: boolean
  value: string
  error?: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

function Field({ id, label, type = 'text', autoComplete, multiline, value, error, onChange }: FieldProps) {
  const errorId = `${id}-error`
  const shared = {
    id,
    name: id,
    value,
    onChange,
    maxLength: LIMITS[id],
    required: true,
    autoComplete,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    className: cn(inputClass, error ? 'border-rose-500' : 'border-border-strong'),
  }

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {multiline ? <textarea rows={5} {...shared} className={cn(shared.className, 'resize-y')} /> : <input type={type} {...shared} />}
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  )
}

function buildMailto(values: ContactValues): string {
  const body = `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`
  const params = new URLSearchParams({ subject: `[Portfolio] ${values.subject.trim()}`, body })
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  return `mailto:${site.contact.email}?${params.toString().replace(/\+/g, '%20')}`
}

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(empty)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const honeypot = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const { toast } = useToast()

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = event.target.name as keyof ContactValues
    setValues((current) => ({ ...current, [key]: event.target.value }))
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    // Bots fill the hidden field; humans never see it. Drop those quietly.
    if (honeypot.current?.value) return

    const found = validateContact(values)
    setErrors(found)
    const firstInvalid = (Object.keys(found) as Array<keyof ContactValues>)[0]
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${firstInvalid}`)?.focus()
      toast('Please fix the highlighted fields.', 'error')
      return
    }

    const { formEndpoint, email } = site.contact

    if (formEndpoint) {
      setStatus({ kind: 'sending' })
      try {
        const response = await fetch(formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        })
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        setValues(empty)
        setStatus({ kind: 'success', message: 'Message sent. Thank you, I will get back to you soon.' })
        toast('Message sent.', 'success')
      } catch {
        setStatus({
          kind: 'error',
          message: 'Your message could not be sent. Please try again in a moment or use another contact method.',
        })
        toast('Message could not be sent.', 'error')
      }
      return
    }

    if (email) {
      window.location.href = buildMailto(values)
      setStatus({
        kind: 'success',
        message:
          'Your email app should open with this message ready. It is only sent once you press Send there.',
      })
      toast('Opening your email app…', 'info')
      return
    }

    setStatus({
      kind: 'error',
      message:
        "Messaging isn't set up on this site yet. Please use one of the profile links instead.",
    })
    toast('Contact form is not connected yet.', 'error')
  }

  const sending = status.kind === 'sending'

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="card space-y-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" autoComplete="name" value={values.name} error={errors.name} onChange={handleChange} />
        <Field id="email" label="Email" type="email" autoComplete="email" value={values.email} error={errors.email} onChange={handleChange} />
      </div>
      <Field id="subject" label="Subject" value={values.subject} error={errors.subject} onChange={handleChange} />
      <Field id="message" label="Message" multiline value={values.message} error={errors.message} onChange={handleChange} />

      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input ref={honeypot} id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" icon={Send} disabled={sending} className="w-full sm:w-auto">
        {sending ? 'Sending…' : 'Send message'}
      </Button>

      <div role="status" aria-live="polite">
        {(status.kind === 'success' || status.kind === 'error') && (
          <p
            className={cn(
              'flex items-start gap-2 rounded-xl border p-3.5 text-sm',
              status.kind === 'success'
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                : 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300',
            )}
          >
            {status.kind === 'success' ? (
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden />
            ) : (
              <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
            )}
            {status.message}
          </p>
        )}
      </div>

      {import.meta.env.DEV && !site.contact.email && !site.contact.formEndpoint && (
        <p className="rounded-lg border border-border bg-surface-2 px-3 py-2 font-mono text-xs text-subtle">
          dev note: set contact.email (mailto fallback) or contact.formEndpoint in src/data/site.ts.
        </p>
      )}
    </form>
  )
}
