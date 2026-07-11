# Pokemon Natures Spec

## Why

`pokemon natures` 月搜索量 60,500，是高价值信息型关键词。搜索意图与首页（随机生成）和 team-builder（组队分析）完全不同：

| 维度 | random pokemon picker（首页） | pokemon team builder | pokemon natures（新页面） |
|---|---|---|---|
| 搜索意图 | 工具型：给我随机结果 | 工具型：分析我的队伍 | 信息型：查性格列表/效果 |
| 用户目标 | 灵感、随机性 | 组队查漏补缺 | 查表、理解机制、找最佳性格 |
| 核心动作 | 点一下出结果 | 手动选 6 只 | 搜索/筛选 25 个性格 + 推荐最佳 |
| 用户心态 | "给我惊喜" | "帮我分析队伍" | "Adamant 加什么减什么？" |

对标站 `pokemondb.net/mechanics/natures` 是纯静态表格（5×5 矩阵 + 字母表），无任何交互、无最佳性格推荐、无移动端优化、无 SEO FAQ 内容。

**差异化机会：**
- 对标站是纯 wiki 表格 — 我们加交互式性格查找器 + 最佳性格推荐器
- 对标站无"该用什么性格"的推荐 — 我们基于种族值推荐最佳性格（核心差异化）
- 对标站无移动端优化 — 我们移动端优先
- 对标站无 SEO 内容 — 我们加 FAQ + What is + How to choose + 竞技指南

## What Changes

- 新建 `/pokemon-natures` 独立页面
- 新建 25 个性格静态数据常量（参照 `type-chart.ts` 模式）
- 新建交互式性格查找器（搜索 + 按能力筛选）
- 新建最佳性格推荐器（选宝可梦 → 基于种族值推荐）
- 新建 5×5 能力矩阵（颜色编码 + 移动端优化）
- 复用 `fetchPokemonByName`（team-builder 已实现）获取种族值
- On-page SEO 内容（总词数 800+，核心词 `pokemon natures` 密度最高）
- 移动端优先适配
- 更新 sitemap.xml + 内链

## Competitor Analysis

### pokemondb.net/mechanics/natures

| 功能 | 实现方式 |
|---|---|
| 性格机制说明 | 纯文字，解释 +10%/-10% 机制 |
| 按能力查性格 | 5×5 矩阵表（行=增加，列=减少） |
| 按字母查性格 | 25 行表格（性格名 / 增加 / 减少） |
| 树果口味 | 文字说明口味对应关系 |
| 最佳性格推荐 | ❌ 无 |
| 搜索/筛选 | ❌ 无 |
| 移动端优化 | ❌ 无 |
| SEO FAQ | ❌ 无 |

### bulbapedia.bulbagarden.net/wiki/Nature

| 功能 | 实现方式 |
|---|---|
| 性格机制 | 极详尽百科（历史、机制、Mints、Pokéathlon） |
| 性格表 | 25 行表格 + 5×5 矩阵 |
| 最佳性格推荐 | ❌ 无（只有机制说明） |
| 交互 | ❌ 无 |

**差异化策略：**
- 不与 bulbapedia 拼内容深度（百科站不可战胜），而是拼**交互体验 + 即用性**
- 核心差异化 = **最佳性格推荐器**（选宝可梦 → 推荐性格），两个对标站都没有
- 辅助差异化 = 搜索/筛选 + 移动端优化 + SEO FAQ

## Nature Data

### 25 个性格静态常量

新建 `lib/pokeapi/natures.ts`，包含全部 25 个性格数据。

数据结构：

```ts
export type BattleStat = "attack" | "defense" | "sp-atk" | "sp-def" | "speed";

export type Flavor = "spicy" | "sour" | "sweet" | "dry" | "bitter";

export interface Nature {
  id: number;              // 1-25
  name: string;            // 小写，如 "adamant"
  displayName: string;     // "Adamant"
  increased: BattleStat | null;  // null = 中性性格（+/- 同一能力）
  decreased: BattleStat | null;
  likesFlavor: Flavor | null;
  hatesFlavor: Flavor | null;
}

export const NATURES: Nature[] = [/* 25 条 */];
```

### 性格完整列表

