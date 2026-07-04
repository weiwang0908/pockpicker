# PokePicker Product Overview Spec

## Why
做一个"全网体验最好的 Pokémon 随机工具"。不是工具页面堆功能，而是产品。
- 极简 Apple 风格：打开首页 0 学习成本，5 岁孩子都会用
- 结果卡片可分享：生成结果是用户截图传播的载体，是真正的"产品"
- 工具页打 SEO：用独立 URL 的工具矩阵吃长尾关键词，不靠 blog

## What Changes
- 锁定项目 mission、目标用户、差异化定位
- 锁定 Phase 路线图（Phase 1 = 标准 MVP：首页 + 1-2 工具页 + 4 静态页，无 blog）
- 锁定技术栈 = Next.js App Router
- 锁定品牌 = PokePicker
- 锁定差异化双驱动：极简 UX + 隐式分享卡片
- 串联所有子 spec（sitemap / homepage-ui / filter-system / result-card-design / static-pages / tech-stack / seo-strategy / analytics）

## Mission
> 做 3 秒内完成需求的 Pokémon 随机工具，且结果值得分享。

## 产品定位统一
首页定位 = **Random Pokemon Picker**（核心关键词 random pokemon picker）。
- 首页默认行为 = 抽 6 只（Count filter 默认 6，可切换 1/3/6）
- 工具页 /random-pokemon-team-generator 服务关键词 random pokemon team generator（独立 URL，强制 6 只）
- 工具页 /pokemon-starter-picker 服务关键词 pokemon starter picker（独立 URL，强制 starter=true）

**禁止的行为：**
- 首页 H1 写 "Team Generator"（与工具页定位混淆）
- README 或外部描述把首页称为 "Team Picker"

## Product Principles（永不跑偏的锚）
所有功能决策 SHALL 通过以下 6 条原则检验。任一不满足 = 不做。

1. **不需要登录** — 永远无账号、无注册、无付费墙
2. **一屏完成** — 核心需求在首屏 3 秒内完成，不强制滚动
3. **一个页面一个关键词** — 每个页面只服务一个目标关键词簇，不混杂
4. **不出现弹窗** — 无 cookie 同意弹窗、无退出意图弹窗、无 newsletter 强推
5. **不需要教程** — 5 岁孩子都会用，0 学习成本
6. **手机优先** — 移动端 UX 优先于桌面端，移动端寸土寸金

#### Scenario: 新功能过原则检验
- **WHEN** 提议新功能
- **THEN** 必须通过上述 6 条原则全部检验
- **AND** 任一不满足则不做，或调整方案直到满足

## Target Users
按使用意图分组（基于 9 个竞品调研发现的真实场景）：

| 用户群 | 意图 | 占比预估 | Phase 1 是否覆盖 |
| --- | --- | --- | --- |
| Casual 随机玩家 | "给我随机一只 Pokémon" | 60% | ✅ 首页主流程 |
| Team builder | "给我随机一队 6 只" | 20% | ✅ 首页 Count=6 + /random-pokemon-team-generator |
| Starter 选择困难者 | "御三家选哪个" | 10% | ✅ /pokemon-starter-picker |
| Nuzlocke / 挑战者 | "随机挑战规则生成" | 5% | ❌ Phase 2 |
| 内容创作者 | "art prompt / drawing prompt" | 5% | ❌ Phase 2 |

## Differentiation
双驱动差异化（不互斥）：

### Driver 1: 极简 Apple UX
- 首页 3 秒完成需求（核心原则）
- 首页只做一件事：随机生成
- Filter 采用 progressive disclosure（basic 默认 + advanced 折叠）
- 文案品牌化："Pick Random Pokémon" 而非 "Generate One"
- **优先级最高**：当与分享功能冲突时，分享让步

### Driver 2: 隐式分享卡片
- 默认结果卡片保持极简（Apple 风格）
- 点 "Share" 按钮才生成带装饰的分享图（属性配色背景 + logo watermark + 卡片信息）
- 分享图不污染默认显示
- **优先级次之**：装饰元素在 share 路径才出现

