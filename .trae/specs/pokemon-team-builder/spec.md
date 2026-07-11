# Pokemon Team Builder Spec

## Why

`pokemon team builder` 月搜索量约 74K，**比首页主词 `random pokemon picker` 还大**，是整站最大的关键词机会。搜索意图与首页完全不同：

| 维度 | random pokemon picker（首页） | pokemon team builder（新页面） |
|---|---|---|
| 交互方式 | 点一下 → 随机出结果 | 手动搜索/挑选 → 逐只添加到队伍 |
| 用户目标 | 灵感、随机性、Nuzlocke | 组建一支有策略的队伍，查漏补缺 |
| 核心功能 | 随机生成 + 筛选 | 类型弱点/抗性分析 + 覆盖率 + 手动选宠 |
| 用户心态 | "给我惊喜" | "帮我分析队伍有没有短板" |

对标站 `richi3f.github.io/pokemon-team-planner` 提供两种模式：
1. **手动选宠**：浏览/搜索 → 点击添加到 6 个槽位 → 实时看类型分析矩阵
2. **随机队伍**：一键随机 6 只 → 同样可看类型分析

两种模式共享同一个类型分析引擎。用户核心需求不是"随机"，而是"分析我的队伍弱点/抗性"。

## What Changes

- 新建 `/pokemon-team-builder` 独立页面
- 新建 18×18 属性克制表（静态数据）
- 新建弱点/抗性计算逻辑（处理双属性相乘）
- 新建按名称查询宝可梦的 PokeAPI 客户端函数
- 新建手动选宠 UI（搜索 + 虚拟滚动网格 + 添加/移除）
- 新建类型分析矩阵 UI（防御弱点/抗性/免疫 + 攻击覆盖率）
- 新建 URL 状态持久化（队伍编码到 URL hash，可分享）
- 新建 Showdown 导出功能
- On-page SEO 内容（总词数 800+，核心词 `pokemon team builder` 密度最高）
- 移动端优先适配（触摸目标、矩阵横向滚动、全屏 sheet）
- 更新 sitemap.xml + 内链

## Competitor Analysis

### richi3f.github.io/pokemon-team-planner

| 功能 | 实现方式 |
|---|---|
| 游戏版本选择 | 选 RBY / GSC / ... / SV，决定可用宝可梦池 |
| 宝可梦网格 | 按版本展示所有可用宝可梦，点击添加 |
| 6 个队伍槽位 | 点击移除，可重复选同一只 |
| 类型分析矩阵 | 18 种攻击类型 × 队伍：红色=弱点、蓝色=抗性/免疫/STAB |
| URL 状态持久化 | 队伍编码在 URL hash（`#rby+rhydon+onix+...`），可分享 |
| 随机队伍 | 一键随机 6 只 |

**差异化机会：**
- 对标站 UI 较朴素（GitHub Pages，无品牌设计）
- 对标站无 SEO 内容（无 FAQ、无文案、无 on-page SEO）
- 对标站无移动端优化
- 对标站无 Showdown 导出
- 我们可以用 Apple 极简风格 + 移动优先 + 深度 SEO 内容 + Showdown 导出取胜

## Type Effectiveness Chart

### 18×18 属性克制表

新建 `lib/pokeapi/type-chart.ts`，包含完整的 18×18 攻防克制表。

数据结构：`TYPE_CHART: Record<PokemonType, Partial<Record<PokemonType, number>>>`

- 键 = 攻击方属性
- 值 = `{ 防御方属性 → 倍率 }`
- 倍率：`0`（免疫）、`0.5`（抗性）、`1`（正常）、`2`（弱点）
- 未列出的组合默认 `1`

示例：
```
TYPE_CHART.fire = {
  fire: 0.5,     // 火攻火 = 0.5x
  water: 0.5,    // 火攻水 = 0.5x
  grass: 2,      // 火攻草 = 2x
  ice: 2,        // 火攻冰 = 2x
  bug: 2,        // 火攻虫 = 2x
  steel: 2,      // 火攻钢 = 2x
  rock: 0.5,     // 火攻岩 = 0.5x
  dragon: 0.5,   // 火攻龙 = 0.5x
}
```

