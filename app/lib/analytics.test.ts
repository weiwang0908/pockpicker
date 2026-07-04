import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { trackEvent } from './analytics'

describe('trackEvent', () => {
  beforeEach(() => {
    // 清理 window.gtag
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any
    delete w.gtag
  })

  afterEach(() => {
    vi.restoreAllMocks()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any
    delete w.gtag
  })

  it('无 window.gtag 时不抛错（no-op）', () => {
    expect(() => trackEvent('test_event')).not.toThrow()
    expect(() => trackEvent('test_event', { foo: 'bar' })).not.toThrow()
  })

  it('有 window.gtag 时调用 gtag("event", name, params)', () => {
    const gtag = vi.fn()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).gtag = gtag

    trackEvent('share_pokemon', { name: 'Pikachu', id: 25 })

    expect(gtag).toHaveBeenCalledTimes(1)
    expect(gtag).toHaveBeenCalledWith('event', 'share_pokemon', {
      name: 'Pikachu',
      id: 25,
    })
  })

  it('不带 params 调用时传 undefined', () => {
    const gtag = vi.fn()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).gtag = gtag

    trackEvent('click_card')

    expect(gtag).toHaveBeenCalledWith('event', 'click_card', undefined)
  })

  it('gtag 不是函数时不抛错', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).gtag = 'not-a-function'
    expect(() => trackEvent('test')).not.toThrow()
  })
})