### 与 9 个竞品的差异化对比
| 竞品 | 卖点 | 我们的差异 |
| --- | --- | --- |
| #1 randompokemonpicker.com | EMD 品牌 + filter 堆功能 | 我们：极简 + 分享 |
| #3 generate-random.org | CSPRNG（密码学随机） | 我们：UX 优先于技术炫技 |
| #7 randomizer.tech | export to Showdown | 我们：场景通用，不绑单一场景 |
| #9 randompokemongenerators.net | 多语言 + 30+ blog | 我们：无 blog，工具页打 SEO |

## Brand
- **品牌名：** PokePicker
- **理由：** 长期多工具扩展友好（Starter Picker / Legendary Picker 都能纳入品牌体系）；竞品 8 用品牌词 "mystry-poke" 1 个月排第八，品牌词策略验证可行
- **放弃 EMD 红利：** 竞品 1 用关键词做品牌吃 EMD，但 Google 长期弱化 EMD，PokePicker 长期扩展优势 > 短期 EMD 红利
- **URL slug 和品牌解耦：** URL 用完整关键词全拼（SEO 服务），H1/品牌用 PokePicker 体系（品牌服务）

## Tech Stack
- **Framework：** Next.js App Router
- **数据源：** PokeAPI（公开 REST，覆盖 1025+ Pokémon 全世代）
- **部署：** Vercel（与 Next.js 原生集成，SSR/SSG 都支持）
- **理由：**
  - App Router 支持 SSG（首页可静态化，性能极致）
  - SEO 友好（metadata API、generateStaticParams、sitemap.xml 自动生成）
  - React 生态成熟（后续加分享卡片等交互组件容易）
- 详细技术决策见 `tech-stack-and-architecture/spec.md`

## Phase Roadmap

### Phase 1: 标准 MVP（无 blog，工具页打 SEO）
**目标：** 首页体验立住 + 1-2 个工具页吃长尾关键词

页面清单：
```
/                                       # 首页 = random pokemon picker 主关键词页
/random-pokemon-team-generator          # 工具页 1：打 "random pokemon team" 长尾词
/pokemon-starter-picker                # 工具页 2：打 "pokemon starter" 长尾词
/about                                  # 静态页
/privacy                                # 静态页
/contact                                # 静态页
/api                                    # 静态页（API 文档）
```

**为什么 2 个工具页（不是 0 也不是 5）：**
- 0 个：首页孤岛，SEO 长尾词全部放弃
- 2 个：team-generator（高搜索量）+ starter-picker（高搜索量），双保险打两个长尾词簇
- 5 个：Phase 1 工作量爆炸，且每个工具页质量难保证

**为什么不要 blog：**
- 工具页本身就能打 SEO（每个工具页 = 一个关键词簇）
- Blog 内容生产成本高，Phase 1 资源不够
- 竞品 9 用 30+ blog 排第九，说明 blog 不是必需，工具页 SEO 路径可行
- 留给后续 content spec 讨论

### Phase 2: 工具矩阵扩展
**目标：** 覆盖更多长尾关键词簇

候选工具页（每个独立 spec）：
- /legendary-pokemon-generator
- /shiny-pokemon-generator
- /random-pokemon-by-type
- /random-pokemon-by-generation
- /pokemon-type-wheel（转盘，非 Picker 体系）

### Phase 3+: 高级功能
- 分享卡片高级版（自定义背景、字体）
- Nuzlocke challenge 模式
- 收藏夹（save 生成结果）
- 多语言

## ADDED Requirements

### Requirement: 项目 Mission
项目 SHALL 遵循"3 秒完成需求 + 结果值得分享"双驱动 mission。
- 3 秒原则：首页 Hero → 主 CTA → 结果，全程 0 滚动 0 学习成本
- 分享原则：结果卡片支持隐式分享（点 share 才生成装饰版）

#### Scenario: 首次用户完成核心需求
- **WHEN** 首次用户访问 `/`
- **THEN** 看到 Hero + 主 CTA
- **AND** 点击后立即看到 6 张结果卡片
- **AND** 全程 ≤ 3 秒

