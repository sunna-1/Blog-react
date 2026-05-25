# Sunna Blog

一个使用 React、Vite 和 IconPark 构建的现代个人博客前端。页面包含加载页、欢迎首屏、文章模块、网址推荐、标签筛选、时间线、订阅入口和关于/扩展模块，适合后续部署到 Cloudflare Pages。

## 技术栈

- React 19
- Vite 7
- IconPark React 图标组件库
- CSS 响应式布局

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

## 内容编辑

主要内容集中在 [src/App.jsx](src/App.jsx) 顶部的数据数组中：

- `posts`: 博客文章
- `recommendedLinks`: 网址推荐
- `categories`: 分类筛选
- `timeline`: 后续路线或动态记录
