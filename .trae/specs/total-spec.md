# PokePicker Total Spec

Consolidated copy of all spec files for easy reading.

---

## ===== product-overview\spec.md =====

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
| Team builder | "给我随机一队 6 只" | 20% | ✅ 首页次要 CTA + /random-pokemon-team-generator |
| Starter 选择困难者 | "御三家选哪个" | 10% | ✅ /pokemon-starter-picker |
| Nuzlocke / 挑战者 | "随机挑战规则生成" | 5% | ❌ Phase 2 |
| 内容创作者 | "art prompt / drawing prompt" | 5% | ❌ Phase 2 |

## Differentiation
双驱动差异化（不互斥）：

### Driver 1: 极简 Apple UX
- 首页 3 秒完成需求（核心原则）
- 首页只做一件事：随机生成
- Filter 采用 progressive disclosure（basic 默认 + advanced 折叠）
- 文案品牌化："Pick a Pokémon" 而非 "Generate One"
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
- **AND** 点击后立即看到 1 张结果卡片
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

## Open Questions
1. Phase 1 工具页选 2 个还是 1 个？（当前推荐 2 个：team-generator + starter-picker）
2. **默认数量 1 vs 6 vs 3 只** — 不拍板，等用户做完 `random pokemon picker` / `random pokemon generator` / `pokemon team generator` 等关键词的搜索意图拆解后再定（基于数据，不凭感觉）
3. 隐式分享卡片的分享图生成方式（client-side canvas / server-side OG image）？留给 result-card-design spec
4. 多语言策略留给 Phase 3 还是提前规划？留给 seo-strategy spec

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

---

## ===== product-overview\tasks.md =====

# Tasks

- [ ] Task 1: 锁定产品总纲
  - [ ] SubTask 1.1: 确认 mission（"3 秒完成需求 + 结果值得分享"）
  - [ ] SubTask 1.2: 确认目标用户（5 类，Phase 1 覆盖前 3 类）
  - [ ] SubTask 1.3: 确认差异化双驱动（极简 UX 优先 + 隐式分享次之）
  - [ ] SubTask 1.4: 确认品牌 = PokePicker
  - [ ] SubTask 1.5: 确认技术栈 = Next.js App Router + PokeAPI + Vercel

- [ ] Task 2: 锁定 Phase 1 范围
  - [ ] SubTask 2.1: 确认 Phase 1 = 7 个 URL（首页 + 2 工具页 + 4 静态页）
  - [ ] SubTask 2.2: 确认无 blog（工具页打 SEO）
  - [ ] SubTask 2.3: 确认 2 个工具页选择（team-generator + starter-picker）

- [ ] Task 3: 解决跨模块 Open Questions
  - [ ] SubTask 3.1: 默认数量（1 只 vs 6 只 vs 3 只）— homepage-ui Discussion
  - [ ] SubTask 3.2: filter 变更行为（自动 + 轻动画）— filter-system Discussion
  - [ ] SubTask 3.3: 移动端 basic filters 折叠 — filter-system Discussion
  - [ ] SubTask 3.4: 分享图尺寸（1080x1080 vs 1200x630）— result-card-design Discussion
  - [ ] SubTask 3.5: API 是否真实现 — static-pages Discussion
  - [ ] SubTask 3.6: cookie 同意弹窗是否需要 — analytics Discussion

- [ ] Task 4: 完成所有子 spec（部分已完成）
  - [ ] SubTask 4.1: product-overview spec（已完成）
  - [ ] SubTask 4.2: sitemap-and-url-strategy spec（已完成）
  - [ ] SubTask 4.3: homepage-ui spec（已完成）
  - [ ] SubTask 4.4: filter-system spec（已完成）
  - [ ] SubTask 4.5: result-card-design spec（已完成）
  - [ ] SubTask 4.6: static-pages spec（已完成）
  - [ ] SubTask 4.7: tech-stack-and-architecture spec（已完成）
  - [ ] SubTask 4.8: seo-strategy spec（已完成）
  - [ ] SubTask 4.9: analytics-and-metrics spec（已完成）

- [ ] Task 5: 竞品调研（已完成 9 个）
  - [ ] SubTask 5.1: 9 个竞品调研已写入 sitemap-and-url-strategy spec
  - [ ] SubTask 5.2: 用户今晚再调研 10+ 海外工具站 — TBD

- [ ] Task 6: 删除旧 design-sitemap spec（内容已拆分到新模块）
  - [ ] SubTask 6.1: 删除 .trae/specs/design-sitemap/ 目录

# Task Dependencies
- Task 3（Open Questions）阻塞实施 spec
- Task 4（子 spec）已完成，可进入实施
- Task 5（调研）部分完成，SubTask 5.2 用户今晚完成
- Task 6 删除旧 spec 不阻塞，但应在实施前完成避免混淆

---

## ===== product-overview\checklist.md =====

# Product Spec Checklist（总纲）