### 双属性计算规则

当防御方有两属性 `[T1, T2]` 时，攻击属性 `A` 的最终倍率 = `TYPE_CHART[A][T1] * TYPE_CHART[A][T2]`（默认 1）。

可能结果：
- `0` — 免疫（任一属性免疫）
- `0.25` — 双重抗性
- `0.5` — 抗性
- `1` — 正常
- `2` — 弱点
- `4` — 双重弱点

### 计算函数

```ts
// 计算某属性攻击一只宝可梦的倍率
function getEffectiveness(attackType: PokemonType, defenderTypes: PokemonType[]): number

// 计算一支队伍对所有18种攻击类型的防御倍率矩阵
function getTeamDefensiveMatrix(team: { types: PokemonType[] }[]): {
  attackType: PokemonType;
  results: { pokemonIndex: number; multiplier: number }[];
}[]

// 计算队伍防御汇总：弱点列表 / 抗性列表 / 免疫列表
function getTeamDefensiveSummary(team: { types: PokemonType[] }[]): {
  weakTo: PokemonType[];      // 队伍中至少1只弱于该类型
  resists: PokemonType[];     // 队伍中至少1只抗该类型
  immuneTo: PokemonType[];    // 队伍中至少1只免疫该类型
}

// 计算队伍攻击覆盖率（STAB覆盖了哪些类型，即队伍能打出2x伤害的类型）
function getTeamOffensiveCoverage(team: { types: PokemonType[] }[]): {
  covered: PokemonType[];     // 队伍STAB能打出2x的类型
  uncovered: PokemonType[];   // 队伍STAB打不出2x的类型
}
```

## ADDED Requirements

### Requirement: 页面路由与 SEO

新建 `/pokemon-team-builder` 独立页面。

- **目标关键词：** pokemon team builder
- **辅助关键词：** pokemon team planner, pokemon team analyzer, pokemon weakness calculator, pokemon team checker, pokemon type calculator, pokemon coverage checker
- **H1：** "Pokemon Team Builder"
- **Meta title：** "Pokemon Team Builder — Plan Your Team & Analyze Weaknesses | PokePicker"
- **Meta description：** "Build your Pokemon team and instantly see type weaknesses, resistances, and coverage. Pick Pokemon manually or generate a random team. Free, no signup."
- **Canonical：** `/pokemon-team-builder`

#### Scenario: Google 爬取 team builder 页面
- **WHEN** Googlebot 爬取 `/pokemon-team-builder`
- **THEN** canonical = `/pokemon-team-builder`
- **AND** H1 包含 "Pokemon Team Builder"
- **AND** 页面包含 FAQ + SEO 内容区块（总词数 800+）
- **AND** 核心词 "pokemon team builder" 在页面中密度最高（H1 + 首段 + 小标题 + FAQ + 正文自然出现）

#### Scenario: 首页内链
- **WHEN** 用户在首页浏览
- **THEN** Popular Tools 区块显示 "Pokemon Team Builder" 链接
- **AND** 链接指向 `/pokemon-team-builder`
- **AND** 锚文本包含 "pokemon team builder"

### Requirement: On-Page SEO 内容

页面 SHALL 包含 800+ 词的 SEO 内容，核心词 `pokemon team builder` 密度最高。

**内容结构（从上到下）：**

1. **Hero 区**：H1 "Pokemon Team Builder" + 150 词描述（含核心词 2-3 次 + 辅助词）
2. **工具区**：队伍槽位 + 类型分析 + 选择面板（交互内容）
3. **What is a Pokemon team builder?**：200+ 词，含核心词 3-4 次
4. **How to use the Pokemon team builder**：150+ 词步骤说明，含核心词 2 次
5. **Type weakness and resistance explained**：150+ 词，含辅助词 "pokemon weakness calculator"
6. **Popular team building strategies**：150+ 词，含核心词 1-2 次 + 辅助词
7. **FAQ**：8 条，每条 40-60 词，含核心词 2-3 次