| 性格 | 增加 | 减少 | 喜欢口味 | 讨厌口味 |
|---|---|---|---|---|
| Hardy | Attack | Attack | Spicy | Spicy |
| Lonely | Attack | Defense | Spicy | Sour |
| Adamant | Attack | Sp. Atk | Spicy | Dry |
| Naughty | Attack | Sp. Def | Spicy | Bitter |
| Brave | Attack | Speed | Spicy | Sweet |
| Bold | Defense | Attack | Sour | Spicy |
| Docile | Defense | Defense | Sour | Sour |
| Impish | Defense | Sp. Atk | Sour | Dry |
| Lax | Defense | Sp. Def | Sour | Bitter |
| Relaxed | Defense | Speed | Sour | Sweet |
| Modest | Sp. Atk | Attack | Dry | Spicy |
| Mild | Sp. Atk | Defense | Dry | Sour |
| Bashful | Sp. Atk | Sp. Atk | Dry | Dry |
| Rash | Sp. Atk | Sp. Def | Dry | Bitter |
| Quiet | Sp. Atk | Speed | Dry | Sweet |
| Calm | Sp. Def | Attack | Bitter | Spicy |
| Gentle | Sp. Def | Defense | Bitter | Sour |
| Careful | Sp. Def | Sp. Atk | Bitter | Dry |
| Quirky | Sp. Def | Sp. Def | Bitter | Bitter |
| Sassy | Sp. Def | Speed | Bitter | Sweet |
| Timid | Speed | Attack | Sweet | Spicy |
| Hasty | Speed | Defense | Sweet | Sour |
| Jolly | Speed | Sp. Atk | Sweet | Dry |
| Naive | Speed | Sp. Def | Sweet | Bitter |
| Serious | Speed | Speed | Sweet | Sweet |

**5 个中性性格**（increased === decreased，无实际效果）：Hardy、Docile、Bashful、Quirky、Serious

### 口味对应关系

- Attack = Spicy（辣）
- Defense = Sour（酸）
- Speed = Sweet（甜）
- Sp. Atk = Dry（涩）
- Sp. Def = Bitter（苦）

### 最佳性格推荐逻辑

```ts
// 基于种族值推荐最佳性格
function recommendNatures(stats: PokemonStat[]): {
  nature: Nature;
  reason: string;
}[]
```

推荐规则（简化但实用）：
1. 比较 `baseAttack` vs `baseSpAtk` 判断物理/特殊攻击手
2. 物理（Atk > SpA）：推荐 Adamant（+Atk/-SpA）；若 Speed 高则推荐 Jolly（+Spe/-SpA）
3. 特殊（SpA > Atk）：推荐 Modest（+SpA/-Atk）；若 Speed 高则推荐 Timid（+Spe/-Atk）
4. 坦克（HP/Def 高，Atk ≈ SpA）：推荐 Bold（+Def/-Atk）或 Calm（+SpD/-Atk）
5. 返回 Top 3 推荐 + 各自理由

## ADDED Requirements

### Requirement: 页面路由与 SEO

新建 `/pokemon-natures` 独立页面。

- **目标关键词：** pokemon natures
- **辅助关键词：** pokemon nature chart, best pokemon natures, pokemon nature list, adamant nature, what do pokemon natures do, pokemon nature guide
- **H1：** "Pokemon Natures"
- **Meta title：** "Pokemon Natures — Complete List & Best Nature Guide | PokePicker"
- **Meta description：** "Every Pokemon nature explained. See all 25 natures, which stat each one raises and lowers, and get the best nature recommendation for any Pokemon. Free, no signup."
- **Canonical：** `/pokemon-natures`

#### Scenario: Google 爬取 natures 页面
- **WHEN** Googlebot 爬取 `/pokemon-natures`
- **THEN** canonical = `/pokemon-natures`
- **AND** H1 包含 "Pokemon Natures"
- **AND** 页面包含 FAQ + SEO 内容区块（总词数 800+）
- **AND** 核心词 "pokemon natures" 在页面中密度最高（H1 + 首段 + 小标题 + FAQ + 正文自然出现）

#### Scenario: 首页内链
- **WHEN** 用户在首页浏览
- **THEN** Popular Tools 区块显示 "Pokemon Natures Guide" 链接
- **AND** 链接指向 `/pokemon-natures`
- **AND** 锚文本包含 "pokemon natures"

### Requirement: On-Page SEO 内容

页面 SHALL 包含 800+ 词的 SEO 内容，核心词 `pokemon natures` 密度最高。

**内容结构（从上到下）：**

