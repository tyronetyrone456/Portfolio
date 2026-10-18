import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Award, ChevronDown, SearchX } from 'lucide-react'
import { Button } from '@/components/Button/Button'
import { CertificateCard } from '@/components/CertificateCard/CertificateCard'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { FilterChips } from '@/components/FilterChips/FilterChips'
import { Modal } from '@/components/Modal/Modal'
import { Reveal } from '@/components/Reveal/Reveal'
import { Section } from '@/components/Section/Section'
import { certificates } from '@/data/certificates'
import { CERTIFICATE_CATEGORIES } from '@/types'
import type { Certificate } from '@/types'
import { selectPublished } from '@/utils'
import { CertificateControls } from './CertificateControls'
import type { SortKey } from './CertificateControls'
import { CertificateDetails } from './CertificateDetails'

const ALL = 'All'
const PAGE_SIZE = 9
const published = selectPublished(certificates)
const categories = CERTIFICATE_CATEGORIES.filter((c) => published.some((cert) => cert.category === c))

function sortCertificates(items: Certificate[], sort: SortKey): Certificate[] {
  const copy = [...items]
  if (sort === 'title') return copy.sort((a, b) => a.title.localeCompare(b.title))
  const time = (c: Certificate) => Date.parse(c.completedOn) || 0
  return copy.sort((a, b) => (sort === 'newest' ? time(b) - time(a) : time(a) - time(b)))
}

export function Certificates() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>(ALL)
  const [sort, setSort] = useState<SortKey>('newest')
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [selected, setSelected] = useState<Certificate | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const matches = published.filter(
      (c) =>
        (category === ALL || c.category === category) &&
        (!q ||
          c.title.toLowerCase().includes(q) ||
          c.issuer.toLowerCase().includes(q) ||
          c.platform.toLowerCase().includes(q)),
    )
    return sortCertificates(matches, sort)
  }, [query, category, sort])

  const shown = results.slice(0, limit)
  const remaining = results.length - shown.length

  const resetLimit = () => setLimit(PAGE_SIZE)
  const clearFilters = () => {
    setQuery('')
    setCategory(ALL)
    resetLimit()
  }

  const openCertificate = useCallback((certificate: Certificate) => {
    setSelected(certificate)
    setModalOpen(true)
  }, [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  return (
    <Section
      id="certificates"
      eyebrow="04 / Certificates"
      title="Certificates & continuous learning"
      description="Courses, professional certificates, and guided projects I've completed, each with a link to verify it."
    >
      {published.length === 0 ? (
        <Reveal>
          <EmptyState
            icon={Award}
            title="Certificates coming soon"
            description="I'm collecting my Coursera certificates and other online learning here. Verified credentials will appear as I add them."
            devHint="Add a real entry with confirmed: true to src/data/certificates.ts."
          />
        </Reveal>
      ) : (
        <>
          <Reveal className="mb-8 space-y-5">
            <CertificateControls
              query={query}
              onQueryChange={(value) => {
                setQuery(value)
                resetLimit()
              }}
              sort={sort}
              onSortChange={(value) => {
                setSort(value)
                resetLimit()
              }}
            />
            {categories.length > 1 && (
              <FilterChips
                label="Filter certificates by category"
                groupId="certificates"
                options={[ALL, ...categories]}
                value={category}
                onChange={(value) => {
                  setCategory(value)
                  resetLimit()
                }}
              />
            )}
            <p className="text-sm text-subtle" aria-live="polite">
              Showing {shown.length} of {results.length} certificate{results.length === 1 ? '' : 's'}
            </p>
          </Reveal>

          {results.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No certificates match"
              description="Try a different search term or category."
              action={
                <Button variant="secondary" onClick={clearFilters}>
                  Clear filters
                </Button>
              }
            />
          ) : (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {shown.map((certificate, index) => (
                  <CertificateCard
                    key={certificate.id}
                    certificate={certificate}
                    index={index}
                    onOpen={openCertificate}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {remaining > 0 && (
            <div className="mt-10 flex justify-center">
              <Button
                variant="secondary"
                icon={ChevronDown}
                onClick={() => setLimit((l) => l + PAGE_SIZE)}
              >
                Load more ({remaining} remaining)
              </Button>
            </div>
          )}

          <Modal
            open={modalOpen}
            onClose={closeModal}
            title={selected?.title ?? 'Certificate details'}
          >
            {selected && <CertificateDetails certificate={selected} />}
          </Modal>
        </>
      )}
    </Section>
  )
}
