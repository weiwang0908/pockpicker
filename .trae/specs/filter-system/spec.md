# Filter System Spec

## Why
Filter 是首页体验的关键差异化点。9 个竞品中 2 个堆功能（12+ 类、15+ 类）用户体验差，4 个极简派排名反而稳。我们走 progressive disclosure 路线：basic 默认 + advanced 折叠，让首次用户不被吓到，power user 也能进阶。

## What Changes
- 锁定 Filter 维度（basic + advanced）
- 锁定 progressive disclosure 交互（默认显示 + 折叠展开）
- 锁定 filter 变更行为（自动重生成 + 轻动画）
- 锁定移动端 basic filters 折叠策略

## ADDED Requirements

### Requirement: Filter 维度
Filter SHALL 分两层：

**Basic filters（默认显示）：**
- Count（1 / 3 / 6，默认 6）
- Generation（Gen 1-9 chips，单选 + All）
- Type（18 个属性图标，单选 + All）

**Advanced filters（折叠按钮展开）：**
- Legendary（三态：Any / Include / Only）
- Shiny（二态：Off / On）
- Starter（二态：Off / On）

**不进 Phase 1 的维度（Phase 2 再考虑）：**
- Regions / Forms（Mega/Gigantamax/Regional Variants）/ Evolution / Gender / Minimum Stats / Natures / Ability / Display
- 理由：这些是 power user 才会用的，Phase 1 做了反而稀释首页"3 秒完成需求"的核心体验

#### Scenario: Basic filter 选择
- **WHEN** 用户点 "Gen 1" chip
- **THEN** Generation filter = "Gen 1"
- **AND** 结果自动重新生成（一只 Gen 1 的 Pokémon）

#### Scenario: Advanced filter 展开
- **WHEN** 用户点 "Advanced" 按钮
- **THEN** 展开 Legendary / Shiny / Starter 等选项
- **AND** 改任意选项后结果自动重新生成

### Requirement: Filter 变更行为
改任意 filter 后结果 SHALL 自动重新生成 + 轻动画过渡。
- 不需要用户重新点主 CTA
- 轻动画 = 卡片淡入淡出（200ms）
- 多 filter 同时调整时也立即重生（不防抖）

#### Scenario: 多 filter 调整
- **WHEN** 用户快速点 "Gen 1" 然后立即点 "Fire" type
- **THEN** 结果依次重新生成两次
- **AND** 每次都有轻动画过渡

### Requirement: 移动端 Filter
移动端 SHALL 把 basic filters 也折叠到 "Filters" 按钮后。
- 桌面端：basic 默认显示，advanced 折叠
- 移动端：basic + advanced 都折叠到 "Filters" 按钮
- 点击 "Filters" 按钮弹出 sheet 或下拉面板

#### Scenario: 移动端展开 filter
- **WHEN** 移动端用户点 "Filters" 按钮
- **THEN** 弹出 sheet 显示 basic + advanced 全部 filter
- **AND** 改 filter 后结果自动重新生成

## Open Questions
1. Type filter 单选 vs 多选？（推荐单选，简单；多选留给 Phase 2）
2. 移动端 sheet vs 下拉？（推荐 sheet，移动端 UX 更好）

## Resolved Decisions
- **Count 在 basic 还是 advanced？** → basic（1/3/6，默认 6）。理由：6 只是主场景，Count 切换不藏 advanced（见 product-overview Resolved Decisions #1）
- **默认数量 = 6 只**：Count filter 默认 6

## Related Specs
- [homepage-ui](../homepage-ui/spec.md) — Filter 区块在首页的位置
- [result-card-design](../result-card-design/spec.md) — 结果卡片如何响应 filter
