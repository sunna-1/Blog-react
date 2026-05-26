# 文章内容管理

## 文件夹结构

```
public/articles/
├── garden.md          # 文章ID: garden
├── cloudflare.md      # 文章ID: cloudflare
├── modules.md         # 文章ID: modules
├── writing.md         # 文章ID: writing
└── README.md          # 本说明文档
```

## 添加新文章

### 步骤 1: 创建 Markdown 文件

在 `public/articles/` 文件夹中创建新的 `.md` 文件,文件名即为文章 ID。

例如: `public/articles/my-new-article.md`

### 步骤 2: 编写文章内容

使用标准 Markdown 语法编写文章正文。

### 步骤 3: 在 content.js 中添加元信息

编辑 `src/data/content.js`,在 `articles` 数组中添加:

```javascript
{
  id: 'my-new-article',  // 必须与文件名一致
  title: '我的新文章',
  excerpt: '文章简介,显示在卡片上',
  category: '分类名称',
  date: '2026-05-27',
  readTime: '5 min',
}
```

### 步骤 4: 构建和预览

```bash
npm run build
npm run preview
```

## 技术实现

- 文章元信息: `src/data/content.js`
- 文章正文: `public/articles/*.md`
- 加载方式: `fetch('/articles/${id}.md')`
- Vite 自动将 `public/` 复制到 `dist/`

## 注意事项

1. **文件名 = 文章 ID**: 必须完全一致
2. **图片**: 放在 `public/images/`,在 Markdown 中用 `/images/xxx.png` 引用
3. **路径**: 不要使用 `src/` 下的相对路径,必须放在 `public/` 中