## product-overview
- [ ] mission 已锁定（3 秒完成需求 + 结果值得分享）
- [ ] 目标用户已锁定（5 类，Phase 1 覆盖前 3 类）
- [ ] 差异化双驱动已锁定（极简 UX 优先 + 隐式分享次之）
- [ ] 品牌 = PokePicker 已锁定
- [ ] 技术栈 = Next.js App Router + PokeAPI + Vercel 已锁定
- [ ] Phase 1 范围已锁定（7 URL，无 blog）
- [ ] Phase 路线图已锁定（Phase 1 MVP / Phase 2 工具矩阵 / Phase 3 高级功能）

## sitemap-and-url-strategy
- [ ] Phase 1 sitemap 已锁定（7 URL）
- [ ] URL slug 规则已锁定（扁平 + 关键词全拼）
- [ ] 首页 SEO 定位已锁定（random pokemon picker 主关键词页）
- [ ] 9 个竞品调研已写入 spec
- [ ] Phase 2 工具页 URL 预留规则已锁定

## homepage-ui
- [ ] 5 屏 + Footer 结构已锁定
- [ ] Hero 区块（H1 + 双 CTA）已锁定
- [ ] Result 区块已锁定
- [ ] Filters 区块（progressive disclosure）已锁定
- [ ] Popular Tools 区块（Phase 1 占位）已锁定
- [ ] SEO 内容区块（3 区块）已锁定
- [ ] Footer 极简已锁定

## filter-system
- [ ] Filter 维度已锁定（basic = Gen + Type，advanced = Legendary + Shiny + Starter + Count）
- [ ] Progressive disclosure 交互已锁定
- [ ] Filter 变更行为（自动重生 + 轻动画）已锁定
- [ ] 移动端 basic filters 折叠已锁定

## result-card-design
- [ ] 默认卡片极简（5 信息）已锁定
- [ ] 属性配色系统（18 属性对应 18 颜色）已锁定
- [ ] Hover/Expand 行为已锁定
- [ ] 隐式分享卡片设计已锁定
- [ ] 分享图生成技术方案（client canvas）已锁定

## static-pages
- [ ] /about 内容大纲已锁定
- [ ] /privacy 内容大纲已锁定
- [ ] /contact 内容大纲已锁定
- [ ] /api 内容大纲已锁定

## tech-stack-and-architecture
- [ ] Next.js App Router 已锁定
- [ ] PokeAPI 数据源已锁定
- [ ] Vercel 部署已锁定
- [ ] 数据缓存策略（Vercel KV, TTL 24h）已锁定
- [ ] 性能目标已锁定

## seo-strategy
- [ ] 关键词簇已锁定（首页 + 2 工具页）
- [ ] 内链策略已锁定
- [ ] Schema markup 已锁定
- [ ] Sitemap.xml 生成策略已锁定

## analytics-and-metrics
- [ ] GA4 埋点已锁定
- [ ] 北极星指标（主 CTA 点击率 ≥ 40%）已锁定
- [ ] 转化漏斗已锁定
- [ ] 隐私合规已锁定

## 跨模块 Open Questions（阻塞实施）
- [ ] 默认数量（1 vs 6 vs 3 只）
- [ ] 分享图尺寸（1080x1080 vs 1200x630）
- [ ] API 是否真实现
- [ ] cookie 同意弹窗是否需要

## 旧 spec 清理
- [ ] design-sitemap spec 已删除（内容拆分到新模块）

---

## ===== sitemap-and-url-strategy\spec.md =====

# Sitemap and URL Strategy Spec

## Why
锁定站点 URL 结构 + 命名规则 + SEO scaffolding 规则，让所有工具页都能无侵入扩展，且每个工具页独立打一个长尾关键词簇。

## What Changes
- 锁定 Phase 1 sitemap（7 个 URL，无 blog）
- 锁定 URL slug 规则：扁平 + 完整关键词全拼
- 锁定 Phase 2 工具页 URL 预留规则
- 9 个竞品调研结果作为决策事实基础

## Competitor Research: 9 个竞品对比
（关键词 "random pokemon picker" Google 前十，基于实际访问 + 用户提供的流量数据）

### 竞品总览表

