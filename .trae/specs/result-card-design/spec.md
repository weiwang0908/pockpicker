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
