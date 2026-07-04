# Homepage UI Spec

## Why
首页是整站最重要的一屏。3 秒完成需求 + Apple 极简风格 + 隐式分享。所有设计决策围绕"用户不用思考"展开。

## What Changes
- 锁定首页 5 屏结构（Hero / Result / Filters / Popular Tools / FAQ + Footer）
- 锁定主 CTA + 次要切换双 CTA 方案
- 锁定默认数量 = 1 只
- 锁定 Filters 位置 = 结果下方 + progressive disclosure
- 锁定结果卡片默认极简 + 隐式分享按钮

## Page Structure（5 屏 + Footer）

### 第一屏: Hero
```
┌─────────────────────────────────────┐
│           🎲 PokePicker             │
│                                     │
│       Random Pokemon Picker         │
│                                     │
│  Generate a random Pokémon instantly │
│  Perfect for challenges, team       │
│  building and fun.                 │
│                                     │
│       [ Pick a Pokémon ]            │  ← 主 CTA，默认 1 只
│         Pick a Team                 │  ← 次要切换，6 只
│                                     │
└─────────────────────────────────────┘
```

- H1 = "Random Pokemon Picker"（含主关键词）
- 主 CTA：「Pick a Pokémon」- 大按钮、醒目颜色、点击后平滑滚动到结果区
- 次要切换：「Pick a Team」- 文字按钮或次级按钮，点击切换到 6 只模式
- 不跳页：点击后平滑滚动到第二屏

### 第二屏: Result
```
┌─────────────────────────────────────┐
│           Your Pokémon              │
│                                     │
│      ┌───────────────────┐          │
│      │  ⚡ Pikachu       │          │  ← 结果卡片
│      │  Electric         │          │
│      │  [图片]            │          │
│      │  #025 · Gen I     │          │
│      │  [Share]          │          │  ← 隐式分享按钮
│      └───────────────────┘          │
│                                     │
│        [ Re-roll ]                  │  ← 重新随机
│                                     │
└─────────────────────────────────────┘
```

- 默认显示 1 张卡片（pending Discussion 4 - 默认数量）
- 卡片信息层级见 result-card-design spec
- Re-roll 按钮重新生成（不重置 filter）
- Share 按钮生成带装饰的分享图（隐式触发，不污染默认显示）

### 第三屏: Filters（Progressive Disclosure）
```
┌─────────────────────────────────────┐
│  Generation: [All] [1] [2] ... [9]  │  ← Basic，默认显示
│  Type: [All] 🔥 💧 🌿 ... 🧚        │  ← Basic，默认显示
│                                     │
│         [ ▼ Advanced ]              │  ← 折叠按钮
└─────────────────────────────────────┘
```

展开 Advanced 后：
```
┌─────────────────────────────────────┐
│  Generation: [All] [1] [2] ... [9]  │
│  Type: [All] 🔥 💧 🌿 ... 🧚        │
│         [ ▲ Advanced ]               │
│  ─────────────────────────────────  │
│  Legendary: [Any] [Include] [Only]  │
│  Shiny:     [Off] [On]              │
│  Starter:   [Off] [On]              │
│  Count:     [1] [3] [6]             │
└─────────────────────────────────────┘
```

- Basic filters 默认可见：Generation（Gen 1-9 chips）+ Type（属性图标）
- Advanced filters 折叠：Legendary / Shiny / Starter / Count
- 改任意 filter 后结果自动重新生成 + 轻动画（pending Discussion 7）
- 详细交互见 filter-system spec

### 第四屏: Popular Tools（Phase 1 占位）
```
┌─────────────────────────────────────┐
│  Popular Tools                      │
│                                     │
│  ┌─────────────┐ ┌─────────────┐   │
│  │ Team        │ │ Starter     │   │  ← Phase 1 已上线工具
│  │ Generator   │ │ Picker      │   │
│  │ [Visit]     │ │ [Visit]     │   │
│  └─────────────┘ └─────────────┘   │
│                                     │
│  ┌─────────────┐ ┌─────────────┐   │
│  │ Legendary   │ │ Shiny       │   │  ← Phase 2 Coming soon 占位
│  │ Generator   │ │ Generator   │   │  （不链向未上线 URL）
│  │ Coming soon │ │ Coming soon │   │
│  │ [Notify me] │ │ [Notify me] │   │  ← 邮件订阅入口
│  └─────────────┘ └─────────────┘   │
└─────────────────────────────────────┘
```

