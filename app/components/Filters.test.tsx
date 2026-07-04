import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Filters, { defaultFilter } from './Filters'
import type { FilterOptions } from './Filters'

describe('Filters 组件', () => {
  describe('渲染 basic filters', () => {
    it('渲染 Generation 标签和 chips', () => {
      render(<Filters filter={defaultFilter} onChange={vi.fn()} />)

      expect(screen.getByText('Generation')).toBeInTheDocument()
      // All + Gen 1..9
      expect(screen.getByRole('button', { name: 'Gen 1' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Gen 9' })).toBeInTheDocument()
    })

    it('渲染 Type 标签和 chips', () => {
      render(<Filters filter={defaultFilter} onChange={vi.fn()} />)

      expect(screen.getByText('Type')).toBeInTheDocument()
      // 18 个属性 + All
      // Fire chip 的 accessible name 包含 emoji + 文本
      expect(screen.getByRole('button', { name: /Fire/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Water/i })).toBeInTheDocument()
    })

    it('渲染 Advanced 按钮', () => {
      render(<Filters filter={defaultFilter} onChange={vi.fn()} />)

      expect(screen.getByText('Advanced')).toBeInTheDocument()
    })

    it('渲染 Count 标签和 chips 1/3/6', () => {
      render(<Filters filter={defaultFilter} onChange={vi.fn()} />)

      expect(screen.getByText('Count')).toBeInTheDocument()
      // Count 区域内的三个 chip
      const countSection = screen.getByText('Count').parentElement!
      expect(
        within(countSection).getByRole('button', { name: '1' }),
      ).toBeInTheDocument()
      expect(
        within(countSection).getByRole('button', { name: '3' }),
      ).toBeInTheDocument()
      expect(
        within(countSection).getByRole('button', { name: '6' }),
      ).toBeInTheDocument()
    })
  })

  describe('点击 Generation chip 触发 onChange', () => {
    it('点击 "All" 触发 onChange with generation=null', async () => {
      const onChange = vi.fn()
      const user = userEvent.setup()
      render(
        <Filters
          filter={{ ...defaultFilter, generation: 1 }}
          onChange={onChange}
        />,
      )

      // 用 within 限定到 Generation 区域，避免和 Type 的 "All" 冲突
      const genSection = screen.getByText('Generation').parentElement!
      await user.click(
        within(genSection).getByRole('button', { name: 'All' }),
      )

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ generation: null }),
      )
    })

    it('点击 "Gen 3" 触发 onChange with generation=3', async () => {
      const onChange = vi.fn()
      const user = userEvent.setup()
      render(<Filters filter={defaultFilter} onChange={onChange} />)

      await user.click(screen.getByRole('button', { name: 'Gen 3' }))

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ generation: 3 }),
      )
    })

    it('保留其他 filter 字段', async () => {
      const onChange = vi.fn()
      const user = userEvent.setup()
      const filter: FilterOptions = {
        ...defaultFilter,
        type: 'Fire',
        legendary: 'only',
      }
      render(<Filters filter={filter} onChange={onChange} />)

      await user.click(screen.getByRole('button', { name: 'Gen 5' }))

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          generation: 5,
          type: 'Fire',
          legendary: 'only',
        }),
      )
    })
  })

  describe('点击 Type chip 触发 onChange', () => {
    it('点击 "All" 触发 onChange with type=null', async () => {
      const onChange = vi.fn()
      const user = userEvent.setup()
      render(
        <Filters
          filter={{ ...defaultFilter, type: 'Fire' }}
          onChange={onChange}
        />,
      )

      // Type filter 的 "All" 按钮 — 与 Generation 的 "All" 区分开
      // Type 区域的 All 是第一个 All 按钮在 Type 区域
      const typeSection = screen.getByText('Type').parentElement!
      const allButton = typeSection.querySelector('button')!
      await user.click(allButton)

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ type: null }),
      )
    })

    it('点击 Fire 触发 onChange with type="Fire"', async () => {
      const onChange = vi.fn()
      const user = userEvent.setup()
      render(<Filters filter={defaultFilter} onChange={onChange} />)

      await user.click(screen.getByRole('button', { name: /Fire/i }))

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'Fire' }),
      )
    })
  })

  describe('Advanced 折叠 / 展开', () => {
    it('默认折叠（不显示 Legendary / Shiny / Starter）', () => {
      render(<Filters filter={defaultFilter} onChange={vi.fn()} />)

      // Advanced 内容里的 label 不应出现（Count 已移至 basic filters）
      expect(screen.queryByText('Legendary')).not.toBeInTheDocument()
      expect(screen.queryByText('Shiny')).not.toBeInTheDocument()
      expect(screen.queryByText('Starter')).not.toBeInTheDocument()
    })

    it('点击 Advanced 按钮展开', async () => {
      const user = userEvent.setup()
      render(<Filters filter={defaultFilter} onChange={vi.fn()} />)

      const advancedBtn = screen.getByText('Advanced').closest('button')!
      await user.click(advancedBtn)

      expect(screen.getByText('Legendary')).toBeInTheDocument()
      expect(screen.getByText('Shiny')).toBeInTheDocument()
      expect(screen.getByText('Starter')).toBeInTheDocument()
    })

    it('再次点击 Advanced 折叠', async () => {
      const user = userEvent.setup()
      render(<Filters filter={defaultFilter} onChange={vi.fn()} />)

      const advancedBtn = screen.getByText('Advanced').closest('button')!
      await user.click(advancedBtn) // 展开
      expect(screen.getByText('Legendary')).toBeInTheDocument()

      await user.click(advancedBtn) // 折叠
      expect(screen.queryByText('Legendary')).not.toBeInTheDocument()
    })
  })
})
