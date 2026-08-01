# 竞争对手分析与产品路线图

**目标用户：** 国际（英语）宝可梦玩家  
**分析日期：** 2026-08-01

---

## 1. 目标

明确 PokePicker 与头部竞争对手的差距，在保持速度、移动端体验和核心生成器简洁性的前提下，优先补齐最能带来搜索流量和用户留存的功能与内容。

---

## 2. 竞争对手概览

### 2.1 randompokemonpicker.com（主要对手）

一个**功能大而全的宝可梦综合平台**，而不只是随机生成器。

- **工具页：** 孵蛋计算器、个体值计算器、队伍规划器、融合、对比、收藏、名字生成器
- **游戏页：** 宝可梦 Wordle、Smash or Pass、我是谁（Who's That Pokemon）
- **资料页：** 性格表、属性表、了解你的宝可梦
- **sitemap 约 20+ 页面**
- 疑似客户端渲染 SPA，SEO 抓取能力弱

### 2.2 randompokemon.com（348.39K / 月）

**极简老牌单页随机生成器。**

- 功能非常简单：数量 1–6、地区、类型、传说、进化阶段、形态
- 有 `⏪ Previous / Next ⏩` 结果导航
- 开源项目，域名 2012 年注册，靠老域名和外链吃红利
- 启示：**地区、进化阶段、形态这些筛选维度用户真的会用到**

### 2.3 generate-random.org/pokemon（113.85K / 月）

**综合随机生成器网站里的一个宝可梦子页。**

- 支持 generation、type、fully-evolved、legendary、forms
- **Shiny odds 选择**：1/4096、1/512、1/100、Always Shiny
- 可生成最多 100 只
- 底部堆了大量 SEO 文本（Quick Summary / When to use / Example / Security / FAQ）
- 启示：**shiny 概率玩法和工具页 SEO 文本对长尾词很重要**

### 2.4 randompokegen.cc/tools/random-pokemon-picker（5.77K / 月）

**筛选项极多的宝可梦生成器。**

- 维度包括：region、type、forms、rarity、generation、game version、colors、evolves、baby or not、growth rate、habitats、egg group、gender rate、shape、efforts 等
- 支持保存最多 64 个结果
- 多工具互相链接（1 random / 3 random / full generator）
- 启示：**筛选不在于多，在于覆盖高价值维度；结果保存能提升回访**

### 2.5 spinthewheel.app/every-pokmon（全站 2.7M / 月）

**转盘抽奖形式的宝可梦页。**

- 把宝可梦名字做成转盘选项，纯娱乐
- 启示：**互动/游戏化内容流量潜力巨大**，用户对「随机 + 娱乐」形式接受度很高

### 2.6 cajunavenger.github.io（408.34K / 月）

**不是宝可梦网站。** 该用户主要做 Magic: The Gathering 工具，流量数据应该是 GitHub Pages 子域名聚合统计，对宝可梦工具站参考价值低，忽略。

---

## 3. 差距分析

### 3.1 功能深度

头部对手都在做：地区、形态、进化阶段、shiny 概率、结果保存。

- 对 casual 用户影响一般
- 对 Nuzlocke、对战、直播/内容创作者影响大

**风险：** 一次性加太多筛选会冲击"3 秒任务"原则，必须用渐进披露。

### 3.2 内容广度

- 我们 sitemap 约 10 个 URL
- 对手覆盖：属性表、个体值计算器、融合、性格表、图鉴、小游戏等长尾关键词

**结论：** 索引页面越多，搜索入口越多。内容页是拉新流量的核心。

### 3.3 互动 / 留存

- 对手有 Wordle、我是谁、转盘、收藏/保存
- 我们现在没有让用户回访的机制

**结论：** 小游戏和结果保存对停留时长、回访率、社交传播都有帮助。

### 3.4 内容 SEO 文本

generate-random.org 在每个工具底部都有详细说明：What / When to use / Example / FAQ。我们现在工具页底部较空。

### 3.5 我们的优势

- Next.js SSR + ISR，首屏更快、SEO 基础更好
- 移动端优先、单焦点首页
- 可分享的宝可梦卡片和 Showdown 导出
- 简洁体验，低认知负担

---

## 4. 战略定位

**不照搬对手全部功能。** 守住速度和简洁优势，选择性地增加满足以下条件的功能：

1. 搜索量大或 viral 潜力高
2. 能复用现有架构/数据
3. 能把流量导入核心 picker / 队伍构建器

把网站从「一个工具」逐步变成「工具 + 资料 + 小游戏」矩阵。