| # | 站点 | 月流量 | 上线 | 品牌策略 | 默认数量 | Filter 维度 | URL 结构 | Blog | 工具矩阵 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | randompokemonpicker.com | 164K | 2024/12 | 关键词做品牌（EMD） | 6（与单数 Hero 矛盾） | 12+ 类全平铺 | /tools/ 子目录 | 无 | 2 个 |
| 2 | randompokemon.com | 348 | 2012/4 | 关键词短域名 | 1-6 可选 | 极简（Regions+Types） | 扁平 | 无 | 无 |
| 3 | generate-random.org/pokemon | 114 | 2021/12 | 综合工具站子页 | 1/5/10/25/50/100 | 命令行风格 | /pokemon 子页 | 无 | 多 |
| 4 | randompokegen.cc | 5.77K | 2024/6 | 品牌词 | 1-9 可选 | 15+ 类爆炸 | /tools/ + 按数量拆页 | 无 | 多 |
| 5 | spinthewheel.app | 2.7M | 2018 | 转盘工具站子页 | 转盘 | 无 filter | /every-pokmon 子页 | 无 | 多 |
| 6 | cajunavenger.github.io | 408K | 2013 | 个人 github pages | 不详 | 不详 | 扁平 | 无 | 无 |
| 7 | randomizer.tech | 219 | 2025 | 科技感域名 | 1-12 可选 | 极简 | 扁平 + 关键词全拼 | 无 | 5+ |
| 8 | mystry-poke.com | 3.84K | 2026/05 | 品牌词 | 3 只（中间值） | 极简 | 扁平 | 5 篇 | 10+ |
| 9 | randompokemongenerators.net | 0 | 2026/05 | 关键词复数 | 双 CTA + Mode 切换 | 极简 | 扁平 + 关键词全拼 | 30+ 篇 | 5+ |

### 关键启示
1. **极简派排名更稳**：4 个极简派（#2/#7/#8/#9）排名都不错，2 个堆功能（#1/#4）反而用户体验差
2. **URL slug 用完整关键词全拼**：竞品 9 流量 0 排第九，纯靠 URL 结构 + 内容矩阵 — 关键词全拼 slug 对 SEO 有实证效果
3. **品牌词策略验证可行**：竞品 8 用品牌词 1 个月排第八，PokePicker 策略不变
4. **工具页矩阵是标准做法**：5/9 个竞品都有 5+ 工具，我们 Phase 1 起 2 个工具页合理

## ADDED Requirements

### Requirement: Phase 1 Sitemap
Phase 1 sitemap SHALL 包含以下 7 个 URL：

```
/                                       # 首页 = Random Pokemon Picker（主关键词页）
/random-pokemon-team-generator          # 工具页 1：打 "random pokemon team" 长尾词
/pokemon-starter-picker                 # 工具页 2：打 "pokemon starter" 长尾词
/about                                  # 项目故事 + mission
/privacy                                # 隐私政策
/contact                                # 联系方式
/api                                    # 公开 REST API 文档
```

无 /blog 路由（Phase 1 用工具页打 SEO，不靠 blog）。

#### Scenario: Phase 1 路由
- **WHEN** Phase 1 部署
- **THEN** 上述 7 个 URL 返回 200
- **AND** 其他所有路径（如 /blog、/legendary-pokemon-generator）不返回 200
- **AND** sitemap.xml 只列上述 7 个 URL

### Requirement: URL Slug 规则
URL slug SHALL 遵循"扁平 + 完整关键词全拼"规则。
- 扁平：不放在 /tools/ 子目录
- 完整关键词全拼：URL 直接对应目标关键词（如 /random-pokemon-team-generator 对应 "random pokemon team generator"）
- **与 H1/品牌解耦**：URL 服务 SEO，H1 服务品牌（如 URL = /pokemon-starter-picker，H1 = "Starter Picker — PokePicker"）

#### Scenario: 新增工具页 URL
- **WHEN** Phase 2 新增 /legendary-pokemon-generator
- **THEN** URL slug = "legendary pokemon generator" 关键词
- **AND** 不放在 /tools/ 子目录
- **AND** H1 = "Legendary Pokemon Generator — PokePicker"

### Requirement: 首页 SEO 定位
首页 `/` SHALL 是整站主关键词 "random pokemon picker" 的目标页。
- H1 包含 "Random Pokemon Picker"
- Meta title: "Random Pokemon Picker — PokePicker"
- Meta description: 一句话回答 "what is a random pokemon picker"
- 首页不另开 /random-pokemon 路径，避免和首页抢内容

#### Scenario: Google 爬取首页
- **WHEN** Googlebot 爬取 `/`
- **THEN** canonical = `/`
- **AND** H1 包含 "Random Pokemon Picker"
- **AND** 不存在 /random-pokemon 路径

### Requirement: Phase 2 工具页 URL 预留
Phase 2 候选工具页 URL（不进本 spec 范围，每个工具未来走自己的 spec）：
- /legendary-pokemon-generator
- /shiny-pokemon-generator
- /random-pokemon-by-type
- /random-pokemon-by-generation
- /pokemon-type-wheel（转盘，非 Picker 体系）

#### Scenario: Phase 2 工具上线
- **WHEN** Phase 2 第一个工具 /legendary-pokemon-generator 上线
- **THEN** 它套用与首页一致的页面模板
- **AND** 在首页 "Popular Tools" 区块加内链
- **AND** 加入 sitemap.xml

## Open Questions
1. Phase 1 选 2 个工具页还是 1 个？（当前推荐 2 个：team-generator + starter-picker）
2. 工具页是否使用与首页一致的模板？（推荐是，UI 一致性）