**关键词密度规则：**
- `pokemon team builder` 出现 12-15 次（H1 + 正文 + FAQ + 小标题）
- `pokemon team planner` 出现 3-4 次
- `pokemon weakness calculator` 出现 2-3 次
- `pokemon team analyzer` 出现 1-2 次
- `pokemon type calculator` 出现 1-2 次
- `pokemon coverage checker` 出现 1-2 次

**JSON-LD 结构化数据：**
- `WebApplication` schema（name = "Pokemon Team Builder"）
- `FAQPage` schema（8 条 FAQ）

#### Scenario: SEO 内容词数检查
- **WHEN** 统计页面可见文本词数
- **THEN** 总词数 ≥ 800
- **AND** "pokemon team builder" 出现 ≥ 12 次
- **AND** 关键词自然分布在 H1 / 正文 / FAQ / 小标题中

### Requirement: 6 个队伍槽位

页面 SHALL 提供 6 个队伍槽位。

- 空槽位显示 "+" 占位
- 点击空槽位 → 弹出宝可梦选择面板
- 点击已填充槽位上的 "×" 按钮 → 移除该宝可梦
- 点击已填充槽位卡片区 → 可替换（打开选择面板）
- 槽位顺序无意义（不排序）
- 可重复选同一只宝可梦
- 队伍变更实时触发类型分析更新 + URL hash 更新

#### Scenario: 添加宝可梦到队伍
- **WHEN** 用户点击空槽位
- **THEN** 弹出宝可梦选择面板（搜索 + 网格）
- **AND** 用户搜索或浏览后点击一只宝可梦
- **THEN** 该槽位填充选中的宝可梦
- **AND** 类型分析矩阵实时更新
- **AND** URL hash 更新为当前队伍编码

#### Scenario: 移除队伍中的宝可梦
- **WHEN** 用户点击已填充槽位的 "×" 按钮
- **THEN** 该槽位清空
- **AND** 类型分析矩阵实时更新
- **AND** URL hash 更新

### Requirement: 宝可梦选择面板（虚拟滚动）

选择面板 SHALL 支持搜索 + 筛选 + 虚拟滚动网格。

- 搜索框：按名称模糊匹配（英文名，大小写不敏感）
- 世代筛选：Gen 1-9 chips + All（单选）
- 宝可梦网格：sprite + 名称，点击添加
- **虚拟滚动**：只渲染可视区域内的宝可梦（约 20-30 只），支持 1025 只流畅滚动
- 移动端：全屏 sheet（底部 slide-up）
- 桌面端：内联展开在选择面板区域

#### Scenario: 搜索宝可梦
- **WHEN** 用户在搜索框输入 "pika"
- **THEN** 网格过滤显示名称包含 "pika" 的宝可梦
- **AND** 匹配不区分大小写
- **AND** 虚拟滚动列表重新渲染过滤结果

#### Scenario: 按世代筛选
- **WHEN** 用户选择 "Gen 1"
- **THEN** 网格只显示 Gen 1 的 151 只宝可梦
- **AND** 虚拟滚动列表重置到顶部

#### Scenario: 虚拟滚动性能
- **WHEN** 用户在 1025 只宝可梦列表中快速滚动
- **THEN** 滚动保持 60fps 流畅
- **AND** 仅渲染可视区域 ± 缓冲区的 DOM 节点

#### Scenario: 移动端选择面板
- **WHEN** 移动端用户点击空槽位
- **THEN** 全屏 sheet 从底部滑出
- **AND** sheet 占满视口高度
- **AND** 顶部有 "Close" 按钮关闭 sheet

### Requirement: 类型分析矩阵（防御 + 攻击）

页面 SHALL 实时显示队伍的防御类型分析和攻击覆盖率。

#### 防御矩阵

矩阵结构：18 行（攻击类型）× N 列（已填充的队伍成员，最多 6 列）