---

## 5. 路线图 / 待办清单

### 第一阶段 — 高影响力补充（未来 2–4 周）

1. **宝可梦属性相克表页面**
   - 搜索量大，和队伍构建器、性格表互补
   - 可复用现有类型数据
   - 目标 URL：`/pokemon-type-chart`

2. **扩展现有 Advanced Filters 面板**
   - 当前 Advanced 面板已有 Legendary / Shiny / Starter，新增：
     - **Region（地区）**：Kanto / Johto / Hoenn / Sinnoh / Unova / Kalos / Alola / Galar / Paldea
     - **Forms（形态）**：Default / Mega Evolution / Gigantamax / Regional Variant / Alolan / Galarian / Hisuian / Paldean
     - **Evolution Stage（进化阶段）**：Unevolved / Evolved Once / Evolved Twice
     - **Mythical（幻之宝可梦）**：独立开关，与 Legendary 分开
   - 实现要点：扩展 `FilterOptions` 类型；在 `AdvancedFilters.tsx` 增加对应行；`generateRandomAction` 服务端过滤逻辑支持 region/forms/evolution/mythical；PokeAPI 原始数据需要补充 region / forms / evolution chain / mythical 字段。

3. **结果区增加 Previous / Next 导航**
   - 参考 randompokemon.com，方便用户连续浏览，提升停留时长
   - 低投入高体验

4. **工具页底部增加 SEO 文本**
   - 首页、性格表、队伍构建器、昵称生成器都补一段 What / When to use / FAQ
   - 抓取 "what is a random pokemon picker" 等长尾词

### 第二阶段 — 内容页与功能扩展（未来 1–2 个月）

5. **个体值 / 属性计算器**
   - 硬核玩家刚需
   - 和队伍构建器形成自然 workflow
   - 目标 URL：`/pokemon-iv-calculator`

6. **我是谁小游戏（Who's That Pokemon）**
   - 有病毒传播潜力
   - 提升停留时长和回访率
   - 目标 URL：`/games/whos-that-pokemon`

7. **Pokemon Fusion（宝可梦融合）**
   - 高 viral 潜力，契合"随机"气质
   - 可复用 picker 的宝可梦数据
   - 目标 URL：`/pokemon-fusion`

8. **Shiny 概率玩法**
   - 在现有 Shiny 开关基础上增加 odds 选项：1/4096、1/512、1/100、Always Shiny
   - 对直播和内容创作者有吸引力

9. **结果保存 / Favorites（localStorage）**
   - 不需要登录
   - 保存生成的宝可梦或队伍，提升回访率

### 第三阶段 — 留存与数据（持续推进）

10. **内链策略**
    - 在工具页之间建立固定内链区：属性表 → 队伍构建器 → 个体值计算器 → 性格表

11. **数据分析 / 事件追踪**
    - 追踪各工具使用率、重 roll 率、小游戏完成率、分享次数、Advanced Filters 展开率

12. **每月竞争对手监控**
    - 检查 randompokemonpicker.com、randompokemon.com 的 sitemap 是否有新页面/功能
    - 监控 Search Console 中目标关键词排名变化

### 已完成

13. **标题/描述优化**
    - 已完成首页、性格表、队伍构建器、昵称生成器的 title/description 优化，减少 Google 自动重写

---

## 6. 暂不做

- **孵蛋计算器：** 需求小众，优先级低
- **Smash or Pass：** 和目标用户文化契合度弱
- **在首页堆满所有筛选器：** 高级筛选必须藏在渐进披露里
- **用户系统/登录：** 和项目约束冲突，用 localStorage 替代

---

## 7. 成功指标

- 2 个月内索引页面从 10 个增加到 15 个以上
- 首页首屏绘制时间（FCP）在 4G 下保持 1.5 秒以内
- Search Console 中出现 "pokemon type chart"、"pokemon iv calculator"、"who's that pokemon" 的搜索曝光
- Advanced Filters 展开率 > 15%
- 小游戏上线后平均会话时长提升 20%

---

## 8. 参考来源

- [randompokemonpicker.com 首页](https://www.randompokemonpicker.com/)
- [randompokemonpicker.com sitemap](https://www.randompokemonpicker.com/sitemap.xml)
- [randompokemon.com](https://randompokemon.com/)
- [generate-random.org/pokemon](https://generate-random.org/pokemon)
- [randompokegen.cc/random-pokemon-picker](https://randompokegen.cc/tools/random-pokemon-picker)
- [spinthewheel.app/every-pokmon](https://spinthewheel.app/every-pokmon)
