import { describe, it, expect } from 'vitest'
import {
  formatHeight,
  formatWeight,
  generationToRoman,
  darkenColor,
  getTypeMeta,
  formatPokedexNumber,
  TYPE_DATA,
} from './type-data'

describe('formatHeight', () => {
  it('分米转米：10 dm → "1.0 m"', () => {
    expect(formatHeight(10)).toBe('1.0 m')
  })

  it('7 dm → "0.7 m"', () => {
    expect(formatHeight(7)).toBe('0.7 m')
  })

  it('40 dm → "4.0 m"', () => {
    expect(formatHeight(40)).toBe('4.0 m')
  })

  it('undefined → "—"', () => {
    expect(formatHeight(undefined)).toBe('—')
  })

  it('null → "—"', () => {
    expect(formatHeight(null)).toBe('—')
  })
})

describe('formatWeight', () => {
  it('百克转千克：100 hg → "10.0 kg"', () => {
    expect(formatWeight(100)).toBe('10.0 kg')
  })

  it('60 hg → "6.0 kg" (Pikachu)', () => {
    expect(formatWeight(60)).toBe('6.0 kg')
  })

  it('1000 hg → "100.0 kg"', () => {
    expect(formatWeight(1000)).toBe('100.0 kg')
  })

  it('undefined → "—"', () => {
    expect(formatWeight(undefined)).toBe('—')
  })

  it('null → "—"', () => {
    expect(formatWeight(null)).toBe('—')
  })
})

describe('generationToRoman', () => {
  it('1 → I', () => {
    expect(generationToRoman(1)).toBe('I')
  })

  it('5 → V', () => {
    expect(generationToRoman(5)).toBe('V')
  })

  it('9 → IX', () => {
    expect(generationToRoman(9)).toBe('IX')
  })

  it('全部 1-9 映射正确', () => {
    expect(generationToRoman(1)).toBe('I')
    expect(generationToRoman(2)).toBe('II')
    expect(generationToRoman(3)).toBe('III')
    expect(generationToRoman(4)).toBe('IV')
    expect(generationToRoman(5)).toBe('V')
    expect(generationToRoman(6)).toBe('VI')
    expect(generationToRoman(7)).toBe('VII')
    expect(generationToRoman(8)).toBe('VIII')
    expect(generationToRoman(9)).toBe('IX')
  })

  it('超出范围的数字返回字符串形式', () => {
    expect(generationToRoman(0)).toBe('0')
    expect(generationToRoman(11)).toBe('11')
  })
})

describe('darkenColor', () => {
  it('amount=0 时不改变颜色（返回 rgb 形式）', () => {
    expect(darkenColor('#FFFFFF', 0)).toBe('rgb(255, 255, 255)')
  })

  it('amount=1 时全黑', () => {
    expect(darkenColor('#FFFFFF', 1)).toBe('rgb(0, 0, 0)')
  })

  it('amount=0.5 时各通道减半（四舍五入）', () => {
    // r=255→128, g=0→0, b=0→0
    expect(darkenColor('#FF0000', 0.5)).toBe('rgb(128, 0, 0)')
  })

  it('不改变 rgb 值的顺序', () => {
    expect(darkenColor('#123456', 0)).toBe('rgb(18, 52, 86)')
  })

  it('已经是黑色时保持黑色', () => {
    expect(darkenColor('#000000', 0.5)).toBe('rgb(0, 0, 0)')
  })
})

describe('getTypeMeta', () => {
  it('已知属性返回正确元数据', () => {
    const fire = getTypeMeta('fire')
    expect(fire.name).toBe('fire')
    expect(fire.displayName).toBe('Fire')
    expect(fire.color).toBe('#F08030')
  })

  it('大小写不敏感', () => {
    expect(getTypeMeta('FIRE').name).toBe('fire')
    expect(getTypeMeta('Water').name).toBe('water')
  })

  it('未知属性 fallback 到 Normal', () => {
    const unknown = getTypeMeta('unknown-type')
    expect(unknown.name).toBe('normal')
    expect(unknown.displayName).toBe('Normal')
  })

  it('null/undefined fallback 到 Normal', () => {
    expect(getTypeMeta(null).name).toBe('normal')
    expect(getTypeMeta(undefined).name).toBe('normal')
  })

  it('返回的 meta 与 TYPE_DATA 中的一致', () => {
    expect(getTypeMeta('fire')).toBe(TYPE_DATA.fire)
    expect(getTypeMeta('water')).toBe(TYPE_DATA.water)
  })
})

describe('formatPokedexNumber', () => {
  it('补零到 3 位', () => {
    expect(formatPokedexNumber(1)).toBe('001')
    expect(formatPokedexNumber(25)).toBe('025')
    expect(formatPokedexNumber(151)).toBe('151')
    expect(formatPokedexNumber(1025)).toBe('1025')
  })
})