- **红色背景** = 弱点（2x），深红 = 双重弱点（4x）
- **蓝色背景** = 抗性（0.5x），深蓝 = 双重抗性（0.25x）
- **灰色背景** = 免疫（0x）
- **无背景** = 正常（1x）
- 空槽位列不显示
- 每个单元格显示倍率数字（0 / 0.25 / 0.5 / 1 / 2 / 4）

#### 防御汇总

底部汇总区：
- "Weak to: Fire, Ice" — 队伍整体弱点列表（至少 1 只弱于该类型）
- "Resists: Water, Grass" — 队伍整体抗性列表（至少 1 只抗该类型）
- "Immune to: Ground" — 队伍免疫列表（至少 1 只免疫该类型）

#### 攻击覆盖率

单独区块显示队伍的攻击覆盖率：
- "STAB Coverage: Fire, Water, Grass" — 队伍 STAB 能打出 2x 的类型
- "Uncovered: Electric, Rock" — 队伍 STAB 打不出 2x 的类型

覆盖率规则：队伍成员的属性作为攻击属性，检查 TYPE_CHART 中能打出 2x 的防御类型。

#### Scenario: 查看队伍弱点
- **WHEN** 队伍中有 Charizard（Fire/Flying）
- **THEN** 防御矩阵中 Water 攻击行对 Charizard 列显示红色（2x）
- **AND** 防御矩阵中 Electric 攻击行对 Charizard 列显示红色（2x）
- **AND** 防御矩阵中 Rock 攻击行对 Charizard 列显示深红（4x）
- **AND** 底部汇总显示 "Weak to: Water, Electric, Rock"

#### Scenario: 查看攻击覆盖率
- **WHEN** 队伍中有 Charizard（Fire/Flying）+ Blastoise（Water）
- **THEN** 攻击覆盖率显示 STAB Coverage 包含 Fire（火攻草/虫/钢/冰 = 2x）和 Water（水攻火/地/岩 = 2x）
- **AND** Uncovered 显示未被任何队员 STAB 覆盖的类型

#### Scenario: 空队伍状态
- **WHEN** 队伍 6 个槽位全空
- **THEN** 矩阵区域显示提示文案 "Add Pokemon to your team to see type analysis"
- **AND** 攻击覆盖率区块隐藏

### Requirement: 随机队伍按钮

页面 SHALL 提供 "Random Team" 按钮。

- 点击后随机生成 6 只宝可梦填满所有槽位
- 随机范围：全部 1025 只（无 filter 限制）
- 已有队伍会被覆盖
- 生成后类型分析矩阵自动更新
- 生成后 URL hash 更新
- 按钮文案："🎲 Random Team"

#### Scenario: 生成随机队伍
- **WHEN** 用户点击 "Random Team" 按钮
- **THEN** 6 个槽位填充随机宝可梦
- **AND** 类型分析矩阵实时更新
- **AND** URL hash 更新为随机队伍编码
- **AND** 按钮显示 loading 状态直到完成

### Requirement: URL 状态持久化

队伍状态 SHALL 编码到 URL hash，支持分享。

- URL 格式：`/pokemon-team-builder#pikachu+charizard+blastoise+...`
- 宝可梦用英文 name（小写）表示，`+` 分隔
- 空槽位省略（只编码已填充的）
- 页面加载时解析 URL hash 恢复队伍
- 队伍变更时实时更新 URL hash（replaceState，不触发页面跳转）
- 支持"复制分享链接"按钮

#### Scenario: 分享队伍
- **WHEN** 用户组建了队伍 [Pikachu, Charizard, Blastoise]
- **THEN** URL 变为 `/pokemon-team-builder#pikachu+charizard+blastoise`
- **AND** 用户点击 "Copy Link" 按钮复制完整 URL 到剪贴板

#### Scenario: 从 URL 恢复队伍
- **WHEN** 用户打开 `/pokemon-team-builder#pikachu+charizard`
- **THEN** 页面加载后自动恢复队伍 [Pikachu, Charizard]
- **AND** 类型分析矩阵显示对应分析
- **AND** 4 个空槽位保持可用