## Related Specs
- [product-overview](../product-overview/spec.md) — 总纲
- [homepage-ui](../homepage-ui/spec.md) — 首页 UI
- [seo-strategy](../seo-strategy/spec.md) — SEO 策略细节

---

## ===== homepage-ui\spec.md =====

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

---

## ===== filter-system\spec.md =====

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
- Generation（Gen 1-9 chips，单选 + All）
- Type（18 个属性图标，单选 + All）

**Advanced filters（折叠按钮展开）：**
- Legendary（三态：Any / Include / Only）
- Shiny（二态：Off / On）
- Starter（二态：Off / On）
- Count（1 / 3 / 6）

**不进 Phase 1 的维度（Phase 2 再考虑）：**
- Regions / Forms（Mega/Gigantamax/Regional Variants）/ Evolution / Gender / Minimum Stats / Natures / Ability / Display
- 理由：这些是 power user 才会用的，Phase 1 做了反而稀释首页"3 秒完成需求"的核心体验

#### Scenario: Basic filter 选择
- **WHEN** 用户点 "Gen 1" chip
- **THEN** Generation filter = "Gen 1"
- **AND** 结果自动重新生成（一只 Gen 1 的 Pokémon）

#### Scenario: Advanced filter 展开
- **WHEN** 用户点 "Advanced" 按钮
- **THEN** 展开 Legendary / Shiny / Starter / Count 等选项
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
2. Count 在 basic 还是 advanced？（推荐 advanced，首次用户不需要）
3. 移动端 sheet vs 下拉？（推荐 sheet，移动端 UX 更好）

## Related Specs
- [homepage-ui](../homepage-ui/spec.md) — Filter 区块在首页的位置
- [result-card-design](../result-card-design/spec.md) — 结果卡片如何响应 filter

---

## ===== result-card-design\spec.md =====

# Result Card Design Spec

## Why
结果卡片是用户截图分享的载体，是"真正的产品"。双驱动差异化：默认卡片极简（Apple 风格）+ 隐式分享卡片带装饰。当二者冲突时，默认极简优先。

## What Changes
- 锁定默认卡片信息层级（极简）
- 锁定属性配色规则
- 锁定 hover/展开行为
- 锁定隐式分享卡片设计（带装饰，点 share 才生成）
- 锁定分享图生成技术方案

## Default Card（极简版）

```
┌───────────────────────┐
│                       │
│       [图片]           │  ← 居中、占卡片 60% 高度
│                       │
│  ⚡ Pikachu           │  ← 属性图标 + 名字
│  Electric             │  ← 属性（主属性）
│  #025 · Gen I         │  ← Pokédex 编号 + 世代
│                       │
│  [Share]              │  ← 隐式分享按钮（小、不抢眼）
└───────────────────────┘
```

**信息层级（从上到下）：**
1. 图片（最大视觉重点）
2. 属性图标 + 名字（识别身份）
3. 属性文本（强化属性信息）
4. Pokédex 编号 + 世代（元信息，小字）
5. Share 按钮（隐藏在底部，不抢视觉）

**不在默认卡片显示的（避免信息过载）：**
- Height / Weight / Abilities / Weakness / Stats / Evolution
- 这些信息留给 hover/展开 或 detail page

## Attribute Color System
卡片 SHALL 使用属性配色（一眼区分属性）：
- Normal: 灰
- Fire: 红
- Water: 蓝
- Grass: 绿
- Electric: 黄
- Ice: 浅蓝
- Fighting: 深红
- Poison: 紫
- Ground: 棕
- Flying: 浅紫
- Psychic: 粉
- Bug: 浅绿
- Rock: 深灰
- Ghost: 深紫
- Dragon: 靛
- Dark: 黑
- Steel: 银灰
- Fairy: 粉红

**应用范围：**
- 属性图标颜色
- 属性文本颜色
- 卡片边框（细线，1px，不抢眼）
- 不应用在卡片背景（保持白色，Apple 极简）

## Hover/Expand Behavior
卡片 SHALL 支持 hover 展开额外信息：
- 桌面端：hover 卡片显示 Height / Weight / Abilities / Weakness
- 移动端：tap 卡片切换展开/收起
- 展开信息在卡片下方滑出（不改变卡片大小）

## Share Card（隐式分享版）

点 Share 按钮才生成，不污染默认显示：

```
┌───────────────────────────────────────┐
│  ┌─────────────────────────────────┐  │  ← 装饰背景（属性配色渐变 + 噪点质感）
│  │                                 │  │
│  │       [图片]                    │  │
│  │                                 │  │
│  │  ⚡ Pikachu                    │  │
│  │  Electric                      │  │
│  │  #025 · Gen I                  │  │
│  │                                 │  │
│  │  ─────────────────             │  │
│  │  Random Pokemon Picker          │  │  ← watermark
│  │  pokepicker.com                 │  │  ← URL
│  └─────────────────────────────────┘  │
└───────────────────────────────────────┘
```

