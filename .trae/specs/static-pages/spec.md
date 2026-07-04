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