#### Scenario: URL hash 中包含无效名称
- **WHEN** 用户打开 `/pokemon-team-builder#pikachu+invalidpokemon`
- **THEN** Pikachu 正常加载
- **AND** invalidpokemon 被静默跳过
- **AND** 不报错

### Requirement: Showdown 导出

页面 SHALL 提供导出到 Pokémon Showdown 格式的功能。

- "Export to Showdown" 按钮
- 点击后生成 Showdown 格式文本并复制到剪贴板
- 格式示例：
```
Pikachu @ Leftovers  
Ability: Static  
EVs: 252 HP / 252 Atk / 4 Def  

Charizard @ Leftovers  
Ability: Blaze  
EVs: 252 HP / 252 SpA / 4 Spe  
```
- MVP 版本：只导出名称 + 默认 ability（不导出 moves/evs/nature，这些需要更复杂的数据）
- 导出后显示 "Copied to clipboard!" 提示

#### Scenario: 导出队伍
- **WHEN** 队伍有 [Pikachu, Charizard, Blastoise]
- **AND** 用户点击 "Export to Showdown"
- **THEN** Showdown 格式文本复制到剪贴板
- **AND** 显示 "Copied to clipboard!" 提示

#### Scenario: 空队伍导出
- **WHEN** 队伍为空
- **AND** 用户点击 "Export to Showdown"
- **THEN** 按钮禁用或显示提示 "Add Pokemon first"

### Requirement: PokeAPI 客户端扩展

PokeAPI 客户端 SHALL 新增按名称查询函数。

```ts
export async function fetchPokemonByName(name: string): Promise<Pokemon>
```

- 调用 PokeAPI `/pokemon/{name}` + `/pokemon-species/{name}` 端点
- 复用 `transformPokemon` 转换逻辑
- 通过 `cachedFetch` 获得 24h ISR 缓存

#### Scenario: 按名称查询
- **WHEN** 调用 `fetchPokemonByName("pikachu")`
- **THEN** 返回 Pikachu 的完整 Pokemon 数据
- **AND** 结果被 24h 缓存

### Requirement: 属性克制表数据

新建 `lib/pokeapi/type-chart.ts`，包含完整的 18×18 攻防克制表。

- 数据来源：Bulbapedia 官方属性相克表
- 覆盖全部 18 种属性
- 静态常量，无运行时 fetch
- 导出 `TYPE_CHART` 常量 + 计算函数

#### Scenario: 火攻草
- **WHEN** 查询 `TYPE_CHART.fire.grass`
- **THEN** 返回 `2`

#### Scenario: 地面攻击飞行
- **WHEN** 查询 `TYPE_CHART.ground.flying`
- **THEN** 返回 `0`

### Requirement: 页面结构

页面 SHALL 包含以下区块（从上到下）：

1. **Header**（复用 PokePicker logo + 返回首页链接）
2. **Hero**：H1 "Pokemon Team Builder" + 150 词描述
3. **Team Slots**：6 个队伍槽位 + Random Team 按钮 + Export Showdown 按钮 + Copy Link 按钮
4. **Type Analysis**：防御矩阵 + 防御汇总 + 攻击覆盖率
5. **Pokemon Selector**：搜索 + 世代筛选 + 虚拟滚动网格
6. **SEO: What is**：200+ 词
7. **SEO: How to use**：150+ 词
8. **SEO: Type weakness explained**：150+ 词
9. **SEO: Popular strategies**：150+ 词
10. **FAQ**：8 条
11. **Footer**（复用站内链接）

#### Scenario: 页面加载
- **WHEN** 用户打开 `/pokemon-team-builder`
- **THEN** 页面在 2 秒内完成首屏渲染
- **AND** 6 个空槽位可见
- **AND** 宝可梦网格预加载第一屏（虚拟滚动可视区域）

### Requirement: 移动端适配（优先级最高）

移动端 SHALL 优化所有交互体验，移动端是主要使用场景。