**装饰元素：**
- 背景渐变（属性配色）
- 噪点质感（subtle noise texture，避免像网页截图）— pending Discussion
- 卡片边框加粗
- 底部 watermark：网站名 + URL

**生成方式：**
- 客户端 canvas 生成（html2canvas 或类似库）
- 分辨率：1080x1080（Instagram 友好）+ 1200x630（OG image 复用）— pending Discussion
- 格式：PNG

## Card Reveal Animation（抽卡式体验）
点击主 CTA 后 SHALL 触发"抽卡式"动画，总时长 ≤ 1 秒：

1. **按钮反馈（100ms）**：主 CTA 按钮轻微缩小（press 反馈）
2. **Loading（500ms）**：显示简洁 loading 指示（如旋转的 Pokéball 图标或骨架屏）
3. **卡片逐个弹出（400ms）**：
   - 默认 1 只：卡片从下方滑入 + 淡入
   - Team 模式（6 只）：卡片逐个出现（每张间隔 50ms），最后自动滚动到第一张
4. **总时长 ≤ 1 秒**（保住 3 秒原则）

理由：竞品 #1-9 全部是"点击 → 刷新 → 图片出现"，没人卷体验。抽卡式动画 = 差异化 + Google 停留时间提升。

#### Scenario: 首次用户点击主 CTA
- **WHEN** 用户点 "Pick a Pokémon"
- **THEN** 按钮轻微缩小（100ms）
- **AND** 显示 loading（500ms）
- **AND** 卡片滑入 + 淡入（400ms）
- **AND** 总时长 ≤ 1 秒
- **AND** 用户看到完整结果

## ADDED Requirements

### Requirement: Default Card 极简
默认结果卡片 SHALL 极简，只显示 5 个信息：
1. 图片（占 60% 高度）
2. 属性图标 + 名字
3. 属性文本
4. Pokédex 编号 + 世代
5. Share 按钮（小、不抢眼）

#### Scenario: 首次用户看默认卡片
- **WHEN** 用户首次生成结果
- **THEN** 看到极简卡片（5 个信息）
- **AND** 不被 Height/Weight/Stats 等信息淹没

### Requirement: 属性配色
卡片 SHALL 使用属性配色系统（18 个属性对应 18 个颜色）。
- 应用范围：属性图标、属性文本、卡片边框
- 不应用在卡片背景（保持白色）

### Requirement: Hover/Expand
卡片 SHALL 支持 hover 展开额外信息。
- 桌面端：hover 显示 Height / Weight / Abilities / Weakness
- 移动端：tap 切换展开/收起
- 展开信息在卡片下方滑出

### Requirement: 隐式分享
点 Share 按钮才生成带装饰的分享图。
- 装饰：属性配色渐变背景 + 边框 + watermark
- 生成方式：客户端 canvas（html2canvas 或类似）
- 分辨率：1080x1080
- 格式：PNG
- 不污染默认显示

#### Scenario: 用户分享
- **WHEN** 用户点 Share 按钮
- **THEN** 生成带装饰的分享图
- **AND** 提供下载或复制到剪贴板选项
- **AND** 默认卡片保持极简不变

## Open Questions
1. 单属性 vs 双属性 Pokémon 的配色处理？（推荐用主属性，副属性显示在文本）
2. 分享图尺寸：1080x1080（IG）vs 1200x630（OG）vs 都生成？
3. Share 按钮在桌面端 hover 还是常驻？（推荐常驻，但小）
4. canvas 生成性能（多卡片时）？
5. **默认卡片底色：纯白 vs 米白/奶白**（Gemini 建议）— 米白更高级但偏离 Apple 极简纯白
6. **分享卡片背景：扁平渐变 vs 毛玻璃（Glassmorphism）**（Gemini 提问）— 扁平更干净，毛玻璃更高级但可能过时
7. **噪点质感是否加**（Gemini 建议）— 避免"网页截图"感，但增加设计成本

## Related Specs
- [homepage-ui](../homepage-ui/spec.md) — 卡片在结果区的位置
- [filter-system](../filter-system/spec.md) — filter 变更后卡片如何响应

---

## ===== static-pages\spec.md =====

# Static Pages Spec

## Why
4 个静态页是 SEO + 信任建设的最低要求。内容极简，但每页都有明确目的。

## What Changes
- 锁定 4 个静态页的内容大纲
- 锁定每页的目标（SEO / 信任 / 沟通 / 开发者）

## Page Outlines

### /about — 项目故事
**目标：** 信任建设 + mission 传达

内容大纲：
- 项目 mission："做全网体验最好的 Pokémon 随机工具"
- 为什么做这个项目（差异化角度：极简 UX + 隐式分享）
- 技术栈说明（Next.js + PokeAPI，给开发者参考）
- 联系方式链接到 /contact
- 字数：≤ 300 字

