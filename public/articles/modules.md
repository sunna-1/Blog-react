## 数据与页面分离

当前文章、日常、名言、工具配置集中在 `src/data/`:

- `content.js` — 元信息与列表
- `articleBodies.js` — 文章正文 Markdown

页面只负责展示,改内容不必动组件逻辑。

## 为什么不用大而全的 CMS

个人博客的更新频率有限,**Git + Markdown** 的好处是:

- 版本可追溯
- 无数据库成本
- 完全兼容 Cloudflare 免费静态托管

## 扩展路径

当文章变多,可以:

1. 按年份拆分 `articleBodies`
2. 构建时从文件夹读取 `.md`(Vite glob import)
3. 再接 Headless CMS,页面组件几乎不用改