1. **Hero 区**：H1 "Pokemon Natures" + 150 词描述（含核心词 2-3 次 + 辅助词）
2. **工具区**：性格查找器 + 能力矩阵 + 最佳性格推荐器（交互内容）
3. **What are Pokemon natures?**：200+ 词，含核心词 3-4 次
4. **How to choose the best nature**：150+ 词步骤说明，含核心词 2 次
5. **Pokemon nature chart explained**：150+ 词，含辅助词 "pokemon nature chart"
6. **Best natures for competitive play**：150+ 词，含核心词 1-2 次 + 辅助词
7. **FAQ**：8 条，每条 40-60 词，含核心词 2-3 次

**关键词密度规则：**
- `pokemon natures` 出现 12-15 次（H1 + 正文 + FAQ + 小标题）
- `pokemon nature chart` 出现 3-4 次
- `best pokemon natures` 出现 2-3 次
- `what do pokemon natures do` 出现 1-2 次
- `pokemon nature list` 出现 1-2 次
- `pokemon nature guide` 出现 1-2 次

**JSON-LD 结构化数据：**
- `WebApplication` schema（name = "Pokemon Natures Guide"）
- `FAQPage` schema（8 条 FAQ）

#### Scenario: SEO 内容词数检查
- **WHEN** 统计页面可见文本词数
- **THEN** 总词数 ≥ 800
- **AND** "pokemon natures" 出现 ≥ 12 次
- **AND** 关键词自然分布在 H1 / 正文 / FAQ / 小标题中

### Requirement: 交互式性格查找器

页面 SHALL 提供可搜索、可筛选的性格查找器。

- **搜索框**：按性格名称模糊匹配（大小写不敏感），实时过滤
- **能力筛选**：6 个 chip 单选 — All / +Attack / +Defense / +Sp.Atk / +Sp.Def / +Speed（按"增加的能力"筛选）
- **性格卡片网格**：每个卡片显示性格名 + 增加（绿色↑）/ 减少（红色↓）能力 + 口味
- **中性性格**特殊标记：显示 "Neutral" badge（无实际效果）
- 移动端：2 列网格；桌面端：3-4 列网格
- 搜索框触摸目标 ≥ 44px

#### Scenario: 搜索性格
- **WHEN** 用户在搜索框输入 "adam"
- **THEN** 网格过滤显示名称包含 "adam" 的性格（Adamant）
- **AND** 匹配不区分大小写

#### Scenario: 按增加的能力筛选
- **WHEN** 用户点击 "+Attack" chip
- **THEN** 网格只显示增加 Attack 的 5 个性格（Hardy/Lonely/Adamant/Naughty/Brave）
- **AND** 包括 Hardy（中性，+Atk/-Atk）

#### Scenario: 查看中性性格
- **WHEN** 网格显示 Hardy 性格卡片
- **THEN** 卡片显示 "Neutral" badge
- **AND** 增加/减少能力显示相同（Attack/Attack），颜色为灰色（非绿/红）

### Requirement: 5×5 能力矩阵

页面 SHALL 显示经典的 5×5 性格矩阵（按能力查性格）。

矩阵结构：5 行（增加的能力）× 5 列（减少的能力）

|  | -Attack | -Defense | -Sp. Atk | -Sp. Def | -Speed |
|---|---|---|---|---|---|
| +Attack | Hardy | Lonely | Adamant | Naughty | Brave |
| +Defense | Bold | Docile | Impish | Lax | Relaxed |
| +Sp. Atk | Modest | Mild | Bashful | Rash | Quiet |
| +Sp. Def | Calm | Gentle | Careful | Quirky | Sassy |
| +Speed | Timid | Hasty | Jolly | Naive | Serious |

- 对角线（中性性格）灰色背景 + "Neutral" 标记
- 非对角线单元格：点击高亮，显示该性格的完整信息（增/减能力 + 口味）
- 移动端：矩阵横向滚动 + 首行首列 sticky
- 单元格触摸目标 ≥ 44px（移动端）

#### Scenario: 点击矩阵单元格
- **WHEN** 用户点击 "Adamant" 单元格（+Attack / -Sp. Atk）
- **THEN** 单元格高亮
- **AND** 显示提示：Increases Attack (+10%), Decreases Sp. Atk (-10%), Likes Spicy, Hates Dry

#### Scenario: 移动端矩阵
- **WHEN** 移动端用户查看矩阵
- **THEN** 矩阵可横向滚动
- **AND** 首列（增加能力行名）sticky 不滚动
- **AND** 首行（减少能力列名）sticky 不滚动
- **AND** 单元格触摸目标 ≥ 44px