#### 队伍槽位
- 移动端：3×2 网格（紧凑布局，每槽位约 100×120px）
- 桌面端：6×1 横排（每槽位约 140×160px）
- 槽位触摸目标 ≥ 44px（Apple HIG）

#### 选择面板
- 移动端：全屏 sheet（底部 slide-up，占满视口高度）
- 桌面端：内联展开在选择面板区域
- Sheet 顶部有 "Close" 按钮 + 搜索框固定
- 搜索框触摸目标 ≥ 44px

#### 类型矩阵
- 移动端：横向滚动 + 固定首列（攻击类型列名 sticky）
- 桌面端：完整表格自适应宽度
- 单元格触摸目标 ≥ 44px（移动端可放大单元格）
- 矩阵上方显示水平滚动提示

#### 按钮
- Random Team / Export / Copy Link 按钮触摸目标 ≥ 44px
- 移动端按钮全宽排列（垂直堆叠）
- 桌面端按钮水平排列

#### 整体布局
- 移动端单列布局
- 内容区 `px-4`（16px 边距）
- 最大宽度 `max-w-5xl`（桌面端居中）

#### Scenario: 移动端查看类型矩阵
- **WHEN** 移动端用户查看类型分析矩阵
- **THEN** 矩阵可横向滚动
- **AND** 攻击类型列名固定不滚动（sticky left）
- **AND** 单元格触摸目标 ≥ 44px

#### Scenario: 移动端打开选择面板
- **WHEN** 移动端用户点击空槽位
- **THEN** 全屏 sheet 从底部滑出
- **AND** sheet 占满视口高度
- **AND** 搜索框固定在顶部
- **AND** 虚拟滚动网格在搜索框下方

#### Scenario: 移动端按钮触摸目标
- **WHEN** 移动端用户点击任意按钮
- **THEN** 按钮触摸区域 ≥ 44px × 44px
- **AND** 按钮全宽排列

### Requirement: 性能

- 页面 LCP ≤ 2s
- 宝可梦网格使用虚拟滚动（只渲染可视区域，支持 1025 只流畅滚动）
- 类型分析矩阵计算在客户端完成（纯计算，无网络请求）
- 已选宝可梦数据缓存（不重复 fetch）
- URL hash 更新使用 replaceState（不触发页面跳转/滚动）

#### Scenario: 首屏加载性能
- **WHEN** 用户首次打开页面
- **THEN** LCP ≤ 2s
- **AND** 6 个空槽位 + Hero 区 + 工具骨架首屏可见

#### Scenario: 虚拟滚动性能
- **WHEN** 用户在 1025 只宝可梦中滚动
- **THEN** 滚动保持 60fps
- **AND** DOM 节点数保持 < 50（可视区域 + 缓冲区）

## Data Flow

```
┌─────────────────────────────────────────────┐
│  /pokemon-team-builder (Server Component)    │
│  - metadata + JSON-LD                        │
│  - SSR 渲染页面骨架 + SEO 内容                │
│  - 预加载全量 PokemonListItem（用于选择面板）  │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│  TeamBuilderClient (Client Component)        │
│  - 管理队伍状态（6 槽位）                      │
│  - 管理选择面板状态                            │
│  - 解析/更新 URL hash                         │
│  - 实时计算类型分析（纯客户端，无网络请求）      │
│  - 虚拟滚动选择面板                            │
│  - Showdown 导出                              │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│  Server Action: fetchPokemonByNameAction     │
│  - 按名称查询 PokeAPI                         │
│  - 24h ISR 缓存                               │
│  - 返回完整 Pokemon 数据                      │
│  - 用于 URL hash 恢复 + 搜索结果              │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│  lib/pokeapi/type-chart.ts                   │
│  - TYPE_CHART 常量（18×18 静态数据）           │
│  - getEffectiveness(attack, defenderTypes)   │
│  - getTeamDefensiveMatrix(team)              │
│  - getTeamDefensiveSummary(team)             │
│  - getTeamOffensiveCoverage(team)            │
└─────────────────────────────────────────────┘
```

