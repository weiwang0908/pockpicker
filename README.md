# PokePicker

全网体验最好的 Pokémon 随机工具。3 秒完成需求，结果值得分享。

## 线上地址

**https://pokepicker.app**

## 特性

- 🎲 极简首页：3 秒生成随机 Pokémon
- 🎴 抽卡式动画：结果卡片逐个弹出
- 🎨 属性配色：18 个属性对应 18 种颜色
- 📤 隐式分享：一键生成带装饰的分享图
- 🔧 智能筛选：世代/属性/传说/闪光/御三家
- 📱 移动优先：手机端体验优先
- 🚀 SEO 优化：每个页面独立关键词簇

## 环境准备

在开始之前，请确认以下软件已安装到你的电脑上。

### 必装软件

| 软件 | 版本要求 | 如何检查 | 下载地址 |
|---|---|---|---|
| Node.js | 18.18+（推荐 20+） | `node -v` | https://nodejs.org/ |
| pnpm | 8+ | `pnpm -v` | 见下方安装说明 |
| Git | 任意版本 | `git --version` | https://git-scm.com/ |

### 安装 pnpm

打开终端（Windows 用 PowerShell，Mac 用 Terminal），运行：

```bash
npm install -g pnpm
```

安装完成后用 `pnpm -v` 检查是否成功，应输出类似 `8.15.0` 的版本号。

### 推荐编辑器

[VS Code](https://code.visualstudio.com/)，并安装以下插件以获得最佳开发体验：

- ESLint
- Tailwind CSS IntelliSense
- TypeScript

## 快速启动

按以下 4 步即可在本地跑起来。

```bash
# 1. 进入项目目录
cd pokemon

# 2. 安装依赖（首次或拉取新代码后）
pnpm install

# 3. 复制环境变量模板
copy .env.local.example .env.local
```

> Mac/Linux 用户请用 `cp .env.local.example .env.local`。

如果手动创建 `.env.local`，内容如下：

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

> `NEXT_PUBLIC_GA_MEASUREMENT_ID` 留空即可，开发环境不需要。

```bash
# 4. 启动开发服务器
pnpm dev
```

启动后，浏览器访问 http://localhost:3000 即可看到网站。修改代码会自动热更新，无需重启。

## 项目结构

```
pokemon/
├── app/                    # 页面和组件
│   ├── page.tsx            # 首页
│   ├── layout.tsx          # 根布局
│   ├── components/         # UI 组件
│   ├── lib/                # 工具函数
│   ├── about/              # /about 页
│   ├── privacy/            # /privacy 页
│   ├── contact/            # /contact 页
│   ├── api/                # /api 文档页
│   ├── random-pokemon-team-generator/
│   └── pokemon-starter-picker/
├── lib/                    # 数据层
│   └── pokeapi/            # PokeAPI 客户端
├── public/                 # 静态资源
├── .trae/specs/            # 产品 spec 文档
├── package.json
└── README.md               # 本文件
```

### 关键目录说明

- `app/`：Next.js App Router 的页面和组件目录，所有路由都从这里开始。
- `app/components/`：可复用的 UI 组件，如 `PokemonCard`、`Filters`、`ShareButton`。
- `app/lib/`：前端工具函数，如埋点、属性颜色数据。
- `lib/pokeapi/`：PokeAPI 的客户端封装，负责数据请求和缓存。
- `public/`：图片、图标等静态资源，可直接通过 URL 访问。
- `.trae/specs/`：产品需求和设计 spec，了解产品全貌时阅读。

## 常用命令

在项目根目录运行以下命令：

| 命令 | 作用 |
|---|---|
| `pnpm dev` | 启动开发服务器（http://localhost:3000） |
| `pnpm build` | 构建生产版本 |
| `pnpm start` | 启动生产服务器（需先 `pnpm build`） |
| `pnpm lint` | 运行 ESLint 检查代码风格 |
| `pnpm test` | 运行测试 |
| `pnpm test:watch` | 测试 watch 模式（保存即重跑） |

## 环境变量说明

在项目根目录的 `.env.local` 文件中配置（从 `.env.local.example` 复制而来）。只有 `NEXT_PUBLIC_` 开头的变量会暴露给浏览器。

| 变量名 | 必填 | 默认值 | 说明 |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | 是 | http://localhost:3000 | 网站完整 URL，用于 SEO canonical 和 sitemap 生成 |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | 否 | （空） | Google Analytics 4 测量 ID（格式：G-XXXXXXXXXX），留空则不加载 GA |

> 修改 `.env.local` 后需重启 `pnpm dev` 才会生效。

## 部署到 Vercel

Vercel 是 Next.js 的官方部署平台，免费额度足够个人项目使用。面向新手的完整步骤：

1. 注册 GitHub 账号（如果还没有）：https://github.com/
2. 把项目代码推到 GitHub 仓库。如果不会用 Git 命令行，可以下载 [GitHub Desktop](https://desktop.github.com/) 图形化操作。
3. 注册 Vercel 账号（建议用 GitHub 账号直接登录）：https://vercel.com/
4. 登录后点右上角 **"Add New"** → **"Project"**。
5. 在 "Import Git Repository" 列表中找到你的 GitHub 仓库，点 **"Import"**。
6. 在配置页找到 **"Environment Variables"**，逐条添加：
   - `NEXT_PUBLIC_SITE_URL` = 你的域名（例如 `https://pokepicker.com`）
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` = 你的 GA4 ID（可选，没有就留空或不加）
7. 其他配置保持默认（Framework Preset 会自动识别为 Next.js），点 **"Deploy"**。
8. 等待 2-3 分钟，构建成功后 Vercel 会给你一个 `.vercel.app` 临时域名，可立即访问。
9. 如需绑定自定义域名：进入项目 → Settings → Domains，按提示添加并配置 DNS。

> 后续每次 `git push` 到主分支，Vercel 会自动重新部署。

## 常见问题 FAQ

**Q: 启动时报 `pnpm: command not found`**
A: 没有安装 pnpm。运行 `npm install -g pnpm` 安装，安装后用 `pnpm -v` 验证。

**Q: 启动时报 `node: command not found`**
A: 没有安装 Node.js，或未加入系统 PATH。到 https://nodejs.org/ 下载 LTS 版本安装，安装时勾选 "Add to PATH"。

**Q: 端口 3000 被占用**
A: 换一个端口启动：`pnpm dev -- -p 3001`，然后访问 http://localhost:3001。

**Q: 首次点 "Pick a Pokémon" 等很久才出结果**
A: 正常现象。首次需要从 PokeAPI 拉取全量 Pokémon 列表（约 10-30 秒），之后 24 小时内有缓存，再次点击会很快。

**Q: 图片不显示**
A: Pokémon 的 sprite 图片托管在 GitHub Pages，检查网络连接是否能访问 `raw.githubusercontent.com`。

**Q: 改了代码浏览器没生效**
A: 浏览器硬刷新：Windows 按 `Ctrl+F5`，Mac 按 `Cmd+Shift+R`。

**Q: `pnpm install` 报错或卡住**
A: 可能是网络问题。尝试切换 npm 镜像：`pnpm config set registry https://registry.npmmirror.com/`，再重新安装。

**Q: 部署到 Vercel 后环境变量不生效**
A: 在 Vercel 项目 → Settings → Environment Variables 重新配置后，需要重新触发一次部署才会生效（在 Deployments 列表点 "Redeploy"）。

## 技术文档链接

- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs/v4-beta)
- [PokeAPI](https://pokeapi.co/docs/v2)
- [产品 spec 文档](.trae/specs/total-spec.md)