### Requirement: 最佳性格推荐器

页面 SHALL 提供基于种族值的最佳性格推荐器（核心差异化功能）。

- **宝可梦选择**：搜索框 + 下拉建议（复用 team-builder 的搜索逻辑）
- **推荐结果**：选宝可梦后显示 Top 3 推荐性格 + 各自理由
- **推荐逻辑**：
  - 比较 baseAttack vs baseSpAtk 判断物理/特殊
  - 物理：推荐 Adamant（+Atk/-SpA），高速推荐 Jolly（+Spe/-SpA）
  - 特殊：推荐 Modest（+SpA/-Atk），高速推荐 Timid（+Spe/-Atk）
  - 坦克（Def/SpD 高）：推荐 Bold/Calm
- **推荐卡片**：性格名 + 理由（如 "Garchomp has higher Attack than Sp. Atk, so Adamant boosts its physical moves"）
- **数据源**：复用 `fetchPokemonByName`（team-builder 已实现），24h 缓存

#### Scenario: 推荐物理攻击手性格
- **WHEN** 用户选择 Garchomp（Atk 130 > SpA 80, Spe 102）
- **THEN** 推荐第 1 名：Jolly（+Speed/-Sp.Atk），理由 "Garchomp is a fast physical attacker"
- **AND** 推荐第 2 名：Adamant（+Attack/-Sp.Atk），理由 "Maximize physical damage"
- **AND** 推荐第 3 名：基于备选逻辑

#### Scenario: 推荐特殊攻击手性格
- **WHEN** 用户选择 Alakazam（SpA 135 > Atk 50, Spe 120）
- **THEN** 推荐第 1 名：Timid（+Speed/-Attack），理由 "Alakazam is a fast special attacker"
- **AND** 推荐第 2 名：Modest（+Sp.Atk/-Attack），理由 "Maximize special damage"

#### Scenario: 推荐坦克性格
- **WHEN** 用户选择 Blissey（HP 255, Def 10, SpD 135, Atk 10 ≈ SpA 75）
- **THEN** 推荐第 1 名：Bold（+Defense/-Attack），理由 "Shore up Blissey's weak physical Defense"
- **AND** 推荐第 2 名：Calm（+Sp.Def/-Attack），理由 "Maximize special bulk"

#### Scenario: 未选择宝可梦
- **WHEN** 推荐器未选择宝可梦
- **THEN** 显示提示 "Search for a Pokemon to get nature recommendations"
- **AND** 不显示推荐结果

### Requirement: 性格数据常量

新建 `lib/pokeapi/natures.ts`，包含全部 25 个性格数据。

- 数据来源：Bulbapedia 官方性格表 + PokeAPI `/nature` 端点结构
- 覆盖全部 25 个性格
- 静态常量，无运行时 fetch
- 导出 `NATURES` 常量 + 辅助函数

```ts
// 按 name 查询
export function getNatureByName(name: string): Nature | undefined

// 按增加/减少能力查询
export function getNaturesByStat(increased: BattleStat, decreased: BattleStat): Nature[]

// 推荐最佳性格
export function recommendNatures(stats: { name: string; baseStat: number }[]): {
  nature: Nature;
  reason: string;
}[]

// 口味对应能力
export const FLAVOR_STAT_MAP: Record<Flavor, BattleStat>
```

#### Scenario: 查询 Adamant
- **WHEN** 调用 `getNatureByName("adamant")`
- **THEN** 返回 `{ name: "adamant", increased: "attack", decreased: "sp-atk", likesFlavor: "spicy", hatesFlavor: "dry" }`

#### Scenario: 查询中性性格
- **WHEN** 调用 `getNatureByName("hardy")`
- **THEN** 返回 `{ name: "hardy", increased: "attack", decreased: "attack", isNeutral: true }`（increased === decreased）

### Requirement: 页面结构

页面 SHALL 包含以下区块（从上到下）：

1. **Header**（复用 PokePicker logo + 返回首页链接）
2. **Hero**：H1 "Pokemon Natures" + 150 词描述
3. **Nature Finder**：搜索框 + 能力筛选 chips + 性格卡片网格
4. **Nature Chart**：5×5 能力矩阵（可点击）
5. **Best Nature Recommender**：宝可梦搜索 + Top 3 推荐
6. **SEO: What are**：200+ 词
7. **SEO: How to choose**：150+ 词
8. **SEO: Nature chart explained**：150+ 词
9. **SEO: Best natures for competitive**：150+ 词
10. **FAQ**：8 条
11. **Footer**（复用站内链接）

