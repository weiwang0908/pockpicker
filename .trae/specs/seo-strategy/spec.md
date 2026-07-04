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
