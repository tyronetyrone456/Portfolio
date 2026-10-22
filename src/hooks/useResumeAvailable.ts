import { useEffect, useState } from 'react'
import { site } from '@/data/site'

export type ResumeStatus = 'checking' | 'available' | 'missing'

let pending: Promise<boolean> | null = null

/** One shared check: the file must exist and actually be a PDF (dev servers answer 200 with HTML). */
function checkResume(): Promise<boolean> {
  pending ??= fetch(site.resume.path, { method: 'HEAD' })
    .then((res) => res.ok && (res.headers.get('content-type') ?? '').includes('pdf'))
    .catch(() => false)
  return pending
}

export function useResumeStatus(): ResumeStatus {
  const [status, setStatus] = useState<ResumeStatus>('checking')

  useEffect(() => {
    let cancelled = false
    checkResume().then((ok) => {
      if (!cancelled) setStatus(ok ? 'available' : 'missing')
    })
    return () => {
      cancelled = true
    }
  }, [])

  return status
}
