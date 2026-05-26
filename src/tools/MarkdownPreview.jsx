import { useState } from 'react'
import { Link } from 'react-router-dom'
import MarkdownContent from '../components/MarkdownContent'
import { ScrollReveal } from '../components/ScrollReveal'
import { SketchWiggleLine } from '../components/SketchSvg'
import { SketchPen } from '../components/SketchSvg'
import { SketchTeacup } from '../components/sketch/SketchLife'
import { site } from '../data/content'

const defaultMd = `# 标题示例

在这里写 **Markdown**，右侧会实时预览。

## 列表示例

- 日常片段
- 文章草稿
- 待办想法

\`\`\`js
const diary = 'Sunna'
console.log(diary)
\`\`\`

> 一切在浏览器本地完成，适合部署在 Cloudflare Pages 免费静态托管。
`

export default function MarkdownPreview() {
  const [source, setSource] = useState(defaultMd)

  return (
    <div className="page-inner tool-page">
      <header className="page-header">
        <ScrollReveal>
          <Link className="sketch-link subtle back-link" to="/tools">
            ← 返回工具箱
          </Link>
          <span className="section-kicker">Writing</span>
          <h1>Markdown 写作预览</h1>
          <SketchWiggleLine />
          <p className="page-lead">
            纯前端渲染，无需服务器。适合在部署前本地或线上直接起草内容。
          </p>
        </ScrollReveal>
        <SketchPen className="page-header-art" />
      </header>

      <div className="tool-workspace markdown-workspace">
        <label className="tool-pane">
          <span className="pane-label">
            <SketchTeacup className="pane-icon" />
            编辑
          </span>
          <textarea
            value={source}
            onChange={(e) => setSource(e.target.value)}
            spellCheck={false}
            aria-label="Markdown 源码"
          />
        </label>
        <div className="tool-pane preview-pane">
          <span className="pane-label">预览</span>
          <div className="preview-scroll">
            <MarkdownContent source={source} />
          </div>
        </div>
      </div>

      <footer className="page-footer compact">
        <p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </footer>
    </div>
  )
}
