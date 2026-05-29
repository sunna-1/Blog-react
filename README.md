# Sunna 的日记本

手绘本风格的个人博客：记录日常、想法与文章。使用 React、Vite、Framer Motion 与 SVG 线稿动效构建，部署于 Cloudflare Pages。

---

## 目录

- [项目结构](#项目结构)
- [本地开发](#本地开发)
- [Cloudflare Pages 部署](#cloudflare-pages-部署)
- [内容编辑指南](#内容编辑指南)
  - [编辑文章](#编辑文章)
  - [编辑日常动态](#编辑日常动态)
  - [编辑工具页](#编辑工具页)
  - [编辑站点信息](#编辑站点信息)
- [通过 Fork 仓库同步更新](#通过-fork-仓库同步更新)
- [技术栈](#技术栈)
- [页面路由](#页面路由)

---

## 项目结构

```
blog-on-sunnacloud/
├── public/                    # 静态资源，构建时原样复制到 dist/
│   ├── _redirects             # Cloudflare Pages SPA 路由回退配置
│   ├── favicon.svg            # 浏览器标签图标
│   ├── img/                   # 品牌 Logo、装饰 SVG
│   │   └── logo.svg
│   └── articles/              # 文章正文 Markdown 文件（每篇一个文件）
│       ├── garden.md
│       ├── cloudflare.md
│       ├── modules.md
│       ├── writing.md
│       └── README.md          # 添加新文章的操作说明
│
├── src/
│   ├── main.jsx               # React 入口
│   ├── App.jsx                # 路由配置
│   ├── index.css              # 全局基础样式
│   ├── App.css
│   │
│   ├── data/
│   │   └── content.js         # ⭐ 所有内容数据（文章元信息、日常、工具、名言、站点信息）
│   │
│   ├── pages/                 # 各页面组件
│   │   ├── Home.jsx           # 首页
│   │   ├── Articles.jsx       # 文章列表（含搜索 + 翻页）
│   │   ├── ArticleDetail.jsx  # 文章详情（异步加载 Markdown）
│   │   ├── Daily.jsx          # 日常动态（含搜索 + 翻页）
│   │   └── Tools.jsx          # 工具页入口
│   │
│   ├── components/            # 公共组件
│   │   ├── Layout.jsx         # 页面整体布局（侧边栏 + 内容区）
│   │   ├── Sidebar.jsx        # 侧边导航栏
│   │   ├── MarkdownContent.jsx # Markdown 渲染组件（使用 marked）
│   │   ├── ScrollReveal.jsx   # 滚动入场动画
│   │   ├── SketchSvg.jsx      # 手绘 SVG 装饰元素
│   │   ├── SketchBackground.jsx
│   │   ├── QuoteCards.jsx     # 首页名言卡片
│   │   ├── DecorImage.jsx     # 品牌 Logo 组件
│   │   └── sketch/
│   │       └── SketchLife.jsx # 插画 SVG 组件
│   │
│   ├── tools/                 # 工具页具体功能
│   │   ├── MarkdownPreview.jsx  # Markdown 实时预览工具
│   │   └── ComplexityAnalyzer.jsx # 算法复杂度分析工具
│   │
│   ├── styles/
│   │   └── sketch.css         # 手绘风格主题样式
│   │
│   └── utils/
│       └── analyzeComplexity.js # 复杂度分析逻辑
│
├── index.html                 # HTML 入口
├── vite.config.js             # Vite 构建配置
├── package.json
└── eslint.config.js
```

---

## 本地开发

**前提：** Node.js 18+ 已安装。

```bash
# 安装依赖
npm install

# 启动开发服务器（热更新）
npm run dev
# 访问 http://localhost:5173

# 构建生产版本
npm run build

# 预览构建产物
npm run preview
```

---

## Cloudflare Pages 部署

### 方式一：连接 GitHub 仓库（推荐）

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. 选择你的 GitHub 仓库（如 `Blog-react`）
4. 填写构建配置：

   | 配置项 | 值 |
   |--------|-----|
   | Framework preset | `None`（或选 Vite） |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | `/`（留空） |

5. 点击 **Save and Deploy**，等待首次构建完成。

> 之后每次向 `main` 分支推送代码，Cloudflare Pages 会自动重新构建并发布。

### 方式二：直接上传 dist 文件夹

```bash
npm run build
```

在 Cloudflare Dashboard 中选择 **Direct Upload**，上传整个 `dist/` 文件夹。

### SPA 路由说明

项目根目录下的 `public/_redirects` 已配置好 SPA 回退规则：

```
/* /index.html 200
```

这确保直接访问 `/articles/garden` 等子路径时不会返回 404。**无需额外操作**，Cloudflare Pages 会自动读取此文件。

---

## 内容编辑指南

### 编辑文章

文章分为两部分：**元信息**（列表卡片显示）和**正文**（详情页显示）。

#### 1. 修改或新增文章正文

文章正文是独立的 Markdown 文件，位于 `public/articles/`：

```
public/articles/
├── garden.md       ← 文章 id: garden
├── cloudflare.md   ← 文章 id: cloudflare
├── modules.md      ← 文章 id: modules
└── writing.md      ← 文章 id: writing
```

**新增文章步骤：**

1. 在 `public/articles/` 创建新文件，文件名即为文章 ID，例如 `my-article.md`
2. 用标准 Markdown 语法写入内容：

   ```markdown
   ## 引言

   这里是文章正文……

   ## 第二章

   更多内容……
   ```

3. 在 `src/data/content.js` 的 `articles` 数组中添加元信息（见下一步）

#### 2. 修改文章元信息

打开 `src/data/content.js`，找到 `articles` 数组：

```js
export const articles = [
  {
    id: 'garden',           // 必须与 public/articles/xxx.md 的文件名一致
    title: '把个人博客搭成长期生长的数字花园',
    excerpt: '文章简介，显示在列表卡片上',
    category: '建站',
    date: '2026-05-20',
    readTime: '8 min',
  },
  // 新增文章：在此处添加一个新对象
  {
    id: 'my-article',
    title: '我的新文章标题',
    excerpt: '这篇文章讲了……',
    category: '思考',
    date: '2026-05-29',
    readTime: '5 min',
  },
]
```

**删除文章：** 从 `articles` 数组中移除对应对象，并删除 `public/articles/` 中对应的 `.md` 文件。

---

### 编辑日常动态

日常动态的所有内容都在 `src/data/content.js` 的 `dailyEntries` 数组中：

```js
export const dailyEntries = [
  {
    id: 'daily-001',
    date: '2026-05-29',
    mood: '🌤 平静',
    title: '今天的标题',
    excerpt: '今天的简短记录内容，会显示在卡片上。',
  },
  // 新增日常：在数组开头（最新的放前面）添加：
  {
    id: 'daily-002',       // id 需唯一，建议按日期递增
    date: '2026-05-30',
    mood: '☀️ 愉快',
    title: '又一天',
    excerpt: '今天发生了……',
  },
]
```

**字段说明：**

| 字段 | 说明 |
|------|------|
| `id` | 唯一标识符，不对外显示，建议用 `daily-001` 格式 |
| `date` | 显示在卡片上的日期字符串 |
| `mood` | 心情标签，可用 emoji，显示在日期旁 |
| `title` | 卡片标题 |
| `excerpt` | 卡片正文摘要 |

---

### 编辑工具页

工具页有两处需要修改：

#### 1. 工具卡片列表（`src/data/content.js`）

```js
export const tools = [
  {
    id: 'markdown',
    title: 'Markdown 预览',
    description: '实时预览 Markdown 渲染效果',
    icon: '📝',
    path: '/tools/markdown',
  },
  // 新增工具入口
  {
    id: 'my-tool',
    title: '我的工具',
    description: '工具功能描述',
    icon: '🔧',
    path: '/tools/my-tool',
  },
]
```

#### 2. 工具功能组件（`src/tools/`）

在 `src/tools/` 下新建工具组件文件，例如 `MyTool.jsx`，然后在 `src/App.jsx` 中添加路由：

```jsx
import MyTool from './tools/MyTool'
// 在路由配置中添加：
<Route path="/tools/my-tool" element={<MyTool />} />
```

---

### 编辑站点信息

`src/data/content.js` 顶部的 `site` 对象控制邮箱、GitHub 链接等全局信息：

```js
export const site = {
  name: 'Sunna',
  email: 'your@email.com',      // 页脚邮箱链接
  github: 'https://github.com/your-username',  // 页脚 GitHub 链接
}
```

---

## 通过 Fork 仓库同步更新

如果你是从别人的仓库 Fork 过来，或者想在多台设备上协作编辑，流程如下：

### 基本流程

```
编辑本地文件 → git commit → git push → Cloudflare 自动构建
```

### 详细步骤

#### 1. 克隆你的 Fork 到本地

```bash
git clone https://github.com/你的用户名/Blog-react.git
cd Blog-react
npm install
```

#### 2. 编辑内容

按照[内容编辑指南](#内容编辑指南)修改对应文件。

#### 3. 提交并推送

```bash
# 查看改动了哪些文件
git status

# 暂存改动（可以指定具体文件，也可以用 . 暂存全部）
git add public/articles/my-article.md
git add src/data/content.js

# 提交
git commit -m "Add: 新文章《我的新文章》"

# 推送到远程仓库
git push origin main
```

推送后，Cloudflare Pages 会自动检测到 `main` 分支的更新并重新构建发布，通常 1-2 分钟内生效。

#### 4. 如果推送被拒绝（远程有更新）

```bash
git pull --rebase origin main
git push origin main
```

### 如果你想给原仓库提交更改（Pull Request）

1. 在 GitHub 上打开你的 Fork 仓库页面
2. 点击 **Contribute** → **Open pull request**
3. 填写标题和描述，提交 PR
4. 等待原作者审核合并

### 从原仓库同步最新代码到你的 Fork

```bash
# 添加原仓库为上游（只需操作一次）
git remote add upstream https://github.com/sunna-1/Blog-react.git

# 拉取原仓库的最新代码
git fetch upstream
git rebase upstream/main

# 推送同步结果到你的 Fork
git push origin main
```

---

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 19 | UI 框架 |
| Vite | 7 | 构建工具 |
| React Router | 7 | SPA 路由 |
| Framer Motion | — | 动画效果 |
| marked | — | Markdown 渲染 |
| SVG + CSS | — | 手绘风格视觉 |

---

## 页面路由

| 路径 | 说明 |
|------|------|
| `/` | 首页：名言、手绘视觉、联系信息 |
| `/articles` | 文章列表（支持搜索、翻页） |
| `/articles/:id` | 文章详情（从 `public/articles/:id.md` 动态加载） |
| `/daily` | 日常动态（支持搜索、翻页） |
| `/tools` | 工具入口页 |
| `/tools/markdown` | Markdown 实时预览 |
| `/tools/complexity` | 算法复杂度启发式评估 |

---

> 手绘本风格，慢慢写，慢慢长。
