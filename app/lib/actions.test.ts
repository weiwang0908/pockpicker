import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getRandomPokemon } from '@/lib/pokeapi/client'
import { generateTeamAction, pickStarterAction } from '@/app/lib/actions'
import type { Pokemon } from '@/lib/pokeapi/types'
import type { FilterOptions as UIFilterOptions } from '@/app/components/Filters'

// 部分 mock：保留 pickSprite 真实实现，仅 mock getRandomPokemon
vi.mock('@/lib/pokeapi/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/pokeapi/client')>()
  return {
    ...actual,
    getRandomPokemon: vi.fn(),
  }
})

/* -------------------------------------------------------------------------- */
/* mock Pokemon                                                                 */
/* -------------------------------------------------------------------------- */

function makeMockPokemon(overrides: Partial<Pokemon> = {}): Pokemon {
  return {
    id: 25,
    name: 'pikachu',
    displayName: '皮卡丘',
    types: ['electric'],
    sprites: {
      frontDefault: 'https://example.com/front.png',
      frontShiny: 'https://example.com/front-shiny.png',
      officialArtwork: 'https://example.com/artwork.png',
      officialArtworkShiny: 'https://example.com/artwork-shiny.png',
    },
    height: 4,
    weight: 60,
    abilities: [
      { name: 'static', isHidden: false },
      { name: 'lightning-rod', isHidden: true },
    ],
    stats: [],
    generation: 1,
    species: {
      isLegendary: false,
      isMythical: false,
      genus: 'Mouse Pokémon',
      genusZh: '鼠宝可梦',
      displayNameZh: '皮卡丘',
      displayNameEn: 'Pikachu',
    },
    ...overrides,
  }
}

const defaultUIFilter: UIFilterOptions = {
  generation: null,
  type: null,
  legendary: 'any',
  shiny: false,
  starter: false,
  count: 6,
}