## File Structure

```
app/pokemon-team-builder/
├── page.tsx                      # Server Component: metadata + SSR + SEO 内容 + JSON-LD
├── TeamBuilderClient.tsx         # Client Component: 队伍管理 + URL hash + 类型分析
├── TeamSlots.tsx                 # 6 个队伍槽位组件
├── TypeAnalysisMatrix.tsx        # 防御矩阵 + 防御汇总 + 攻击覆盖率
├── PokemonSelector.tsx           # 搜索 + 世代筛选 + 虚拟滚动网格
└── seo-content.ts                # SEO 文案常量（What is / How to / Strategies / FAQ）

lib/pokeapi/
├── type-chart.ts                 # 18×18 属性克制表 + 计算函数（新增）

app/lib/
├── actions.ts                    # 新增 fetchPokemonByNameAction + fetchRandomTeamAction

app/sitemap.ts                    # 添加 /pokemon-team-builder URL（priority 0.9）

app/components/
├── HomeClient.tsx                # 首页 Popular Tools 区块加内链
```

## SEO Content

### Hero 描述（150+ 词）

Build and analyze your Pokemon team with this free Pokemon team builder. Add up to 6 Pokémon, see type weaknesses and resistances instantly, and check your team's coverage against all 18 types. Whether you're planning a competitive team, preparing for a Nuzlocke challenge, or just want a balanced in-game party, this Pokemon team planner shows you exactly what your team is weak to and what it resists. Pick Pokémon manually from all 1025 species, or generate a random team for instant inspiration. Export your team to Pokémon Showdown format with one click. No signup, no ads — just a fast, mobile-friendly Pokemon team builder that works on any device.

### What is a Pokemon team builder?（200+ 词）

A Pokemon team builder is a free tool that helps you plan a team of 6 Pokémon and instantly see its type weaknesses, resistances, and coverage. When you add a Pokémon to your team, the team builder calculates how every one of the 18 types interacts with your team — showing you which attack types your team is weak to, which it resists, and which it's completely immune to. This lets you spot gaps in your team's defense before a battle, so you can swap out a Pokémon to cover a weakness. A good Pokemon team planner also shows your team's offensive coverage — the types your Pokémon can hit for super-effective damage through STAB (Same Type Attack Bonus). This Pokemon team builder includes all 1025 Pokémon from Gen 1 to Gen 9, supports dual-type calculations (including 4x weaknesses and 0.25x resistances), and lets you export your finished team to Pokémon Showdown format.

### How to use the Pokemon team builder（150+ 词）

1. Click an empty team slot to open the Pokémon selector
2. Search by name or filter by generation to find your Pokémon
3. Click a Pokémon to add it to your team
4. Watch the type analysis matrix update in real time
5. Red cells show weaknesses, blue cells show resistances, grey shows immunities
6. Check the summary to see what your team is weak to, resists, and is immune to
7. Review your team's STAB coverage to see which types you can hit super-effectively
8. Use the Random Team button for instant inspiration
9. Click Export to Showdown to copy your team in Showdown format
10. Use Copy Link to share your team with friends

### Type weakness and resistance explained（150+ 词）

Every Pokémon type has strengths and weaknesses against other types. For example, Fire-type Pokémon are weak to Water, Ground, and Rock attacks, but resist Fire, Grass, Ice, Bug, Steel, and Fairy. When a Pokémon has two types, its weaknesses and resistances are calculated by multiplying the effectiveness of each type. This can create 4x weaknesses (e.g., Charizard is Fire/Flying, so Rock deals 4x damage) or 0.25x resistances. Some type combinations even create immunities — a Ground/Flying Pokémon like Gliscor is immune to both Electric and Ground attacks. This Pokemon weakness calculator handles all dual-type combinations automatically, so you can see exactly how your team holds up against every attack type.

### Popular team building strategies（150+ 词）

Building a strong Pokemon team is about balance. Here are popular strategies to guide your team builder decisions:

