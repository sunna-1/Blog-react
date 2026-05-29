# 博客重构总结 - 文章内容独立化

## 🎯 重构目标

将文章内容从 JavaScript 文件中分离到独立的 Markdown 文件,便于后续维护和更新。

## ✅ 完成的改动

### 1. 文件结构变化

**之前:**
```
src/data/
├── content.js          # 包含元信息
└── articleBodies.js    # 包含文章正文(已删除)
```

**现在:**
```
public/articles/        # 新增文件夹
├── garden.md
├── cloudflare.md
├── modules.md
├── writing.md
└── README.md

src/data/
└── content.js          # 仅包含元信息
```

### 2. 代码改动

#### [src/data/content.js](src/data/content.js)
- 删除了 `import { articleBodies } from './articleBodies'`
- 将 `getArticleById` 改为异步函数
- 使用 `fetch('/articles/${id}.md')` 动态加载文章内容

#### [src/pages/ArticleDetail.jsx](src/pages/ArticleDetail.jsx)
- 添加 `useState` 和 `useEffect` 处理异步加载
- 添加加载状态显示
- 添加错误处理

#### [vite.config.js](vite.config.js)
- 保持简洁配置(无需额外插件)
- Vite 自动将 `public/` 目录内容复制到 `dist/`

### 3. 构建输出

构建后 `dist/` 目录结构:
```
dist/
├── articles/
│   ├── garden.md
│   ├── cloudflare.md
│   ├── modules.md
│   ├── writing.md
│   └── README.md
├── assets/
│   ├── index-*.css
│   └── index-*.js
└── index.html
```

## 📝 如何添加新文章

1. 在 `public/articles/` 创建 `new-article.md`
2. 在 `src/data/content.js` 的 `articles` 数组添加元信息
3. 运行 `npm run build && npm run preview` 测试

详见 [public/articles/README.md](public/articles/README.md)

## 🚀 优势

- ✅ 文章内容与代码完全分离
- ✅ 支持标准 Markdown 语法
- ✅ 易于版本控制和协作
- ✅ 添加新文章无需修改 JS 代码
- ✅ 构建后文章文件独立存在
- ✅ 无需额外 Vite 插件

## 🔧 技术栈

- React 19 + React Router
- Vite 7 (构建工具)
- marked (Markdown 渲染,已有依赖)
- 原生 fetch API (加载 Markdown)

## 📦 依赖变化

- ❌ 移除: `vite-plugin-static-copy` (不需要)
- ✅ 保留: 所有现有依赖

## ⚠️ 注意事项

1. 文章 ID 必须与 Markdown 文件名一致
2. 开发模式下需要运行 `npm run dev`,文章会从 `public/articles/` 加载
3. 生产模式下文章从 `dist/articles/` 加载
4. Cloudflare Pages 部署时会自动包含 `dist/articles/` 目录

## 🎉 重构完成

所有功能已测试通过,可以正常使用!