describe('generateTeamAction', () => {
  beforeEach(() => {
    vi.mocked(getRandomPokemon).mockReset()
  })

  it('调用 getRandomPokemon 时 count=6', async () => {
    vi.mocked(getRandomPokemon).mockResolvedValue([makeMockPokemon()])

    await generateTeamAction(defaultUIFilter)

    expect(getRandomPokemon).toHaveBeenCalledTimes(1)
    expect(getRandomPokemon).toHaveBeenCalledWith(
      expect.objectContaining({ count: 6 }),
      6,
    )
  })

  it('uiToDataFilter: generation null → "all"', async () => {
    vi.mocked(getRandomPokemon).mockResolvedValue([makeMockPokemon()])

    await generateTeamAction({ ...defaultUIFilter, generation: null })

    expect(getRandomPokemon).toHaveBeenCalledWith(
      expect.objectContaining({ generation: 'all' }),
      6,
    )
  })

  it('uiToDataFilter: generation=1 → 1', async () => {
    vi.mocked(getRandomPokemon).mockResolvedValue([makeMockPokemon()])

    await generateTeamAction({ ...defaultUIFilter, generation: 1 })

    expect(getRandomPokemon).toHaveBeenCalledWith(
      expect.objectContaining({ generation: 1 }),
      6,
    )
  })

  it('uiToDataFilter: type null → "all"', async () => {
    vi.mocked(getRandomPokemon).mockResolvedValue([makeMockPokemon()])

    await generateTeamAction({ ...defaultUIFilter, type: null })

    expect(getRandomPokemon).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'all' }),
      6,
    )
  })

  it('uiToDataFilter: type "Fire" → "fire"（小写）', async () => {
    vi.mocked(getRandomPokemon).mockResolvedValue([makeMockPokemon()])

    await generateTeamAction({ ...defaultUIFilter, type: 'Fire' })

    expect(getRandomPokemon).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'fire' }),
      6,
    )
  })

  it('uiToDataFilter: shiny false → "off"', async () => {
    vi.mocked(getRandomPokemon).mockResolvedValue([makeMockPokemon()])

    await generateTeamAction({ ...defaultUIFilter, shiny: false })

    expect(getRandomPokemon).toHaveBeenCalledWith(
      expect.objectContaining({ shiny: 'off' }),
      6,
    )
  })

  it('uiToDataFilter: shiny true → "on"', async () => {
    vi.mocked(getRandomPokemon).mockResolvedValue([makeMockPokemon()])

    await generateTeamAction({ ...defaultUIFilter, shiny: true })

    expect(getRandomPokemon).toHaveBeenCalledWith(
      expect.objectContaining({ shiny: 'on' }),
      6,
    )
  })

  it('uiToDataFilter: starter true → "on"', async () => {
    vi.mocked(getRandomPokemon).mockResolvedValue([makeMockPokemon()])

    await generateTeamAction({ ...defaultUIFilter, starter: true })

    expect(getRandomPokemon).toHaveBeenCalledWith(
      expect.objectContaining({ starter: 'on' }),
      6,
    )
  })

  it('toCardPokemon: name 取 species.displayNameEn', async () => {
    const mock = makeMockPokemon()
    vi.mocked(getRandomPokemon).mockResolvedValue([mock])

    const [card] = await generateTeamAction(defaultUIFilter)

    expect(card.name).toBe('Pikachu') // species.displayNameEn
  })

  it('toCardPokemon: name 在 displayNameEn 为空时 fallback 到 p.name', async () => {
    const mock = makeMockPokemon({
      name: 'raichu',
      species: {
        isLegendary: false,
        isMythical: false,
        genus: '',
        genusZh: null,
        displayNameZh: null,
        displayNameEn: '', // 空字符串 → falsy → fallback
      },
    })
    vi.mocked(getRandomPokemon).mockResolvedValue([mock])

    const [card] = await generateTeamAction(defaultUIFilter)

    expect(card.name).toBe('raichu')
  })

  it('toCardPokemon: sprite 从 sprites 提取（非 shiny）', async () => {
    const mock = makeMockPokemon()
    vi.mocked(getRandomPokemon).mockResolvedValue([mock])

    const [card] = await generateTeamAction({ ...defaultUIFilter, shiny: false })

    expect(card.sprite).toBe('https://example.com/artwork.png') // officialArtwork
  })

  it('toCardPokemon: sprite 从 sprites 提取（shiny）', async () => {
    const mock = makeMockPokemon()
    vi.mocked(getRandomPokemon).mockResolvedValue([mock])

    const [card] = await generateTeamAction({ ...defaultUIFilter, shiny: true })

    expect(card.sprite).toBe('https://example.com/artwork-shiny.png') // officialArtworkShiny
  })

  it('toCardPokemon: 完整字段映射', async () => {
    const mock = makeMockPokemon()
    vi.mocked(getRandomPokemon).mockResolvedValue([mock])

    const [card] = await generateTeamAction(defaultUIFilter)

    expect(card.id).toBe(25)
    expect(card.types).toEqual(['electric'])
    expect(card.generation).toBe(1)
    expect(card.height).toBe(4)
    expect(card.weight).toBe(60)
    expect(card.abilities).toEqual(['static', 'lightning-rod'])
  })

  it('多只 Pokemon 全部转换', async () => {
    vi.mocked(getRandomPokemon).mockResolvedValue([
      makeMockPokemon({ id: 1, name: 'bulbasaur', species: { ...makeMockPokemon().species, displayNameEn: 'Bulbasaur' } }),
      makeMockPokemon({ id: 4, name: 'charmander', species: { ...makeMockPokemon().species, displayNameEn: 'Charmander' } }),
      makeMockPokemon({ id: 7, name: 'squirtle', species: { ...makeMockPokemon().species, displayNameEn: 'Squirtle' } }),
    ])

    const cards = await generateTeamAction(defaultUIFilter)

    expect(cards).toHaveLength(3)
    expect(cards.map((c) => c.name)).toEqual([
      'Bulbasaur',
      'Charmander',
      'Squirtle',
    ])
  })
})

describe('pickStarterAction', () => {
  beforeEach(() => {
    vi.mocked(getRandomPokemon).mockReset()
  })

  it('调用 getRandomPokemon 时 starter="on" 且 count=1', async () => {
    vi.mocked(getRandomPokemon).mockResolvedValue([makeMockPokemon()])

    await pickStarterAction(defaultUIFilter)

    expect(getRandomPokemon).toHaveBeenCalledTimes(1)
    expect(getRandomPokemon).toHaveBeenCalledWith(
      expect.objectContaining({ starter: 'on', count: 1 }),
      1,
    )
  })

  it('覆盖 UI 传入的 starter 值（强制为 on）', async () => {
    vi.mocked(getRandomPokemon).mockResolvedValue([makeMockPokemon()])

    await pickStarterAction({ ...defaultUIFilter, starter: false })

    expect(getRandomPokemon).toHaveBeenCalledWith(
      expect.objectContaining({ starter: 'on' }),
      1,
    )
  })

  it('返回单只卡片 Pokemon', async () => {
    vi.mocked(getRandomPokemon).mockResolvedValue([makeMockPokemon()])

    const cards = await pickStarterAction(defaultUIFilter)

    expect(cards).toHaveLength(1)
    expect(cards[0].name).toBe('Pikachu')
  })
})