### /privacy — 隐私政策
**目标：** 合规 + 信任

内容大纲：
- 无账号、无注册
- 不收集 PII（个人身份信息）
- 分析 cookie：Google Analytics（匿名数据）
- 不出售数据给第三方
- 联系方式链接到 /contact
- 字数：≤ 500 字

### /contact — 联系方式
**目标：** 用户沟通渠道

内容大纲：
- 联系邮箱（如 hello@pokepicker.com）
- 可选：简单表单（邮箱 + 消息）
- 社交链接（Twitter / GitHub，可选）
- 字数：极简

### /api — 公开 REST API 文档
**目标：** 开发者资源 + SEO（"pokemon api" 等关键词）

内容大纲：
- 端点列表（如 `GET /api/v1/pokemon/random`）
- 参数说明（generation, type, count 等）
- 响应格式（JSON schema）
- 限流说明（如 100 req/min）
- 示例代码（curl / JavaScript / Python）
- 字数：≥ 500 字（SEO 友好）

## ADDED Requirements

### Requirement: /about
/about SHALL 包含项目 mission + 差异化说明 + 技术栈说明，字数 ≤ 300 字。

### Requirement: /privacy
/privacy SHALL 声明无账号 + 不收集 PII + 分析 cookie 说明，字数 ≤ 500 字。

### Requirement: /contact
/contact SHALL 提供联系邮箱，可选表单。

### Requirement: /api
/api SHALL 提供公开 REST API 文档，包含端点 / 参数 / 响应格式 / 限流 / 示例代码，字数 ≥ 500 字。

## Open Questions
1. API 是否真的实现？（推荐 Phase 1 只写文档，Phase 2 实现，作为 SEO 内容）
2. Contact 表单 vs 纯邮箱链接？（推荐纯邮箱，简单）
3. About 是否加团队介绍？（推荐不加，个人项目极简）

## Related Specs
- [product-overview](../product-overview/spec.md) — mission 来源
- [seo-strategy](../seo-strategy/spec.md) — /api SEO 价值

---

## ===== tech-stack-and-architecture\spec.md =====

# Tech Stack and Architecture Spec

## Why
锁定技术栈和架构决策，让所有 spec 的技术假设一致。

## What Changes
- 锁定技术栈 = Next.js App Router + PokeAPI + Vercel
- 锁定数据源 = PokeAPI
- 锁定部署 = Vercel
- 锁定性能目标

## Tech Stack

### Framework: Next.js App Router
**理由：**
- App Router 支持 SSG（首页可静态化，性能极致）
- SEO 友好（metadata API、generateStaticParams、sitemap.xml 自动生成）
- React 生态成熟（后续加分享卡片等交互组件容易）
- Vercel 原生集成（部署简单）

**不选 Astro 的理由：**
- Astro 更适合纯内容站，我们的交互（filter、分享卡片、动态生成）较多
- React island 增加复杂度
- Next.js 生态更熟悉（假设）

### 数据源: PokeAPI
- 公开 REST API：https://pokeapi.co/
- 覆盖 1025+ Pokémon 全世代
- 不需要 API key
- 限流：300 req/min（足够）

**数据缓存策略：**
- 首次请求时 cache 到 Vercel KV 或 Redis
- TTL 24h（Pokémon 数据基本不变）
- 静态参数（如 Gen 1 列表）用 generateStaticParams 预生成

### 部署: Vercel
- 与 Next.js 原生集成
- Edge Network（CDN）
- 自动 HTTPS
- Preview 部署（每个 PR 一个 preview URL）

## Architecture

```
┌─────────────────────────────────────┐
│  Vercel Edge Network (CDN)         │
└─────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│  Next.js App Router                │
│  - SSG: 首页 + 静态页               │
│  - SSR: 工具页（动态 filter）        │
│  - API Routes: /api/v1/*           │
└─────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│  PokeAPI (外部数据源)               │
│  + Vercel KV (缓存层)               │
└─────────────────────────────────────┘
```

## Performance Targets
- 首页 LCP（Largest Contentful Paint）≤ 1.5s
- 首页 FID（First Input Delay）≤ 100ms
- 首页 CLS（Cumulative Layout Shift）≤ 0.1
- 工具页 LCP ≤ 2s

## ADDED Requirements

### Requirement: 技术栈
项目 SHALL 使用 Next.js App Router + PokeAPI + Vercel 部署。

### Requirement: 数据缓存
PokeAPI 数据 SHALL 缓存到 Vercel KV，TTL 24h。

### Requirement: 性能目标
- 首页 LCP ≤ 1.5s
- 工具页 LCP ≤ 2s

## Open Questions
1. 是否需要 Vercel KV（付费）？或用 in-memory cache？
2. 分享卡片 canvas 生成是否影响性能？
3. 是否需要图像优化（next/image）？

## Related Specs
- [product-overview](../product-overview/spec.md) — 技术栈决策来源
- [result-card-design](../result-card-design/spec.md) — canvas 生成性能

