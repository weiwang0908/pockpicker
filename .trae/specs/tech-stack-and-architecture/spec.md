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

### 数据源: PokeAPI（已实现）
- 公开 REST API：https://pokeapi.co/
- 覆盖 1025+ Pokémon 全世代
- 不需要 API key
- 限流：300 req/min（足够）
- **封装层**：`lib/pokeapi/client.ts`，业务代码只依赖 client，未来换数据源无需改业务代码（已实现）

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

## Cookie & Analytics
- **V1 不做 Cookie 同意弹窗**：V1 只用 GA4 匿名分析，不投广告、不做营销 Cookie。等以后接入 Google Ads / Facebook Pixel 再补 cookie 同意弹窗。
- 符合 Product Principle #4（不出现弹窗）。
- 详细埋点见 analytics-and-metrics spec。

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

## Resolved Decisions
- **API 真实现 PokeAPI**：直接用 PokeAPI + 封装层 `lib/pokeapi/client.ts`，业务代码只依赖 client，未来换数据源无需改业务代码。已实现（见 product-overview Resolved Decisions #3）
- **不做 Cookie 弹窗**：V1 只用 GA4 匿名分析，无广告无营销 Cookie，不做 cookie 同意弹窗；接入 Google Ads / Facebook Pixel 时再补（见 product-overview Resolved Decisions #4）

## Related Specs
- [product-overview](../product-overview/spec.md) — 技术栈决策来源
- [result-card-design](../result-card-design/spec.md) — canvas 生成性能
