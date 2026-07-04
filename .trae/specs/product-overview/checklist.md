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