- Phase 1 显示 2 个已上线工具 + 2 个 Coming soon 占位
- Coming soon 不链向未上线 URL（避免 404 / 索引未发布页）
- **每个 Coming soon 含邮件订阅入口**（"Notify me when launched"）
- **Phase 2 优先级规则**：邮件订阅数多的工具优先开发（数据驱动，不凭感觉）

### 第五屏: SEO 内容区块（不只 FAQ）
```
┌─────────────────────────────────────┐
│  What is a Random Pokemon Picker?   │  ← 区块 1
│  A random Pokemon picker is...      │
│                                     │
│  Popular Uses                       │  ← 区块 2
│  - Team building                    │
│  - Nuzlocke challenges              │
│  - Art prompts                      │
│  - Drawing inspiration              │
│                                     │
│  FAQ                                │  ← 区块 3
│  Q1: What is a random Pokemon...?   │
│  Q2: How does it work?              │
│  Q3: Can I pick a generation?       │
│  Q4: Can I exclude legendaries?     │
│  Q5: Is it free?                    │
└─────────────────────────────────────┘
```

- 区块 1："What is"（回答 what is 类长尾查询）
- 区块 2："Popular Uses"（回答 use case 类长尾查询）
- 区块 3：5 问 FAQ（覆盖关键词簇长尾问题）
- 每问回答 ≤ 100 字，整区块 ≤ 500 字
- 配 FAQ JSON-LD schema markup
- 详细内容见 seo-strategy spec

### Footer（极简）
```
┌─────────────────────────────────────┐
│  PokePicker                         │
│  About · Privacy · Contact · API   │
└─────────────────────────────────────┘
```

## ADDED Requirements

### Requirement: Hero 区块
首页 Hero SHALL 包含：
- H1 = "Random Pokemon Picker"（含主关键词）
- 副标 = 一句话价值主张（"Generate a random Pokémon instantly. Perfect for challenges, team building and fun."）
- 主 CTA：「Pick a Pokémon」（默认出 1 只）
- 次要切换：「Pick a Team」（出 6 只）
- 不跳页：点击后平滑滚动到结果区

#### Scenario: 首次用户完成核心需求
- **WHEN** 首次用户访问 `/`
- **THEN** 看到 Hero + 主 CTA
- **AND** 点击 "Pick a Pokémon" 后平滑滚动到结果区
- **AND** 默认显示 1 张结果卡片
- **AND** 全程 ≤ 3 秒

### Requirement: Result 区块
结果区 SHALL 包含：
- 结果卡片（默认 1 张，pending filter count）
- Re-roll 按钮（重新随机，不重置 filter）
- Share 按钮（生成带装饰的分享图）
- 详细卡片设计见 result-card-design spec

### Requirement: Filters 区块（Progressive Disclosure）
Filters 区块 SHALL 采用 progressive disclosure：
- Basic filters 默认可见：Generation + Type
- Advanced filters 折叠在按钮后：Legendary + Shiny + Starter + Count
- 改任意 filter 后结果自动重新生成 + 轻动画
- 详细交互见 filter-system spec

### Requirement: Popular Tools 区块
首页 SHALL 含 Popular Tools 区块：
- Phase 1 显示 2 个已上线工具（Team Generator + Starter Picker）
- Phase 1 含 2 个 Coming soon 占位（Legendary + Shiny）
- Coming soon 不链向未上线 URL
- Phase 2 工具上线后替换 Coming soon 占位

### Requirement: SEO 内容区块
首页 SHALL 含 3 个 SEO 内容区块：
- 区块 1："What is a Random Pokemon Picker"
- 区块 2："Popular Uses"
- 区块 3：5 问 FAQ + JSON-LD schema markup
- 详细内容见 seo-strategy spec

### Requirement: Footer
Footer SHALL 极简，包含 4 个链接：About / Privacy / Contact / API。

## Open Questions
1. 默认数量 1 只 vs 6 只 vs 3 只？（推荐 1 只，匹配主关键词单数）
2. 改 filter 后自动重生成 vs 手动？（推荐自动 + 轻动画）
3. 移动端 basic filters 是否折叠？（推荐是）
4. Coming soon 占位是否加邮件订阅？（推荐是，收集需求信号）

## Related Specs
- [product-overview](../product-overview/spec.md) — 总纲
- [filter-system](../filter-system/spec.md) — Filter 交互细节
- [result-card-design](../result-card-design/spec.md) — 结果卡片设计
- [seo-strategy](../seo-strategy/spec.md) — SEO 内容区块细节
