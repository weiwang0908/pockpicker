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
