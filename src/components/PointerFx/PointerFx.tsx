import { usePointerFx } from '@/hooks/usePointerFx'

/** Ambient background layers plus the pointer effects that drive them. */
export function PointerFx() {
  usePointerFx()
  return (
    <>
      <div className="bg-aurora" aria-hidden />
      <div className="bg-noise" aria-hidden />
      <div className="cursor-aura" aria-hidden />
    </>
  )
}