#### Scenario: 页面加载
- **WHEN** 用户打开 `/pokemon-natures`
- **THEN** 页面在 2 秒内完成首屏渲染
- **AND** 25 个性格卡片可见
- **AND** 5×5 矩阵可见
- **AND** 推荐器显示空状态提示

### Requirement: 移动端适配（优先级最高）

移动端 SHALL 优化所有交互体验，移动端是主要使用场景。

#### 性格查找器
- 移动端：2 列网格
- 桌面端：3-4 列网格
- 搜索框触摸目标 ≥ 44px
- 能力筛选 chips 触摸目标 ≥ 44px，横向滚动

#### 5×5 矩阵
- 移动端：横向滚动 + 首行首列 sticky
- 桌面端：完整表格自适应宽度
- 单元格触摸目标 ≥ 44px

#### 最佳性格推荐器
- 移动端：全宽搜索框 + 垂直堆叠推荐卡片
- 桌面端：搜索框 + 水平排列推荐卡片
- 搜索框触摸目标 ≥ 44px

#### 整体布局
- 移动端单列布局
- 内容区 `px-4`（16px 边距）
- 最大宽度 `max-w-4xl`（桌面端居中）

#### Scenario: 移动端查看矩阵
- **WHEN** 移动端用户查看 5×5 矩阵
- **THEN** 矩阵可横向滚动
- **AND** 首列（增加能力行名）sticky 不滚动
- **AND** 首行（减少能力列名）sticky 不滚动
- **AND** 单元格触摸目标 ≥ 44px

#### Scenario: 移动端使用推荐器
- **WHEN** 移动端用户在推荐器搜索宝可梦
- **THEN** 搜索框全宽，触摸目标 ≥ 44px
- **AND** 推荐卡片垂直堆叠显示
- **AND** 每张推荐卡片触摸目标 ≥ 44px

### Requirement: 性能

- 页面 LCP ≤ 2s
- 25 个性格为静态数据（无网络请求，首屏即时渲染）
- 5×5 矩阵为静态渲染（无客户端计算）
- 最佳性格推荐器仅在用户选择宝可梦时触发 fetch（复用 24h 缓存）
- 页面使用 ISR（revalidate = 3600，1 小时）

#### Scenario: 首屏加载性能
- **WHEN** 用户首次打开页面
- **THEN** LCP ≤ 2s
- **AND** 25 个性格卡片 + 5×5 矩阵首屏可见（静态渲染）

#### Scenario: 推荐器性能
- **WHEN** 用户选择宝可梦获取推荐
- **THEN** 推荐结果在 1 秒内显示（命中缓存则 < 100ms）
- **AND** 推荐计算在客户端完成（纯计算，无额外网络请求）

## Data Flow

```
┌─────────────────────────────────────────────┐
│  /pokemon-natures (Server Component)         │
│  - metadata + JSON-LD                        │
│  - SSR 渲染 25 性格卡片 + 5×5 矩阵 + SEO 内容  │
│  - 预加载全量 PokemonListItem（用于推荐器搜索） │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│  NaturesClient (Client Component)            │
│  - 管理搜索/筛选状态                          │
│  - 管理矩阵高亮状态                           │
│  - 管理推荐器状态（选宝可梦 → 显示推荐）        │
│  - 客户端计算推荐（纯计算）                    │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│  Server Action: fetchPokemonByNameAction     │
│  - 按名称查询 PokeAPI（复用 team-builder）     │
│  - 24h ISR 缓存                              │
│  - 返回完整 Pokemon 数据（含 stats）          │
│  - 用于推荐器获取种族值                        │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│  lib/pokeapi/natures.ts                      │
│  - NATURES 常量（25 条静态数据）              │
│  - getNatureByName(name)                     │
│  - getNaturesByStat(increased, decreased)    │
│  - recommendNatures(stats)                   │
│  - FLAVOR_STAT_MAP                           │
└─────────────────────────────────────────────┘
```

## File Structure