### Requirement: Phase 1 范围
Phase 1 SHALL 交付 7 个 URL（首页 + 2 工具页 + 4 静态页），无 blog。
- `/`（首页）
- `/random-pokemon-team-generator`（工具页 1）
- `/pokemon-starter-picker`（工具页 2）
- `/about`、`/privacy`、`/contact`、`/api`（静态页）

#### Scenario: Phase 1 不存在 blog
- **WHEN** Phase 1 部署
- **THEN** /blog 路径不返回 200
- **AND** 也不在 sitemap.xml 中列出

### Requirement: 技术栈
项目 SHALL 使用 Next.js App Router + PokeAPI + Vercel 部署。
- 详细决策见 tech-stack-and-architecture spec

### Requirement: 品牌一致性
所有页面 SHALL 遵循 PokePicker 品牌体系。
- URL slug 用完整关键词全拼（SEO 服务）
- H1/页面标题用 PokePicker 品牌体系（如 "Random Pokemon Picker — PokePicker"）
- 两者解耦

## Resolved Decisions

以下 4 个决策已由用户拍板，所有子 spec 须保持一致：

### Decision 1: 默认数量 = 6 只
- **决策：** 首页默认抽 6 只 Pokémon，Count filter 可切换 1/3/6（默认 6）。Count 切换放在 basic filters（不藏 advanced）。
- **理由：** 6 只视觉效果最好，符合 Team Challenge / Nuzlocke 主场景，更有分享价值。
- **影响 spec：** homepage-ui / filter-system

### Decision 2: 分享图尺寸 = 1200x630（OG）+ 1080x1080（Share）
- **决策：** 两个尺寸，用途不混用。1200x630 = Open Graph 标准（影响 SEO 和社交分享预览）；1080x1080 = 用户点击 Share 后生成的队伍图片。
- **理由：** 1200x630 是 OG 标准影响分享预览，1080x1080 用于用户生成的队伍图，二者职责不同。
- **影响 spec：** result-card-design

### Decision 3: API 真实现 PokeAPI
- **决策：** 直接用 PokeAPI（免费、稳定、数据完整），加一层封装 `lib/pokeapi/client.ts`，以后换数据源不用改业务代码。已实现。
- **理由：** PokeAPI 免费稳定、覆盖全世代；封装层保证未来可替换数据源。
- **影响 spec：** tech-stack-and-architecture

### Decision 4: 不做 Cookie 弹窗
- **决策：** V1 只用 GA4 匿名分析，不投广告、不做营销 Cookie。等以后接入 Google Ads / Facebook Pixel 再补 cookie 同意弹窗。
- **理由：** 符合 Product Principle #4（不出现弹窗）。V1 无广告无营销 Cookie，无需同意弹窗。
- **影响 spec：** tech-stack-and-architecture

## Open Questions
1. Phase 1 工具页选 2 个还是 1 个？（当前推荐 2 个：team-generator + starter-picker）
2. 隐式分享卡片的分享图生成方式（client-side canvas / server-side OG image）？尺寸已决策（见 Resolved Decisions #2），生成方式待定。留给 result-card-design spec
3. 多语言策略留给 Phase 3 还是提前规划？留给 seo-strategy spec

## Related Specs
- [sitemap-and-url-strategy](../sitemap-and-url-strategy/spec.md) — URL 结构 + 路由
- [homepage-ui](../homepage-ui/spec.md) — 首页 UI 设计
- [filter-system](../filter-system/spec.md) — Filter 维度 + 交互
- [result-card-design](../result-card-design/spec.md) — 结果卡片设计 + 分享
- [static-pages](../static-pages/spec.md) — 静态页内容大纲
- [tech-stack-and-architecture](../tech-stack-and-architecture/spec.md) — 技术栈决策
- [seo-strategy](../seo-strategy/spec.md) — SEO 策略
- [analytics-and-metrics](../analytics-and-metrics/spec.md) — 埋点 + 指标

## Competitor Research Reference
9 个竞品调研结果已整合到 [sitemap-and-url-strategy/spec.md](../sitemap-and-url-strategy/spec.md) 的 Competitor Research 节，作为所有模块决策的事实基础。
