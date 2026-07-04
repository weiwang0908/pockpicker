import { describe, it, expect } from 'vitest'
import { filterList, pickSprite } from './client'
import type {
  FilterOptions,
  PokemonListItem,
  PokemonSprites,
} from './types'

/* -------------------------------------------------------------------------- */
/* mock 数据                                                                    */
/* -------------------------------------------------------------------------- */

const mockList: PokemonListItem[] = [
  { id: 1, name: 'bulbasaur', types: ['grass', 'poison'], generation: 1 }, // starter
  { id: 4, name: 'charmander', types: ['fire'], generation: 1 }, // starter
  { id: 7, name: 'squirtle', types: ['water'], generation: 1 }, // starter
  { id: 25, name: 'pikachu', types: ['electric'], generation: 1 },
  { id: 144, name: 'articuno', types: ['ice', 'flying'], generation: 1 }, // legendary
  { id: 150, name: 'mewtwo', types: ['psychic'], generation: 1 }, // legendary
  { id: 152, name: 'chikorita', types: ['grass'], generation: 2 }, // starter
  { id: 255, name: 'torchic', types: ['fire'], generation: 3 }, // starter
  { id: 906, name: 'sprigatito', types: ['grass'], generation: 9 }, // starter
]

const allFilter: FilterOptions = {
  generation: 'all',
  type: 'all',
  legendary: 'any',
  shiny: 'off',
  starter: 'off',
  count: 1,
}

/* -------------------------------------------------------------------------- */
/* filterList                                                                   */
/* -------------------------------------------------------------------------- */

describe('filterList', () => {
  it('无 filter（全 all）返回全部', () => {
    expect(filterList(mockList, allFilter)).toHaveLength(mockList.length)
  })

  describe('generation filter', () => {
    it('generation=1 只返回 Gen 1', () => {
      const result = filterList(mockList, { ...allFilter, generation: 1 })
      expect(result.every((r) => r.generation === 1)).toBe(true)
      expect(result).toHaveLength(6) // bulbasaur..mewtwo
    })

    it('generation=2 只返回 Gen 2', () => {
      const result = filterList(mockList, { ...allFilter, generation: 2 })
      expect(result.every((r) => r.generation === 2)).toBe(true)
      expect(result.map((r) => r.id)).toEqual([152])
    })

    it('generation=9 只返回 Gen 9', () => {
      const result = filterList(mockList, { ...allFilter, generation: 9 })
      expect(result.map((r) => r.id)).toEqual([906])
    })
  })

  describe('type filter', () => {
    it('type=fire 返回所有火系', () => {
      const result = filterList(mockList, { ...allFilter, type: 'fire' })
      expect(result.map((r) => r.id).sort((a, b) => a - b)).toEqual([4, 255])
    })

    it('type=grass 返回所有草系（含双属性）', () => {
      const result = filterList(mockList, { ...allFilter, type: 'grass' })
      expect(result.map((r) => r.id).sort((a, b) => a - b)).toEqual([1, 152, 906])
    })

    it('type=ice 返回 Articuno', () => {
      const result = filterList(mockList, { ...allFilter, type: 'ice' })
      expect(result.map((r) => r.id)).toEqual([144])
    })
  })

  describe('legendary filter', () => {
    it('legendary=any 不过滤传说', () => {
      const result = filterList(mockList, { ...allFilter, legendary: 'any' })
      expect(result).toHaveLength(mockList.length)
    })

    it('legendary=include 行为与 any 相同（不排除）', () => {
      const result = filterList(mockList, { ...allFilter, legendary: 'include' })
      expect(result).toHaveLength(mockList.length)
    })

    it('legendary=only 只返回传说宝可梦', () => {
      const result = filterList(mockList, { ...allFilter, legendary: 'only' })
      expect(result.map((r) => r.id).sort((a, b) => a - b)).toEqual([144, 150])
    })
  })

  describe('starter filter', () => {
    it('starter=on 只返回御三家', () => {
      const result = filterList(mockList, { ...allFilter, starter: 'on' })
      expect(result.map((r) => r.id).sort((a, b) => a - b)).toEqual([1, 4, 7, 152, 255, 906])
    })

    it('starter=off 返回全部', () => {
      const result = filterList(mockList, { ...allFilter, starter: 'off' })
      expect(result).toHaveLength(mockList.length)
    })
  })

  describe('多 filter 组合', () => {
    it('generation=1 + type=fire → 只有 Charmander', () => {
      const result = filterList(mockList, {
        ...allFilter,
        generation: 1,
        type: 'fire',
      })
      expect(result.map((r) => r.id)).toEqual([4])
    })

    it('generation=1 + legendary=only → Articuno + Mewtwo', () => {
      const result = filterList(mockList, {
        ...allFilter,
        generation: 1,
        legendary: 'only',
      })
      expect(result.map((r) => r.id).sort((a, b) => a - b)).toEqual([144, 150])
    })

    it('starter=on + type=grass → 草系御三家', () => {
      const result = filterList(mockList, {
        ...allFilter,
        starter: 'on',
        type: 'grass',
      })
      expect(result.map((r) => r.id).sort((a, b) => a - b)).toEqual([1, 152, 906])
    })

    it('generation=1 + starter=on → Gen 1 御三家', () => {
      const result = filterList(mockList, {
        ...allFilter,
        generation: 1,
        starter: 'on',
      })
      expect(result.map((r) => r.id).sort((a, b) => a - b)).toEqual([1, 4, 7])
    })
  })
})