- **Type coverage**: Aim for a team that resists or is neutral to all 18 types. Use the defensive summary to spot types your team is weak to, then add a Pokémon that resists them.
- **STAB coverage**: Ensure your team's attack types can hit a wide range of opponents for super-effective damage. The offensive coverage view shows which types your team can and can't hit.
- **Role balance**: Mix sweepers (fast, high-attack), tanks (high HP/defense), and support Pokémon. A team of six sweepers will fold to any strong hit.
- **Nuzlocke prep**: If you're planning a Nuzlocke run, use the team builder to pre-plan which encounters will cover your upcoming gym battles.
- **Competitive prep**: Build your team in the team builder, then export to Pokémon Showdown to test it in battle.

### FAQ（8 条，每条 40-60 词）

1. **What is a Pokemon team builder?**
   A Pokemon team builder is a free tool that lets you plan a team of 6 Pokémon and instantly see its type weaknesses, resistances, and coverage. Add Pokémon manually or generate a random team, then analyze how it holds up against all 18 types.

2. **How does the type analysis work?**
   The team builder uses the official Pokémon type effectiveness chart. For each of the 18 attack types, it calculates the damage multiplier against every Pokémon on your team, including dual-type combinations that create 4x weaknesses or 0.25x resistances.

3. **Does this team builder include all 1025 Pokémon?**
   Yes, all 1025 Pokémon from Generation 1 (Kanto) through Generation 9 (Paldea) are included. Use the generation filter in the Pokémon selector to narrow down your choices, or search by name to find a specific Pokémon.

4. **Can I generate a random team?**
   Yes. Click the Random Team button to instantly fill all 6 slots with random Pokémon from the full 1025-species pool. The type analysis updates automatically, and you can re-roll or manually adjust any slot afterward.

5. **Does it account for abilities like Levitate?**
   No. Like most Pokemon team planners, this tool calculates weaknesses and resistances based on type only. Abilities such as Levitate (which grants Ground immunity) or Wonder Guard are not factored in, as they would require per-Pokémon ability data.

6. **Can I use this for Pokémon Showdown?**
   Yes. Click the Export to Showdown button to copy your team in Showdown format. You can paste it directly into Pokémon Showdown's team builder. The export includes Pokémon names and default abilities.

7. **Is it free?**
   Yes, completely free. No signup, no ads, no watermark. The Pokemon team builder works on any device — phone, tablet, or desktop — with no installation required.

8. **Can I share my team?**
   Yes. Your team is automatically saved in the URL. Click Copy Link to share your exact team with friends. When they open the link, the team builder will restore your team automatically.

## Resolved Decisions

- **独立页面 vs 合并首页**：独立页面。搜索意图完全不同（手动选 + 分析 vs 随机生成），合并会破坏首页"3 秒完成"的核心体验。
- **属性克制表数据源**：静态常量（非 PokeAPI `/type/{name}` 端点）。理由：18×18 表是固定的，静态数据无需网络请求，性能更好。
- **类型分析在客户端计算**：纯计算无网络请求，队伍变更即时响应。
- **URL 状态持久化**：做。队伍编码到 URL hash，支持分享和恢复。
- **攻击覆盖率分析**：做。与防御分析并列显示。
- **虚拟滚动**：做。支持 1025 只宝可梦流畅滚动。
- **选择面板交互**：桌面内联 + 移动全屏 sheet。
- **Showdown 导出**：做。MVP 版本只导出名称 + 默认 ability。
- **移动端优先**：所有交互按移动端优先设计，触摸目标 ≥ 44px。
- **SEO 内容**：总词数 800+，核心词 `pokemon team builder` 密度最高。

## Related Specs

- [product-overview](../product-overview/spec.md) — 产品原则检验
- [seo-strategy](../seo-strategy/spec.md) — 关键词簇规划
- [sitemap-and-url-strategy](../sitemap-and-url-strategy/spec.md) — URL 结构
- [tech-stack-and-architecture](../tech-stack-and-architecture/spec.md) — 技术栈
- [result-card-design](../result-card-design/spec.md) — 卡片设计（可复用）