---

## ===== seo-strategy\spec.md =====

# SEO Strategy Spec

## Why
无 blog，用工具页打 SEO。每个工具页 = 一个关键词簇。需要锁定关键词簇、内链策略、schema markup。

## What Changes
- 锁定关键词簇（首页 + 2 工具页）
- 锁定内链策略
- 锁定 schema markup
- 锁定 sitemap.xml 生成策略

## Keyword Clusters

### 首页 / （主关键词页）
**目标关键词：** random pokemon picker
**辅助关键词：**
- random pokemon generator
- random pokemon
- pokemon randomizer
- random pokémon picker

**H1：** "Random Pokemon Picker"
**Meta title：** "Random Pokemon Picker — PokePicker"
**Meta description：** "Generate a random Pokémon instantly. Free, no login, all 1025 Pokémon across 9 generations."

### /random-pokemon-team-generator
**目标关键词：** random pokemon team generator
**辅助关键词：**
- random pokemon team
- pokemon team generator
- random team of 6 pokemon
- pokemon team randomizer

**H1：** "Random Pokemon Team Generator — PokePicker"
**Meta title：** "Random Pokemon Team Generator — PokePicker"
**Meta description：** "Build a random team of 6 Pokémon instantly. Filter by generation, type, and legendary status."

### /pokemon-starter-picker
**目标关键词：** pokemon starter picker
**辅助关键词：**
- pokemon starter generator
- random starter pokemon
- starter pokemon picker
- random starter picker

**H1：** "Pokemon Starter Picker — PokePicker"
**Meta title：** "Pokemon Starter Picker — PokePicker"
**Meta description：** "Pick a random starter Pokémon from any generation. Perfect for challenge runs and new playthroughs."

## Internal Linking

### 首页内链
- 首页 → 工具页（Popular Tools 区块，2 个已上线 + 2 个 Coming soon）
- 首页 → 静态页（Footer）
- 首页 → /api（Footer + SEO 内容区块）

### 工具页内链
- 工具页 → 首页（Header logo）
- 工具页 → 兄弟工具页（Popular Tools 区块）
- 工具页 → 静态页（Footer）

### 静态页内链
- 静态页 → 首页（Header logo）
- 静态页 → 工具页（About 可链到工具页作为产品介绍）

## Schema Markup

### 首页
- FAQ JSON-LD（5 问 FAQ）
- Organization JSON-LD（PokePicker 品牌）

### 工具页
- WebApplication JSON-LD
- FAQ JSON-LD（每工具页 5 问 FAQ）

### 静态页
- Organization JSON-LD（About 页）

## SEO Technical Checklist（每个页面都必须配置）

每个页面 SHALL 配置以下技术元素，Cursor 可直接照此生成：

- **canonical** — 自引用 canonical URL（如首页 `<link rel="canonical" href="https://pokepicker.com/" />`）
- **meta title** — 包含目标关键词（≤ 60 字符）
- **meta description** — 包含目标关键词，一句话回答页面价值（≤ 160 字符）
- **og:title / og:description / og:image / og:url / og:type** — Open Graph 标签全套
  - og:image 尺寸 1200x630，品牌水印 + 页面主题视觉
  - og:type = "website"（首页）或 "article"（工具页）
- **twitter:card** — "summary_large_image"（大图卡片）
- **twitter:title / twitter:description / twitter:image** — 与 og 一致
- **hreflang** — Phase 1 只有 en，Phase 3 加多语言后再配
- **robots meta** — "index, follow"（默认）；未上线页 "noindex"
- **JSON-LD** — 按页面类型配（见 Schema Markup 节）

#### Scenario: 工具页技术配置
- **WHEN** /random-pokemon-team-generator 上线
- **THEN** canonical = "https://pokepicker.com/random-pokemon-team-generator"
- **AND** og:image = 1200x630 含 PokePicker logo + Team 主题视觉
- **AND** twitter:card = "summary_large_image"
- **AND** JSON-LD 含 WebApplication + FAQ schema

## Core SEO Principle: Every Page Must Deserve to Rank
每个页面 SHALL 在创建前回答一个问题：

> **为什么 Google 应该把这个页面排在第一？**

如果回答不出，就不做这个页面。

#### Scenario: 新增工具页前的资格审查
- **WHEN** 提议新增 /legendary-pokemon-generator
- **THEN** 必须回答："这个页面比首页更专业在哪？"
  - 更多 Legendary 专属 filter？（如 Only Mythical / Only Sub-Legendary）
  - 更多导出？（如 Showdown 格式）
  - 更多分享卡片变体？
- **AND** 回答不出 = 不做，或调整方案直到能回答

理由：避免工具页 = 首页复制品。Google 不会因为 URL 多就给排名，只会因为页面比竞品更专业才给排名。

## Sitemap.xml
- 自动生成（Next.js generateSitemaps）
- Phase 1 只列 7 个 URL
- Phase 2 工具上线后自动加入

