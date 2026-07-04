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
