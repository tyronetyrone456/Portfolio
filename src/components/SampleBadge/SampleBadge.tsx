/** Marks unconfirmed placeholder content. Only ever visible in development builds. */
export function SampleBadge() {
  return (
    <span className="rounded-full border border-amber-500/40 bg-amber-500/15 px-2 py-0.5 font-mono text-[10px] font-medium tracking-wide text-amber-600 uppercase dark:text-amber-300">
      Sample
    </span>
  )
}
