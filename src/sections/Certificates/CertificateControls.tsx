import { ChevronDown, Search } from 'lucide-react'

export type SortKey = 'newest' | 'oldest' | 'title'

const sortOptions: Array<{ value: SortKey; label: string }> = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'title', label: 'Title (A–Z)' },
]

const fieldClass =
  'h-11 w-full rounded-xl border border-border bg-surface text-sm text-fg transition-colors placeholder:text-subtle hover:border-border-strong'

interface CertificateControlsProps {
  query: string
  onQueryChange: (value: string) => void
  sort: SortKey
  onSortChange: (value: SortKey) => void
}

export function CertificateControls({
  query,
  onQueryChange,
  sort,
  onSortChange,
}: CertificateControlsProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <label htmlFor="cert-search" className="sr-only">
          Search certificates by title or organization
        </label>
        <Search
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-subtle"
          aria-hidden
        />
        <input
          id="cert-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by title or organization"
          autoComplete="off"
          className={`${fieldClass} pr-4 pl-10`}
        />
      </div>
      <div className="relative sm:w-52">
        <label htmlFor="cert-sort" className="sr-only">
          Sort certificates
        </label>
        <select
          id="cert-sort"
          value={sort}
          onChange={(event) => onSortChange(event.target.value as SortKey)}
          className={`${fieldClass} appearance-none pr-10 pl-4`}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-subtle"
          aria-hidden
        />
      </div>
    </div>
  )
}