```
app/pokemon-natures/
├── page.tsx                      # Server Component: metadata + SSR + SEO 内容 + JSON-LD
├── NaturesClient.tsx             # Client Component: 搜索/筛选 + 矩阵高亮 + 推荐器
├── NatureFinder.tsx              # 性格查找器（搜索 + 筛选 + 卡片网格）
├── NatureMatrix.tsx              # 5×5 能力矩阵
├── NatureRecommender.tsx         # 最佳性格推荐器
└── seo-content.ts                # SEO 文案常量（What is / How to / FAQ）

lib/pokeapi/
├── natures.ts                    # 25 个性格静态数据 + 推荐函数（新增）

app/sitemap.ts                    # 添加 /pokemon-natures URL（priority 0.8）

app/components/
├── HomeClient.tsx                # 首页 Popular Tools 区块加内链
```

## SEO Content

### Hero 描述（150+ 词）

Pokemon natures are a core mechanic that determines how your Pokemon's stats grow. Each of the 25 natures raises one stat by 10% and lowers another by 10%, letting you optimize your Pokemon for its role. This Pokemon natures guide lists all 25 natures in a searchable chart, shows which stat each one increases and decreases, and recommends the best nature for any Pokemon based on its base stats. Whether you're building a competitive team, planning an in-game playthrough, or just want to understand what Adamant or Modest actually does, this Pokemon nature list has you covered. Search by name, filter by stat, or use the best nature recommender to find the perfect nature for your Pokemon — free, no signup, works on any device.

### What are Pokemon natures?（200+ 词）

Pokemon natures are a personality mechanic introduced in Generation 3 (Ruby and Sapphire) that affects how a Pokemon's stats grow. Each Pokemon has one nature, randomly assigned, chosen from 25 possible natures. Each nature increases one of five battle stats — Attack, Defense, Special Attack, Special Defense, or Speed — by 10%, and decreases another by 10% (by the time the Pokemon reaches level 100). Five of the 25 natures increase and decrease the same stat, so they have no effect — these are called neutral natures (Hardy, Docile, Bashful, Quirky, and Serious). Understanding Pokemon natures is essential for competitive play and efficient in-game team building, because the right nature can give your Pokemon a meaningful edge in battle. For example, a physical attacker like Garchomp benefits from an Adamant nature (Attack up, Special Attack down) because it boosts its strongest stat while lowering a stat it rarely uses. This Pokemon natures guide covers all 25 natures and helps you pick the best one for any Pokemon.

### How to choose the best nature（150+ 词）

Choosing the best nature for your Pokemon comes down to identifying its role and boosting its most important stat while sacrificing its least useful one:

1. **Identify your Pokemon's role** — Is it a physical attacker, special attacker, tank, or speed control?
2. **Compare Attack vs Special Attack** — If Attack is higher, your Pokemon is a physical attacker; if Special Attack is higher, it's a special attacker.
3. **Pick the boost** — Physical attackers want +Attack (Adamant) or +Speed (Jolly); special attackers want +Special Attack (Modest) or +Speed (Timid).
4. **Sacrifice the unused stat** — Physical attackers drop Special Attack; special attackers drop Attack.
5. **Use the recommender** — Enter your Pokemon above to get the best nature recommendation automatically based on its base stats.

### Pokemon nature chart explained（150+ 词）

The Pokemon nature chart is a 5×5 grid that maps every nature to the stat it increases (rows) and the stat it decreases (columns). The five stats are Attack, Defense, Special Attack, Special Defense, and Speed. Reading the chart is simple: find the row for the stat you want to increase, then find the column for the stat you're willing to decrease, and the cell gives you the nature name. The diagonal of the chart (where the increased and decreased stat are the same) contains the five neutral natures — Hardy, Docile, Bashful, Quirky, and Serious — which have no effect on stats. This Pokemon nature chart also shows each nature's flavor preferences, which determine which berries a Pokemon likes and dislikes. Use the interactive chart above to click any cell and see the full details for that nature.

### Best natures for competitive play（150+ 词）

In competitive Pokemon, the best natures are the ones that maximize your Pokemon's effectiveness in its role. Here are the most popular competitive natures and when to use them:

- **Adamant (+Atk/-SpA)** — The go-to nature for physical attackers like Garchomp, Tyranitar, and Scizor. Maximizes physical damage output.
- **Modest (+SpA/-Atk)** — The choice for special attackers like Alakazam, Gengar, and Togekiss. Boosts special damage.
- **Jolly (+Spe/-SpA)** — For fast physical attackers that need to outspeed opponents, like Weavile or Aerodactyl.
- **Timid (+Spe/-Atk)** — For fast special attackers that need speed control, like Greninja or Dragapult.
- **Bold (+Def/-Atk)** — For physical walls and tanks like Blissey or Skarmory that need extra Defense.
- **Calm (+SpD/-Atk)** — For special walls that prioritize Special Defense bulk.

