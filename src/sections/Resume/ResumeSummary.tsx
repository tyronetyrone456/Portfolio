export interface SummaryRow {
  label: string
  value: string[]
}

const MAX_ITEMS = 4

export function ResumeSummary({ rows }: { rows: SummaryRow[] }) {
  return (
    <dl className="card divide-y divide-border">
      {rows.map(({ label, value }) => (
        <div key={label} className="grid gap-1 p-5 sm:grid-cols-[7rem_1fr] sm:gap-4">
          <dt className="text-xs font-medium tracking-wide text-subtle uppercase sm:pt-0.5">
            {label}
          </dt>
          <dd className="text-sm">
            {value.length === 0 ? (
              <span className="text-subtle italic">Coming soon</span>
            ) : (
              <span className="text-fg">
                {value.slice(0, MAX_ITEMS).join(' · ')}
                {value.length > MAX_ITEMS && (
                  <span className="text-subtle"> · +{value.length - MAX_ITEMS} more</span>
                )}
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}