/* -------------------------------------------------------------------------- */
/* pickSprite                                                                   */
/* -------------------------------------------------------------------------- */

describe('pickSprite', () => {
  const fullSprites: PokemonSprites = {
    frontDefault: 'https://example.com/front.png',
    frontShiny: 'https://example.com/front-shiny.png',
    officialArtwork: 'https://example.com/artwork.png',
    officialArtworkShiny: 'https://example.com/artwork-shiny.png',
  }

  describe('普通模式 (shiny=false)', () => {
    it('优先返回 officialArtwork', () => {
      expect(pickSprite(fullSprites, false)).toBe(
        'https://example.com/artwork.png',
      )
    })

    it('无 officialArtwork 时 fallback 到 frontDefault', () => {
      const sprites: PokemonSprites = {
        ...fullSprites,
        officialArtwork: null,
      }
      expect(pickSprite(sprites, false)).toBe(
        'https://example.com/front.png',
      )
    })

    it('只有 officialArtworkShiny + frontShiny 时 fallback 链', () => {
      const sprites: PokemonSprites = {
        frontDefault: null,
        frontShiny: null,
        officialArtwork: null,
        officialArtworkShiny: 'https://example.com/artwork-shiny.png',
      }
      expect(pickSprite(sprites, false)).toBe(
        'https://example.com/artwork-shiny.png',
      )
    })

    it('全部为 null 时返回 null', () => {
      const sprites: PokemonSprites = {
        frontDefault: null,
        frontShiny: null,
        officialArtwork: null,
        officialArtworkShiny: null,
      }
      expect(pickSprite(sprites, false)).toBeNull()
    })
  })

  describe('闪光模式 (shiny=true)', () => {
    it('优先返回 officialArtworkShiny', () => {
      expect(pickSprite(fullSprites, true)).toBe(
        'https://example.com/artwork-shiny.png',
      )
    })

    it('无 officialArtworkShiny 时 fallback 到 frontShiny', () => {
      const sprites: PokemonSprites = {
        ...fullSprites,
        officialArtworkShiny: null,
      }
      expect(pickSprite(sprites, true)).toBe(
        'https://example.com/front-shiny.png',
      )
    })

    it('无 shiny 资源时 fallback 到普通 officialArtwork', () => {
      const sprites: PokemonSprites = {
        ...fullSprites,
        officialArtworkShiny: null,
        frontShiny: null,
      }
      expect(pickSprite(sprites, true)).toBe(
        'https://example.com/artwork.png',
      )
    })

    it('只有 frontDefault 时返回 frontDefault', () => {
      const sprites: PokemonSprites = {
        frontDefault: 'https://example.com/front.png',
        frontShiny: null,
        officialArtwork: null,
        officialArtworkShiny: null,
      }
      expect(pickSprite(sprites, true)).toBe(
        'https://example.com/front.png',
      )
    })
  })
})