Use the best nature recommender above to find the ideal nature for any of the 1025 Pokemon.

### FAQ（8 条，每条 40-60 词）

1. **What are Pokemon natures?**
   Pokemon natures are a mechanic introduced in Generation 3 that affects stat growth. Each of the 25 natures raises one stat by 10% and lowers another by 10%. Five neutral natures raise and lower the same stat, having no effect. The right nature gives your Pokemon a meaningful battle advantage.

2. **How many Pokemon natures are there?**
   There are 25 Pokemon natures in total. Twenty of them increase one stat while decreasing a different stat, and five are neutral (Hardy, Docile, Bashful, Quirky, Serious) that increase and decrease the same stat, resulting in no net change.

3. **What is the best nature for my Pokemon?**
   The best nature depends on your Pokemon's base stats and role. Physical attackers benefit from Adamant or Jolly, special attackers from Modest or Timid, and tanks from Bold or Calm. Use the best nature recommender above to get a personalized recommendation for any Pokemon.

4. **Do natures matter for casual play?**
   For casual in-game playthroughs, natures have a smaller impact since the main story is beatable with any team. However, choosing a good nature still makes your Pokemon noticeably stronger, and it becomes essential for post-game content, battle facilities, and competitive play.

5. **What do neutral natures do?**
   Neutral natures (Hardy, Docile, Bashful, Quirky, Serious) increase and decrease the same stat, so they have no effect on a Pokemon's stat growth. They're generally avoided in competitive play, where every stat point matters, but they're harmless in casual play.

6. **Can I change a Pokemon's nature?**
   In Pokemon Sword and Shield onward, you can use Mints to change a Pokemon's effective nature without changing its actual nature. Mints apply the stat changes of a different nature, letting you correct a bad nature without breeding a new Pokemon. Earlier games require breeding to get the desired nature.

7. **How do natures affect berries and flavors?**
   Each Pokemon nature determines which berry flavors the Pokemon likes and dislikes. The five flavors map to the five stats: Spicy (Attack), Sour (Defense), Sweet (Speed), Dry (Special Attack), and Bitter (Special Defense). A nature's liked flavor matches its increased stat, and its disliked flavor matches its decreased stat.

8. **Are natures the same in every Pokemon game?**
   Yes, the 25 natures and their effects have remained the same since their introduction in Generation 3 (Ruby and Sapphire). While later games added Mints to change a Pokemon's effective nature, the nature system itself — all 25 natures and their stat modifications — is identical across every generation from Gen 3 onward.

## Resolved Decisions

- **独立页面 vs 合并现有页**：独立页面。搜索意图纯信息型，与首页/团队构建器完全不同。
- **数据源：静态常量 vs PokeAPI**：静态常量。25 个性格是固定数据（Gen 3 引入后未变），参照 `type-chart.ts` 模式，性能更好、无网络依赖。
- **最佳性格推荐器**：做。核心差异化功能，两个对标站都没有。复用 team-builder 的 `fetchPokemonByName`。
- **推荐逻辑复杂度**：简化版。基于 Attack vs Sp.Atk + Speed 判断，不涉及 EV/IV/技能搭配（超出 MVP 范围）。
- **5×5 矩阵交互**：点击单元格显示详情（非跳转）。移动端 sticky 首行首列。
- **中性性格处理**：显示 "Neutral" badge，矩阵对角线灰色，不隐藏。
- **口味信息**：包含。对标站有，且是性格机制的完整部分。
- **移动端优先**：所有交互按移动端优先设计，触摸目标 ≥ 44px。
- **SEO 内容**：总词数 800+，核心词 `pokemon natures` 密度最高。

## Related Specs

- [product-overview](../product-overview/spec.md) — 产品原则检验
- [seo-strategy](../seo-strategy/spec.md) — 关键词簇规划
- [sitemap-and-url-strategy](../sitemap-and-url-strategy/spec.md) — URL 结构
- [tech-stack-and-architecture](../tech-stack-and-architecture/spec.md) — 技术栈
- [pokemon-team-builder](../pokemon-team-builder/spec.md) — 可复用 fetchPokemonByName + 搜索逻辑