## robots.txt
```
User-agent: *
Allow: /
Sitemap: https://pokepicker.com/sitemap.xml
```

## ADDED Requirements

### Requirement: 关键词簇
每个工具页 SHALL 对应一个关键词簇，H1 + meta title + meta description 包含目标关键词。

### Requirement: 内链策略
每页 SHALL 链向兄弟工具页 + 首页 + 静态页。

### Requirement: Schema Markup
- 首页 + 工具页 SHALL 含 FAQ JSON-LD
- 首页 SHALL 含 Organization JSON-LD
- 工具页 SHALL 含 WebApplication JSON-LD

### Requirement: Sitemap.xml
Sitemap.xml SHALL 自动生成，Phase 1 只列 7 个 URL。

## Open Questions
1. 多语言策略（i18n）？（推荐 Phase 1 不做，Phase 3 再考虑）
2. 是否做 keyword cannibalization 检查（首页 vs 工具页是否抢词）？
3. 是否需要 backlink 策略？

## Related Specs
- [sitemap-and-url-strategy](../sitemap-and-url-strategy/spec.md) — URL 结构
- [homepage-ui](../homepage-ui/spec.md) — SEO 内容区块位置
- [static-pages](../static-pages/spec.md) — /api SEO 价值

---

## ===== analytics-and-metrics\spec.md =====

# Analytics and Metrics Spec

## Why
无埋点 = 无从优化。需要锁定埋点 + 核心指标 + 转化漏斗，让产品迭代有数据依据。

## What Changes
- 锁定埋点方案（Google Analytics 4）
- 锁定核心指标
- 锁定转化漏斗
- 锁定隐私合规（无 cookie 同意弹窗 vs 需要）

## Analytics Tool
- Google Analytics 4（GA4）
- 理由：免费、标准、和 Google Search Console 集成
- 匿名数据（不收集 PII）
- 不需要 cookie 同意弹窗（如果只收集匿名数据且不卖给第三方，根据大部分地区法规可豁免，但需在 /privacy 声明）

## Core Metrics

### 北极星指标
**主 CTA 点击率** = 主 CTA 点击次数 / 首页 UV
- 目标：≥ 40%（首次用户中至少 40% 点 CTA）

### 核心指标
- 首页 UV / PV
- 主 CTA 点击率
- 结果生成次数
- Re-roll 点击率
- Share 按钮点击率
- 工具页 UV（/random-pokemon-team-generator、/pokemon-starter-picker）
- 工具页 → 首页跳转率
- FAQ 区块滚动到达率
- 移动端 / 桌面端 UV 占比

### SEO 指标（Google Search Console）
- 关键词排名
- 点击率（CTR）
- 展示量
- 平均排名位置

## Conversion Funnel

```
1. 访问首页（UV）
    ↓
2. 滚动到 Hero（看到 CTA）
    ↓
3. 点击主 CTA（Pick a Pokémon）
    ↓
4. 看到结果卡片
    ↓
5. （可选）点 Re-roll
    ↓
6. （可选）点 Share
    ↓
7. （可选）访问工具页
```

每一步都需要埋点，漏斗转化率 = 当前步骤用户数 / 上一步用户数。

## Events to Track

### 首页
- `page_view`（GA4 自动）
- `cta_click`（主 CTA）
- `cta_secondary_click`（次要切换 Pick a Team）
- `result_generated`（结果生成）
- `reroll_click`（Re-roll）
- `share_click`（Share 按钮）
- `filter_change`（filter 变更，含 filter name + value）
- `advanced_expand`（Advanced 按钮展开）
- `faq_expand`（FAQ 展开）
- `tool_card_click`（Popular Tools 区块点击）
- `coming_soon_click`（Coming soon 占位点击）

### 工具页
- `page_view`
- `tool_cta_click`
- `tool_result_generated`
- `tool_back_to_home`（返回首页）

## ADDED Requirements

### Requirement: 埋点
所有上述事件 SHALL 通过 GA4 埋点。

### Requirement: 北极星指标
主 CTA 点击率 SHALL 作为北极星指标，目标 ≥ 40%。

### Requirement: 转化漏斗
首页 → 主 CTA → 结果 → Re-roll → Share → 工具页 SHALL 完整埋点，每步转化率可计算。

### Requirement: 隐私合规
埋点 SHALL 不收集 PII，/privacy 页 SHALL 声明分析 cookie 使用。

## Open Questions
1. 是否需要 cookie 同意弹窗？（推荐不需要，匿名数据 + 不出售）
2. 是否需要 A/B 测试工具？（推荐 Phase 2 再考虑）
3. 是否需要热力图（Hotjar 等）？（推荐 Phase 2 再考虑）

## Related Specs
- [product-overview](../product-overview/spec.md) — mission 来源
- [static-pages](../static-pages/spec.md) — /privacy 隐私声明

---

