# Sunna 的日记本

手绘本风格的个人博客：记录日常、想法与文章。使用 React、Vite、Framer Motion 与 SVG 线稿动效构建，适合部署到 Cloudflare Pages。

## 技术栈

- React 19
- Vite 7
- React Router
- Framer Motion
- marked（Markdown 渲染，构建进静态包）
- SVG 手绘线稿 + CSS

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建产物会输出到 `dist/`，可直接用于 Cloudflare Pages。

## Cloudflare Pages 配置

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`

## 页面路由

| 路径 | 说明 |
|------|------|
| `/` | 首页：名言、手绘视觉、联系信息 |
| `/articles` | 文章列表 |
| `/daily` | 日常分享 |
| `/tools` | 实用工具入口 |
| `/tools/markdown` | Markdown 写作预览（纯前端） |
| `/tools/complexity` | 算法复杂度启发式评估 |
| `/articles/:id` | 文章详情 |

SPA 回退已配置于 [public/_redirects](public/_redirects)，Cloudflare Pages 可直接使用。

## 品牌 Logo

浏览器图标与文章详情页尾使用 [public/img/logo.svg](public/img/logo.svg)。

## 内容编辑

数据集中在 [src/data/content.js](src/data/content.js)：

- `articles`: 文章
- `dailyEntries`: 日常分享
- `quotes`: 首页名言
- `tools`: 工具占位
- `site`: 站点信息与联系方式
