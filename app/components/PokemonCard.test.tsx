import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PokemonCard } from './PokemonCard'
import { getTypeMeta, Pokemon } from '@/app/lib/type-data'

// mock ShareButton 以避免 html2canvas 在 jsdom 中加载
vi.mock('@/app/components/ShareButton', () => ({
  ShareButton: ({ pokemon }: { pokemon: { name: string } }) => (
    <button aria-label={`Share ${pokemon.name}`}>Share</button>
  ),
}))

function makeMockPokemon(overrides: Partial<Pokemon> = {}): Pokemon {
  return {
    id: 25,
    name: 'Pikachu',
    types: ['electric'],
    sprite: 'https://example.com/pikachu.png',
    generation: 1,
    height: 4,
    weight: 60,
    abilities: ['static', 'lightning-rod'],
    ...overrides,
  }
}

// jsdom 将 inline hex 颜色规范化为 rgb() 形式，这里做同样的转换用于断言
function hexToRgb(hex: string): string {
  const m = hex.replace('#', '')
  const r = parseInt(m.slice(0, 2), 16)
  const g = parseInt(m.slice(2, 4), 16)
  const b = parseInt(m.slice(4, 6), 16)
  return `rgb(${r}, ${g}, ${b})`
}

describe('PokemonCard 组件', () => {
  describe('渲染 Pokemon 信息', () => {
    it('显示名字', () => {
      render(<PokemonCard pokemon={makeMockPokemon()} />)
      expect(screen.getByText('Pikachu')).toBeInTheDocument()
    })

    it('显示属性（primary · secondary）', () => {
      render(
        <PokemonCard
          pokemon={makeMockPokemon({ types: ['fire', 'flying'] })}
        />,
      )
      expect(screen.getByText('Fire')).toBeInTheDocument()
      expect(screen.getByText('Flying')).toBeInTheDocument()
    })

    it('单属性时不显示分隔符', () => {
      render(<PokemonCard pokemon={makeMockPokemon()} />)
      expect(screen.getByText('Electric')).toBeInTheDocument()
      // 不应该有第二个属性
      expect(screen.queryByText('Flying')).not.toBeInTheDocument()
    })

    it('显示 Pokédex 编号和世代', () => {
      render(<PokemonCard pokemon={makeMockPokemon()} />)
      // #025 · Gen I
      expect(screen.getByText(/#025/)).toBeInTheDocument()
      expect(screen.getByText(/Gen I/)).toBeInTheDocument()
    })

    it('显示图片', () => {
      render(<PokemonCard pokemon={makeMockPokemon()} />)
      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('src', 'https://example.com/pikachu.png')
      expect(img).toHaveAttribute('alt', 'Pikachu')
    })

    it('team 模式显示 Team 标记', () => {
      render(<PokemonCard pokemon={makeMockPokemon()} isTeamMode />)
      expect(screen.getByText(/Team/)).toBeInTheDocument()
    })
  })

  describe('点击卡片展开（tap 行为）', () => {
    it('初始状态 aria-expanded=false', () => {
      render(<PokemonCard pokemon={makeMockPokemon()} />)
      const card = screen.getByRole('button', { name: /tap to expand/i })
      expect(card).toHaveAttribute('aria-expanded', 'false')
    })

    it('点击卡片切换 aria-expanded', async () => {
      const user = userEvent.setup()
      render(<PokemonCard pokemon={makeMockPokemon()} />)

      const card = screen.getByRole('button', { name: /tap to expand/i })
      await user.click(card)

      expect(card).toHaveAttribute('aria-expanded', 'true')
      // aria-label 也应变为 "collapse"
      expect(card).toHaveAttribute('aria-label', expect.stringMatching(/collapse/i))
    })

    it('再次点击折叠', async () => {
      const user = userEvent.setup()
      render(<PokemonCard pokemon={makeMockPokemon()} />)

      const card = screen.getByRole('button', { name: /tap to expand/i })
      await user.click(card) // 展开
      await user.click(card) // 折叠

      expect(card).toHaveAttribute('aria-expanded', 'false')
    })

    it('键盘 Enter 触发展开', async () => {
      const user = userEvent.setup()
      render(<PokemonCard pokemon={makeMockPokemon()} />)

      const card = screen.getByRole('button', { name: /tap to expand/i })
      card.focus()
      await user.keyboard('{Enter}')

      expect(card).toHaveAttribute('aria-expanded', 'true')
    })
  })

  describe('Share 按钮', () => {
    it('存在', () => {
      render(<PokemonCard pokemon={makeMockPokemon()} />)
      expect(
        screen.getByRole('button', { name: 'Share Pikachu' }),
      ).toBeInTheDocument()
    })

    it('点击 Share 不触发卡片展开', async () => {
      const user = userEvent.setup()
      render(<PokemonCard pokemon={makeMockPokemon()} />)

      const shareBtn = screen.getByRole('button', { name: 'Share Pikachu' })
      await user.click(shareBtn)

      // 卡片不应该展开
      const card = screen.getByRole('button', { name: /tap to expand/i })
      expect(card).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('属性色应用到边框', () => {
    it('electric 属性 → border 使用 electric 颜色', () => {
      render(<PokemonCard pokemon={makeMockPokemon()} />)
      const card = screen.getByRole('button', { name: /tap to expand/i })
      const electricColor = getTypeMeta('electric').color
      // jsdom 将 hex 规范化为 rgb()
      expect(card.style.borderColor).toBe(hexToRgb(electricColor))
    })

    it('fire 属性 → border 使用 fire 颜色', () => {
      render(
        <PokemonCard pokemon={makeMockPokemon({ types: ['fire'] })} />,
      )
      const card = screen.getByRole('button', { name: /tap to expand/i })
      const fireColor = getTypeMeta('fire').color
      expect(card.style.borderColor).toBe(hexToRgb(fireColor))
    })

    it('water 属性 → border 使用 water 颜色', () => {
      render(
        <PokemonCard pokemon={makeMockPokemon({ types: ['water'] })} />,
      )
      const card = screen.getByRole('button', { name: /tap to expand/i })
      const waterColor = getTypeMeta('water').color
      expect(card.style.borderColor).toBe(hexToRgb(waterColor))
    })
  })
})
