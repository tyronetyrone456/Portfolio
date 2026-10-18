import { useEffect } from 'react'

const MAX_TILT_X = 5
const MAX_TILT_Y = 7

function resetTilt(el: HTMLElement) {
  el.style.removeProperty('--rx')
  el.style.removeProperty('--ry')
}

/**
 * Pointer-driven polish, only on devices with a real hover pointer and when
 * motion is allowed:
 *  - `--cx/--cy` on <html> feed the soft cursor aura
 *  - `--mx/--my` on the hovered `.card` feed its spotlight and border glow
 *  - `--rx/--ry` on the hovered `.card-interactive` add a subtle 3D tilt
 * One passive listener, throttled to a frame.
 */
export function usePointerFx(): void {
  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canHover || reduce) return

    const root = document.documentElement
    let frame = 0
    let last: PointerEvent | null = null
    let tilted: HTMLElement | null = null

    const update = () => {
      frame = 0
      const event = last
      if (!event) return
      root.style.setProperty('--cx', `${event.clientX}px`)
      root.style.setProperty('--cy', `${event.clientY}px`)
      root.dataset.aura = 'on'

      const target = event.target instanceof Element ? event.target : null
      const card = target?.closest<HTMLElement>('.card') ?? null
      if (card) {
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
        card.style.setProperty('--my', `${event.clientY - rect.top}px`)
      }

      const interactive = target?.closest<HTMLElement>('.card-interactive') ?? null
      if (tilted && tilted !== interactive) resetTilt(tilted)
      if (interactive) {
        const rect = interactive.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width
        const y = (event.clientY - rect.top) / rect.height
        interactive.style.setProperty('--rx', `${((0.5 - y) * 2 * MAX_TILT_X).toFixed(2)}deg`)
        interactive.style.setProperty('--ry', `${((x - 0.5) * 2 * MAX_TILT_Y).toFixed(2)}deg`)
      }
      tilted = interactive
    }

    const onMove = (event: PointerEvent) => {
      last = event
      if (!frame) frame = requestAnimationFrame(update)
    }
    const onLeave = () => {
      delete root.dataset.aura
      if (tilted) resetTilt(tilted)
      tilted = null
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('pointerleave', onLeave)
    return () => {
      document.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
}
