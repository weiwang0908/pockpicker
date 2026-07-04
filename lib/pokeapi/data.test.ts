import { describe, it, expect } from 'vitest'
import {
  TYPE_METADATA,
  TYPE_MAP,
  GENERATION_RANGES,
  STARTER_POKEMON_IDS,
  LEGENDARY_POKEMON_IDS,
  getGenerationById,
  getGenerationRange,
  getGenerationIdRange,
} from './data'
import type { PokemonType } from './types'

describe('TYPE_METADATA', () => {
  it('包含 18 个属性', () => {
    expect(TYPE_METADATA).toHaveLength(18)
  })

  it('每个属性都有 id / name / color / emoji / displayNameEn / displayNameZh', () => {
    for (const meta of TYPE_METADATA) {
      expect(typeof meta.id).toBe('number')
      expect(meta.name).toBeTruthy()
      expect(meta.color).toMatch(/^#[0-9a-fA-F]{6}$/)
      expect(meta.emoji).toBeTruthy()
      expect(meta.displayNameEn).toBeTruthy()
      expect(meta.displayNameZh).toBeTruthy()
    }
  })

  it('id 从 1 到 18 且无重复', () => {
    const ids = TYPE_METADATA.map((m) => m.id)
    expect(ids).toEqual(Array.from({ length: 18 }, (_, i) => i + 1))
  })
})

describe('TYPE_MAP', () => {
  it('key 与 TYPE_METADATA 的 name 一致', () => {
    const metaNames = TYPE_METADATA.map((m) => m.name).sort()
    const mapKeys = Object.keys(TYPE_MAP).sort()
    expect(mapKeys).toEqual(metaNames)
  })

  it('每个 key 指向正确的 meta', () => {
    for (const meta of TYPE_METADATA) {
      expect(TYPE_MAP[meta.name as PokemonType]).toBe(meta)
    }
  })
})

describe('GENERATION_RANGES', () => {
  it('包含 9 个世代', () => {
    expect(GENERATION_RANGES).toHaveLength(9)
  })

  it('每个 range 的 startId < endId', () => {
    for (const range of GENERATION_RANGES) {
      expect(range.startId).toBeLessThan(range.endId)
    }
  })

  it('世代编号从 1 到 9 且无重复', () => {
    const gens = GENERATION_RANGES.map((r) => r.generation)
    expect(gens).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('各世代范围连续无重叠', () => {
    for (let i = 0; i < GENERATION_RANGES.length - 1; i++) {
      expect(GENERATION_RANGES[i].endId).toBeLessThan(
        GENERATION_RANGES[i + 1].startId,
      )
      expect(GENERATION_RANGES[i + 1].startId).toBe(
        GENERATION_RANGES[i].endId + 1,
      )
    }
  })

  it('关键边界：Gen 1 = 1-151', () => {
    const gen1 = getGenerationRange(1)!
    expect(gen1.startId).toBe(1)
    expect(gen1.endId).toBe(151)
  })

  it('关键边界：Gen 2 = 152-251', () => {
    const gen2 = getGenerationRange(2)!
    expect(gen2.startId).toBe(152)
    expect(gen2.endId).toBe(251)
  })

  it('关键边界：Gen 9 = 906-1025', () => {
    const gen9 = getGenerationRange(9)!
    expect(gen9.startId).toBe(906)
    expect(gen9.endId).toBe(1025)
  })
})

describe('STARTER_POKEMON_IDS', () => {
  it('不为空', () => {
    expect(STARTER_POKEMON_IDS.length).toBeGreaterThan(0)
  })

  it('包含 Gen 1 御三家 1 / 4 / 7', () => {
    expect(STARTER_POKEMON_IDS).toContain(1) // Bulbasaur
    expect(STARTER_POKEMON_IDS).toContain(4) // Charmander
    expect(STARTER_POKEMON_IDS).toContain(7) // Squirtle
  })

  it('包含 Gen 9 御三家 906 / 909 / 912', () => {
    expect(STARTER_POKEMON_IDS).toContain(906) // Sprigatito
    expect(STARTER_POKEMON_IDS).toContain(909) // Fuecoco
    expect(STARTER_POKEMON_IDS).toContain(912) // Quaxly
  })
})

describe('LEGENDARY_POKEMON_IDS', () => {
  it('不为空', () => {
    expect(LEGENDARY_POKEMON_IDS.length).toBeGreaterThan(0)
  })

  it('包含三神鸟 144 / 145 / 146', () => {
    expect(LEGENDARY_POKEMON_IDS).toContain(144) // Articuno
    expect(LEGENDARY_POKEMON_IDS).toContain(145) // Zapdos
    expect(LEGENDARY_POKEMON_IDS).toContain(146) // Moltres
  })
})

describe('getGenerationById', () => {
  it('id=25 (Pikachu) 返回 Gen 1', () => {
    expect(getGenerationById(25)).toBe(1)
  })

  it('id=1 (Bulbasaur) 返回 Gen 1', () => {
    expect(getGenerationById(1)).toBe(1)
  })

  it('id=151 (Mew) 返回 Gen 1', () => {
    expect(getGenerationById(151)).toBe(1)
  })

  it('id=152 (Chikorita) 返回 Gen 2', () => {
    expect(getGenerationById(152)).toBe(2)
  })

  it('id=906 (Sprigatito) 返回 Gen 9', () => {
    expect(getGenerationById(906)).toBe(9)
  })

  it('id=1025 (Terapagos) 返回 Gen 9', () => {
    expect(getGenerationById(1025)).toBe(9)
  })

  it('id=0 返回 null', () => {
    expect(getGenerationById(0)).toBeNull()
  })

  it('id=99999 返回 null', () => {
    expect(getGenerationById(99999)).toBeNull()
  })
})

describe('getGenerationIdRange', () => {
  it('返回指定世代的 id 区间', () => {
    expect(getGenerationIdRange(1)).toEqual({ startId: 1, endId: 151 })
    expect(getGenerationIdRange(9)).toEqual({ startId: 906, endId: 1025 })
  })

  it('未知世代抛错', () => {
    expect(() => getGenerationIdRange(99 as never)).toThrow(/Unknown generation/)
  })
})
